const API_BASE = process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";

export function requireApiKey() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. In PowerShell, run: $env:OPENAI_API_KEY=\"sk-...\""
    );
  }
  return apiKey;
}

export async function openaiJson(path, options = {}) {
  const apiKey = requireApiKey();
  const url = `${API_BASE}${path}`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    ...(options.headers ?? {})
  };

  const isForm = typeof FormData !== "undefined" && options.body instanceof FormData;
  if (options.body && !isForm && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    method: options.method ?? "GET",
    headers,
    body: isForm ? options.body : options.body ? JSON.stringify(options.body) : undefined
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const detail = data?.error?.message ?? text ?? response.statusText;
    throw new Error(`OpenAI API ${response.status} ${response.statusText}: ${detail}`);
  }

  return data;
}

export function getModel() {
  return process.env.OPENAI_RAG_MODEL ?? "gpt-4.1";
}

export function getMaxResults() {
  const value = Number.parseInt(process.env.OPENAI_RAG_MAX_RESULTS ?? "8", 10);
  return Number.isFinite(value) && value > 0 ? value : 8;
}
