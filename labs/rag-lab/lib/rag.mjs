import { promises as fs } from "node:fs";
import path from "node:path";
import { getMaxResults, getModel, openaiJson } from "./openai-api.mjs";

export async function askBaseplate(vectorStoreId, question, options = {}) {
  const response = await openaiJson("/responses", {
    method: "POST",
    body: {
      model: options.model ?? getModel(),
      instructions: [
        "You are Baseplate RAG Lab.",
        "Answer only from the indexed Baseplate files.",
        "Prefer concise answers with filenames or citations when available.",
        "If the indexed files do not contain enough evidence, say so plainly.",
        "Do not use private memory or outside knowledge."
      ].join(" "),
      input: question,
      tools: [
        {
          type: "file_search",
          vector_store_ids: [vectorStoreId],
          max_num_results: options.maxResults ?? getMaxResults()
        }
      ],
      include: ["file_search_call.results"]
    }
  });

  return {
    question,
    answer: extractOutputText(response),
    searchResults: extractSearchResults(response),
    raw: response
  };
}

export function extractOutputText(response) {
  if (response.output_text) {
    return response.output_text;
  }

  const chunks = [];
  for (const item of response.output ?? []) {
    if (item.type !== "message") continue;
    for (const content of item.content ?? []) {
      if (content.type === "output_text" && content.text) {
        chunks.push(content.text);
      }
    }
  }
  return chunks.join("\n").trim();
}

export function extractSearchResults(response) {
  const results = [];

  for (const item of response.output ?? []) {
    if (item.type !== "file_search_call") continue;
    for (const result of item.results ?? []) {
      results.push({
        file_id: result.file_id,
        filename: result.filename,
        score: result.score,
        text: result.content
          ?.filter((part) => part.type === "text")
          ?.map((part) => part.text)
          ?.join("\n")
          ?.slice(0, 500)
      });
    }
  }

  return results;
}

export async function loadState(statePath) {
  try {
    const state = JSON.parse(await fs.readFile(statePath, "utf8"));
    if (!state.vector_store_id) {
      throw new Error(`Missing vector_store_id in ${statePath}`);
    }
    return state;
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`No RAG lab state found. Run npm run rag:index first.`);
    }
    throw error;
  }
}

export function resolveLabPath(...parts) {
  return path.resolve(import.meta.dirname, "..", ...parts);
}
