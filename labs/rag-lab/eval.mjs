import { promises as fs } from "node:fs";
import path from "node:path";
import { readJson, writeJson } from "./lib/files.mjs";
import { askBaseplate, loadState } from "./lib/rag.mjs";

const statePath = path.join(import.meta.dirname, ".rag-state.json");
const questionsPath = path.join(import.meta.dirname, "eval-questions.json");

function parseArgs(argv) {
  const limitIndex = argv.indexOf("--limit");
  const limit = limitIndex >= 0 ? Number.parseInt(argv[limitIndex + 1], 10) : undefined;
  return {
    limit: Number.isFinite(limit) && limit > 0 ? limit : undefined
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const state = await loadState(statePath);
  const questions = await readJson(questionsPath);
  const selected = args.limit ? questions.slice(0, args.limit) : questions;
  const results = [];

  console.log(`Running ${selected.length} eval question(s)`);

  for (const item of selected) {
    console.log(`\n[${item.id}] ${item.question}`);
    const result = await askBaseplate(state.vector_store_id, item.question);
    const filenames = result.searchResults.map((searchResult) => searchResult.filename).filter(Boolean);

    results.push({
      ...item,
      answer: result.answer,
      search_results: result.searchResults
    });

    console.log(`Answer chars: ${result.answer.length}`);
    console.log(`Top files: ${filenames.slice(0, 3).join(", ") || "none"}`);
  }

  const outputPath = path.join(
    import.meta.dirname,
    `eval-results-${new Date().toISOString().replaceAll(":", "-")}.json`
  );
  await writeJson(outputPath, {
    created_at: new Date().toISOString(),
    vector_store_id: state.vector_store_id,
    results
  });

  console.log(`\nEval results written to ${path.relative(process.cwd(), outputPath)}`);
  console.log("Manual review still required: inspect answer grounding, citations, and missing context.");

  await appendLabNote(selected.length, outputPath);
}

async function appendLabNote(questionCount, outputPath) {
  const notePath = path.join(import.meta.dirname, "lab-notes.md");
  const note = [
    "",
    `## Eval Run - ${new Date().toISOString()}`,
    "",
    `Questions run: ${questionCount}`,
    `Raw result file: \`${path.basename(outputPath)}\``,
    "",
    "Manual observations:",
    "",
    "- [ ] Which answers were clearly grounded?",
    "- [ ] Which answers had weak or missing citations?",
    "- [ ] Which questions exposed missing docs?",
    "- [ ] Which failures should update RAG-001?",
    ""
  ].join("\n");

  await fs.appendFile(notePath, note, "utf8");
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exitCode = 1;
});
