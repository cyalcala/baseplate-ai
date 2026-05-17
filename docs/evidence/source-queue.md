# Baseplate RAG Source Queue

Date reviewed for triage: 2026-05-16

Status: source queue, not final literature review.

Purpose: collect candidate sources for Baseplate's first RAG decision. These should be reviewed, scored, and converted into evidence rows before public claims are published.

## Priority Sources

| ID | Source | Type | Why It Matters | URL | Status |
| --- | --- | --- | --- | --- | --- |
| S001 | Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks | Research paper | Foundational RAG paper; defines original retrieval-plus-generation framing. | https://papers.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html | reviewed for triage |
| S002 | OpenAI File Search docs | Official docs | Shows hosted RAG defaults: query rewriting, parallel searches, keyword + semantic search, reranking, default chunk settings, limitations. | https://platform.openai.com/docs/assistants/tools/file-search | reviewed for triage |
| S003 | OpenAI File Search guide for Responses API | Official docs | Confirms file search as hosted retrieval over vector stores with semantic and keyword search. | https://platform.openai.com/docs/guides/tools-file-search/ | queued |
| S004 | OpenAI Retrieval guide | Official docs | Vector stores and retrieval API reference for OpenAI-hosted retrieval. | https://platform.openai.com/docs/guides/retrieval | queued |
| S005 | OpenAI embeddings docs | Official docs | Embedding model options and intended uses for semantic search. | https://platform.openai.com/docs/guides/embeddings | queued |
| S006 | Anthropic Contextual Retrieval | Vendor research/engineering | Strong claim that adding document context to chunks and combining BM25 + embeddings + reranking reduces retrieval failures. | https://www.anthropic.com/research/contextual-retrieval | reviewed for triage |
| S007 | Pinecone Hybrid Search docs | Official docs | Clear explanation of semantic vs lexical limits and hybrid retrieval patterns. | https://docs.pinecone.io/guides/search/hybrid-search | reviewed for triage |
| S008 | Pinecone Data Modeling docs | Official docs | Useful for multi-tenancy, filterable metadata, and access-control-oriented data modeling. | https://docs.pinecone.io/guides/index-data/data-modeling | queued |
| S009 | Pinecone RAG with Access Control | Vendor engineering | Practical pre-filter/post-filter access-control patterns with SpiceDB. | https://www.pinecone.io/learn/rag-access-control/ | queued |
| S010 | Qdrant Search docs | Official docs | Covers filtering, hybrid queries, text search, reranking, and low-latency search. | https://qdrant.tech/documentation/search/ | reviewed for triage |
| S011 | Qdrant Hybrid Search with Reranking | Official docs/tutorial | Shows dense + sparse + late-interaction/reranking pattern. | https://qdrant.tech/documentation/search-precision/reranking-hybrid-search/ | reviewed for triage |
| S012 | Weaviate Hybrid Search docs | Official docs | Explains hybrid search as vector + BM25 with score fusion and parameters. | https://weaviate.io/developers/weaviate/concepts/search/hybrid-search | reviewed for triage |
| S013 | PostgreSQL Text Search docs | Official docs | Shows built-in lexical search primitives for Postgres-based hybrid systems. | https://www.postgresql.org/docs/current/datatype-textsearch.html | queued |
| S014 | LangSmith RAG evaluation tutorial | Official docs | Practical RAG evaluation workflow and tracing/evaluation loop. | https://docs.langchain.com/langsmith/evaluate-rag-tutorial | queued |
| S015 | LlamaIndex RAG workflow with reranking | Framework docs | Shows basic RAG ingestion, retrieval, and reranking flow. | https://docs.llamaindex.ai/en/stable/examples/workflow/rag/ | queued |
| S016 | LlamaIndex retrieval evaluation docs | Framework docs | Retrieval metrics such as hit rate, MRR, precision, and recall for retriever evaluation. | https://docs.llamaindex.ai/en/stable/api_reference/evaluation/retrieval/ | queued |
| S017 | RAGAS paper | Research paper | Reference-free RAG evaluation framework; useful for faithfulness/context metrics. | https://arxiv.org/abs/2309.15217 | queued |
| S018 | RAGChecker paper | Research paper | Fine-grained diagnosis of retrieval and generation modules. | https://arxiv.org/abs/2408.08067 | queued |
| S019 | TruLens RAG Triad | Official docs | Simple evaluation lens: context relevance, groundedness, answer relevance. | https://www.trulens.org/getting_started/core_concepts/rag_triad/ | reviewed for triage |
| S020 | OWASP Top 10 for LLM Applications 2025 | Security guidance | Risks relevant to production RAG: prompt injection, data poisoning, vector/embedding weaknesses, sensitive info disclosure. | https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf | queued |
| S021 | Microsoft Agent Framework RAG docs | Official docs | Recent Microsoft RAG tooling docs and connector framing; includes GraphRAG pointer. | https://learn.microsoft.com/en-us/agent-framework/agents/rag | reviewed for triage |
| S022 | Microsoft GraphRAG project | Official research/project page | Positions GraphRAG for richly understanding text datasets through extraction, network analysis, prompting, and summarization. | https://www.microsoft.com/en-us/research/project/graphrag/ | reviewed for triage |
| S023 | Microsoft GraphRAG CLI docs | Official docs | Shows graph index/query workflow and defaults. | https://microsoft.github.io/graphrag/cli/ | reviewed for triage |
| S024 | Use Graph When It Needs | Research preprint | 2026 evidence that GraphRAG may underperform vanilla RAG on simple queries and should be routed conditionally. | https://arxiv.org/abs/2602.03578 | reviewed for triage |
| S025 | SoK: Agentic RAG | Research preprint | 2026 taxonomy for agentic RAG; useful but should not drive default for simple solo-builder RAG yet. | https://arxiv.org/abs/2603.07379 | queued |
| S026 | Comprehensive RAG survey | Research survey | Broad taxonomy of RAG architectures, enhancements, robustness, and evaluation. | https://arxiv.org/abs/2506.00054 | queued |
| S027 | On-premises enterprise RAG blueprint | Research preprint | Useful for enterprise/on-prem caveats, not first default for solo builders. | https://arxiv.org/abs/2604.01395 | queued |

## Triage Summary

Early evidence points toward:

- hybrid retrieval as safer than vector-only for production defaults
- reranking as a common practical quality layer
- evals as mandatory for deciding whether retrieval changes help
- access control as an architecture concern, not prompt polish
- GraphRAG as conditional rather than universal
- agentic RAG as an advanced pattern, not a first default

## Review Gaps

Still needs deeper review:

- benchmark comparisons across vector-only, hybrid, and reranked systems for small-to-medium production corpora
- cost/latency data for reranking and GraphRAG
- practical chunk-size defaults across document types
- source attribution UX patterns
- access-control leakage cases and mitigations

