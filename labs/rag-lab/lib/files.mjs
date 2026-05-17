import { promises as fs } from "node:fs";
import path from "node:path";

const INCLUDED_ROOT_FILES = new Set(["README.md", "AGENTS.md", "NEXT_SESSION_BRIDGE.md"]);
const INCLUDED_EXTENSIONS = new Set([".md", ".csv"]);
const EXCLUDED_DIRS = new Set([
  ".git",
  ".github",
  "baseplate-memory",
  "graphify-out",
  "novabyte-ugc",
  "private-raw-chat-backup",
  "node_modules",
  "tmp",
  "temp"
]);

export function toPosixPath(filePath) {
  return filePath.split(path.sep).join("/");
}

export async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function collectIndexableFiles(rootDir) {
  const results = [];

  for (const file of INCLUDED_ROOT_FILES) {
    const absolutePath = path.join(rootDir, file);
    if (await pathExists(absolutePath)) {
      results.push(absolutePath);
    }
  }

  const docsDir = path.join(rootDir, "docs");
  if (await pathExists(docsDir)) {
    await walk(docsDir, results);
  }

  return results.sort((a, b) => toPosixPath(a).localeCompare(toPosixPath(b)));
}

async function walk(dir, results) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!EXCLUDED_DIRS.has(entry.name)) {
        await walk(absolutePath, results);
      }
      continue;
    }

    if (entry.isFile() && INCLUDED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      results.push(absolutePath);
    }
  }
}

export function mimeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".md") return "text/markdown";
  if (ext === ".csv") return "text/csv";
  if (ext === ".json") return "application/json";
  return "text/plain";
}

export async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
