# Baseplate Evidence Bank Seed

Date: 2026-05-16

Status: seed evidence rows. These are structured starting points, not final public claims.

## Decision: RAG-001

Question:

> Should solo builders start production RAG with vector-only retrieval, hybrid retrieval, GraphRAG, or agentic RAG?

Working default:

> Start with hybrid retrieval plus reranking and evaluation. Use vector-only for prototypes and simple corpora. Use GraphRAG or agentic retrieval only when the query/data shape justifies the extra complexity.

## Evidence Rows

| Evidence ID | Source | Claim | Affected Decision | Limitation | Action |
| --- | --- | --- | --- | --- | --- |
| E001 | OpenAI File Search docs | OpenAI's hosted file search uses several retrieval practices: query rewriting, multiple searches, keyword + semantic search, and reranking. | RAG-001, retrieval default | Hosted implementation may not expose all controls and has known limitations around some metadata/structured retrieval cases. | Use as primary evidence that modern managed RAG defaults are not vector-only. |
| E002 | Pinecone Hybrid Search docs | Semantic and lexical search fail in different ways; hybrid search combines both to improve robustness. | RAG-001, hybrid default | Vendor docs; production result depends on weighting, normalization, corpus, and query mix. | Use with caveat. |
| E003 | Weaviate Hybrid Search docs | Hybrid search runs vector and BM25 search and fuses scores. | RAG-001, hybrid default | Score thresholds and BM25/vector normalization are non-trivial. | Use as supporting evidence. |
| E004 | Qdrant Search docs | Qdrant positions filtering, hybrid queries, text search, reranking, and low-latency search as part of search design. | RAG-001, production architecture | Docs show capabilities, not universal superiority. | Use as supporting evidence. |
| E005 | Qdrant Hybrid Search with Reranking | Hybrid search plus reranking is presented as a way to cast a wide retrieval net then improve ranking. | RAG-001, reranking default | Tutorial-based; exact models and latency may not generalize. | Use with caveat. |
| E006 | Anthropic Contextual Retrieval | Anthropic reports contextual embeddings reduce retrieval failure and notes BM25 + embeddings + reranking as a stronger approach. | RAG-001, chunking/context/reranking | Vendor study; result may vary by corpus and setup. | Needs deeper review, likely important. |
| E007 | TruLens RAG Triad | RAG quality can be evaluated through context relevance, groundedness, and answer relevance. | RAG-002, eval defaults | LLM-as-judge metrics need calibration and may be imperfect. | Use to shape eval chapter. |
| E008 | RAGAS paper | RAGAS proposes reference-free evaluation for RAG pipelines. | RAG-002, eval defaults | Automated eval should not fully replace human review for high-stakes use. | Review deeper. |
| E009 | RAGChecker paper | RAGChecker argues for fine-grained diagnosis of retrieval and generation instead of black-box scores. | RAG-002, eval defaults | Requires more reading to know practical setup cost. | Review deeper. |
| E010 | Pinecone access-control guide | Access control can be handled through pre-filter and post-filter patterns with a permissions system. | RAG-003, RBAC/security | Post-filtering can retrieve unauthorized docs before filtering; architecture must account for threat model. | Use for security decision. |
| E011 | Pinecone data modeling docs | Namespaces and group-based filters can support multi-tenancy and access control data modeling. | RAG-003, multi-tenancy | Vendor-specific performance/cost details. | Use with caveat. |
| E012 | OWASP LLM Top 10 2025 | LLM apps have risks including prompt injection, data/model poisoning, sensitive info disclosure, and vector/embedding weaknesses. | RAG-003, security | Security guidance is broad and needs RAG-specific translation. | Use as security basis. |
| E013 | Microsoft GraphRAG project | GraphRAG combines text extraction, network analysis, prompting, and summarization for richer text-dataset understanding. | RAG-004, GraphRAG decision | Graph construction and indexing add cost/complexity. | Use for "when to use GraphRAG." |
| E014 | Microsoft GraphRAG CLI docs | GraphRAG has explicit index/query workflows and local/global search modes. | RAG-004, GraphRAG decision | Tooling is heavier than basic RAG. | Use as implementation evidence, not default. |
| E015 | Use Graph When It Needs | 2026 paper argues rigid GraphRAG for all queries can underperform vanilla RAG and add latency; proposes routing by query complexity. | RAG-004, GraphRAG decision | Preprint; needs more review. | Use as strong caveat against GraphRAG-by-default. |
| E016 | Microsoft Agent Framework RAG docs | Microsoft frames RAG as an agent/tool pattern over vector store connectors and points to GraphRAG separately. | RAG-001, stack flexibility | Framework-specific. | Use to support connector-agnostic framing. |
| E017 | PostgreSQL text search docs | Postgres has built-in full-text search types for natural-language document search. | RAG-005, low-cost stack | Postgres FTS is lexical; vector/hybrid design requires additional work. | Use in low-cost stack chapter. |
| E018 | NeurIPS 2020 RAG paper | Foundational work combined parametric generation with retrieved non-parametric memory for knowledge-intensive tasks. | RAG-000, background | Research framing predates current production patterns. | Use as background only. |

