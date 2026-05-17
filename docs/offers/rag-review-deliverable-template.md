# Baseplate RAG Architecture Review Deliverable Template

Date: 2026-05-16

Use this as the output template for the USD 99 custom RAG review.

## Client / Project

Client:

Project:

Date reviewed:

Reviewer:

## One-Line Summary

Recommended default:

> [Vector-only / Hybrid retrieval / Hybrid + reranking / GraphRAG / Agentic RAG]

Why:

> [One or two sentences tied to their corpus, users, and risk.]

## Context

What they are building:

Users:

Corpus:

Approximate size:

Stack:

Constraints:

- latency:
- cost:
- security:
- citations:
- unacceptable failures:

## Recommended Architecture

### Retrieval Default

Choose one:

- vector-only
- lexical baseline
- hybrid retrieval
- hybrid plus reranking
- GraphRAG
- agentic RAG

Recommendation:

### First Version To Build

1. [Step]
2. [Step]
3. [Step]
4. [Step]
5. [Step]

### Why This Fits

- [Reason 1]
- [Reason 2]
- [Reason 3]

## Chunking And Metadata Defaults

Recommended chunking:

Metadata to preserve:

- source title/path/URL
- document type
- section heading
- last updated date
- owner/source system
- tenant/customer/project
- role/group permissions
- version/product/category

Notes:

## Retrieval Strategy

Dense retrieval:

Lexical/sparse retrieval:

Metadata filters:

Reranking:

When to skip reranking:

## Source Attribution

Citation requirement:

Recommended citation format:

Refusal rule:

> If retrieved context is insufficient, ask for clarification or say the answer is not supported by the indexed sources.

## Evaluation Plan

Create 30 to 50 realistic questions.

Test:

1. vector-only
2. lexical-only
3. hybrid
4. hybrid plus reranking

Measure:

- correct source retrieved
- source rank
- answer groundedness
- answer relevance
- citation correctness
- exact-term failures
- paraphrase failures
- latency
- cost

## Security And RBAC Notes

Access-control risk:

Recommended permission model:

Prompt injection risk:

Poisoning/stale-doc risk:

Logging/audit notes:

## What Not To Build Yet

Do not build yet:

- [Overbuild 1]
- [Overbuild 2]
- [Overbuild 3]

Reason:

## Caveats

This recommendation could change if:

- [Condition 1]
- [Condition 2]
- [Condition 3]

## Sources Used

- OpenAI File Search: https://platform.openai.com/docs/assistants/tools/file-search
- Pinecone Hybrid Search: https://docs.pinecone.io/guides/search/hybrid-search
- Weaviate Hybrid Search: https://docs.weaviate.io/weaviate/concepts/search/hybrid-search
- Qdrant Hybrid Reranking: https://qdrant.tech/documentation/search-precision/reranking-hybrid-search/
- Anthropic Contextual Retrieval: https://www.anthropic.com/engineering/contextual-retrieval
- TruLens RAG Triad: https://www.trulens.org/getting_started/core_concepts/rag_triad/
- LangSmith RAG Eval: https://docs.langchain.com/langsmith/evaluate-rag-tutorial
- LlamaIndex Retrieval Eval: https://developers.llamaindex.ai/python/framework-api-reference/evaluation/retrieval/
- Microsoft GraphRAG: https://microsoft.github.io/graphrag/
- OWASP GenAI Top 10: https://genai.owasp.org/llm-top-10/

## Final Recommendation

Plain-English final answer:

> [Write the recommendation as if speaking to a busy solo builder.]

