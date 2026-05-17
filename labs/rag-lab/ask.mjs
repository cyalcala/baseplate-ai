import path from "node:path";
import { askBaseplate, loadState } from "./lib/rag.mjs";

const statePath = path.join(import.meta.dirname, ".rag-state.json");

async function main() {
  const question = process.argv.slice(2).join(" ").trim();
  if (!question) {
    throw new Error(`Usage: npm run rag:ask -- "What is the current RAG-001 default?"`);
  }

  const state = await loadState(statePath);
  const result = await askBaseplate(state.vector_store_id, question);

  console.log(`Question:\n${question}\n`);
  console.log(`Answer:\n${result.answer || "(no answer text returned)"}\n`);

  if (result.searchResults.length > 0) {
    console.log("Search Results:");
    for (const [index, item] of result.searchResults.entries()) {
      const score = typeof item.score === "number" ? item.score.toFixed(4) : "n/a";
      console.log(`${index + 1}. ${item.filename ?? item.file_id} (${score})`);
      if (item.text) {
        console.log(`   ${item.text.replace(/\s+/g, " ").slice(0, 220)}`);
      }
    }
  } else {
    console.log("Search Results: none returned");
  }
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exitCode = 1;
});