## Current Evidence-Based Working Claim

For production RAG in 2026, the most defensible default is not "vector database plus prompt." The default should be an evaluated retrieval system: hybrid candidate generation, metadata filters, reranking, grounded generation, citations, and measurement.

Confidence: medium.

Reason confidence is not high yet:

- source queue is triaged, not fully reviewed
- vendor docs agree directionally but are not neutral benchmarks
- solo-builder workloads vary widely
- actual choice depends on corpus, query mix, latency, cost, and security constraints

## Reviewed Evidence Rows Added During Goal Run

| Evidence ID | Source | More Precise Claim | Affected Decision | Limitation | Confidence Hint |
| --- | --- | --- | --- | --- | --- |
| E019 | OpenAI File Search docs | OpenAI File Search rewrites queries, decomposes complex queries into multiple searches, runs keyword and semantic search, and reranks before generation. | RAG-001 | Hosted tool has limitations, including deterministic pre-search metadata filtering and structured formats. | High for hosted retrieval behavior; medium for generalizing to all stacks. |
| E020 | Pinecone Hybrid Search docs | Pinecone explicitly names complementary failures: semantic search can miss exact keywords; lexical search can miss synonyms/paraphrases. | RAG-001 | Pinecone warns dense/sparse scores need normalization or weighting before production. | High for hybrid rationale; medium for default recommendation. |
| E021 | Weaviate Hybrid Search docs | Weaviate hybrid search runs vector and BM25 search in parallel, combines normalized scores, and exposes an alpha weighting parameter. | RAG-001 | Fusion/alpha settings are workload-dependent. | High for hybrid pattern maturity. |
| E022 | Qdrant Hybrid Reranking docs | Qdrant shows dense and sparse retrieval followed by late-interaction reranking as a practical hybrid architecture. | RAG-001 | Tutorial example, not a neutral benchmark. | Medium. |
| E023 | Anthropic Contextual Retrieval | Anthropic reports that contextual embeddings plus contextual BM25 and reranking reduced retrieval failure in its tests, and recommends balancing reranking quality against latency/cost. | RAG-001 | Vendor research; model/corpus choices may not transfer. | Medium-high as directional evidence. |
| E024 | TruLens RAG Triad | RAG evaluation should inspect context relevance, groundedness, and answer relevance because RAG can still hallucinate when retrieval fails or irrelevant context is used. | RAG-002 | LLM-as-judge evals need calibration. | Medium-high for eval framing. |
| E025 | LangSmith RAG evaluation docs | LangSmith separates groundedness, retrieval relevance, correctness, and answer relevance in RAG evaluation. | RAG-002 | Example tutorial, not a universal eval recipe. | Medium. |
| E026 | LlamaIndex retrieval metrics | LlamaIndex includes retrieval-specific metrics such as MRR and hit-rate-style measures. | RAG-002 | Requires expected IDs/texts or labeled eval examples. | Medium. |
| E027 | Microsoft GraphRAG docs | GraphRAG extracts entities/relationships, builds hierarchy/summaries, and targets connected or holistic corpus questions. | RAG-004 | Adds substantial indexing and maintenance complexity. | Medium-high for GraphRAG use cases. |
| E028 | Use Graph When It Needs | 2026 preprint argues rigid GraphRAG can reduce accuracy and increase latency on simple queries, supporting adaptive routing. | RAG-004 | Preprint; not settled consensus. | Medium as caveat evidence. |
| E029 | OWASP GenAI Top 10 2025 | Production RAG systems must account for prompt injection, data leakage, data/model poisoning, vector/embedding weaknesses, misinformation, and unbounded consumption. | RAG-003 | Broad GenAI security guidance, not a RAG implementation guide. | Medium-high for security risk inclusion. |

## Updated Decision Confidence

Direction confidence: medium-high.

Exact default confidence: medium.

Reason:

The source review strongly supports moving beyond naive vector-only RAG for production. It does not support a universal "always hybrid" rule. The strongest formulation is:

> Default to measured hybrid retrieval for production, then keep the simplest architecture that passes the eval.
