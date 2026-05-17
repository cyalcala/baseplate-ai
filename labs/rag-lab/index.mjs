import { promises as fs } from "node:fs";
import path from "node:path";
import { collectIndexableFiles, mimeFor, toPosixPath, writeJson } from "./lib/files.mjs";
import { openaiJson, requireApiKey } from "./lib/openai-api.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..", "..");
const statePath = path.join(import.meta.dirname, ".rag-state.json");

function parseArgs(argv) {
  return {
    dryRun: argv.includes("--dry-run")
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const files = await collectIndexableFiles(repoRoot);

  console.log(`Baseplate RAG Lab indexer`);
  console.log(`Files selected: ${files.length}`);
  for (const file of files) {
    console.log(`- ${toPosixPath(path.relative(repoRoot, file))}`);
  }

  if (args.dryRun) {
    console.log("\nDry run only. No OpenAI API calls were made.");
    return;
  }

  requireApiKey();

  const vectorStore = await openaiJson("/vector_stores", {
    method: "POST",
    body: {
      name: `Baseplate RAG Lab ${new Date().toISOString()}`,
      expires_after: {
        anchor: "last_active_at",
        days: 7
      },
      metadata: {
        project: "baseplate",
        lab: "managed-rag-v1"
      }
    }
  });

  console.log(`\nVector store created: ${vectorStore.id}`);

  const uploaded = [];
  for (const filePath of files) {
    const relativePath = toPosixPath(path.relative(repoRoot, filePath));
    console.log(`\nUploading ${relativePath}`);
    const file = await uploadFile(filePath, relativePath);
    const vectorStoreFile = await attachFile(vectorStore.id, file.id, relativePath);
    await pollVectorStoreFile(vectorStore.id, vectorStoreFile.id ?? file.id, relativePath);
    uploaded.push({
      path: relativePath,
      file_id: file.id,
      vector_store_file_id: vectorStoreFile.id ?? file.id
    });
  }

  const state = {
    created_at: new Date().toISOString(),
    vector_store_id: vectorStore.id,
    files: uploaded
  };
  await writeJson(statePath, state);

  console.log(`\nIndexed ${uploaded.length} files.`);
  console.log(`State written to ${toPosixPath(path.relative(repoRoot, statePath))}`);
}

async function uploadFile(filePath, relativePath) {
  const form = new FormData();
  const buffer = await fs.readFile(filePath);
  const file = new File([buffer], path.basename(filePath), { type: mimeFor(filePath) });
  form.append("purpose", "assistants");
  form.append("file", file);

  return openaiJson("/files", {
    method: "POST",
    body: form,
    headers: {
      "OpenAI-Beta": "assistants=v2"
    }
  }).catch((error) => {
    throw new Error(`Failed uploading ${relativePath}: ${error.message}`);
  });
}

async function attachFile(vectorStoreId, fileId, relativePath) {
  return openaiJson(`/vector_stores/${vectorStoreId}/files`, {
    method: "POST",
    body: {
      file_id: fileId,
      attributes: {
        path: relativePath,
        source: "baseplate-public-docs"
      }
    }
  }).catch((error) => {
    throw new Error(`Failed attaching ${relativePath}: ${error.message}`);
  });
}

async function pollVectorStoreFile(vectorStoreId, vectorStoreFileId, relativePath) {
  const started = Date.now();
  const timeoutMs = 120_000;

  while (Date.now() - started < timeoutMs) {
    const status = await openaiJson(`/vector_stores/${vectorStoreId}/files/${vectorStoreFileId}`);
    if (status.status === "completed") {
      console.log(`Indexed ${relativePath}`);
      return;
    }
    if (status.status === "failed" || status.status === "cancelled") {
      throw new Error(`Indexing ${relativePath} ended with status ${status.status}`);
    }
    process.stdout.write(".");
    await sleep(2_000);
  }

  throw new Error(`Timed out waiting for ${relativePath} to index`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exitCode = 1;
});
