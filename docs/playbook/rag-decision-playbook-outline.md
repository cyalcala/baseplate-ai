# Baseplate RAG Decision Playbook Outline

Date: 2026-05-16

Working title:

> Baseplate RAG Decision Playbook: Practical Defaults for Production RAG Builders

## Promise

Help solo AI builders avoid re-litigating every RAG architecture choice by giving evidence-backed defaults, caveats, and "when not to use this" rules.

## Reader

A solo builder who is technical enough to build with APIs/frameworks but does not want to drown in papers, vendor docs, and hype.

## Chapter 1: The Production RAG Default

Decision:

Should I start with vector-only, hybrid, GraphRAG, or agentic RAG?

Working default:

Start with hybrid retrieval plus reranking and evals.

Sections:

- default architecture diagram
- when vector-only is enough
- when hybrid retrieval is worth it
- why reranking belongs after broad retrieval
- why GraphRAG is conditional
- why agentic RAG is not the first default

## Chapter 2: Ingestion And Document Preparation

Decisions:

- How should I parse documents?
- What metadata should be stored?
- Should I preserve document structure?
- How should I handle PDFs, tables, markdown, and code?

Working defaults:

- preserve source document identity
- store source URL/path, title, section heading, last updated date, owner, tenant, ACL/group tags, document type
- chunk by structure before arbitrary token windows when possible

## Chapter 3: Chunking Defaults

Decisions:

- chunk size
- chunk overlap
- parent/child chunks
- contextual chunk labels

Working default:

Use structure-aware chunks when possible; use token chunks only as fallback. Start with moderate chunk size, evaluate recall, then tune.

Evidence to review:

- OpenAI File Search default chunking
- Anthropic Contextual Retrieval
- LlamaIndex chunking/retrieval docs

## Chapter 4: Retrieval Strategy

Decisions:

- vector-only vs hybrid
- BM25/sparse retrieval
- metadata pre-filtering
- query rewriting
- multi-query retrieval
- result fusion

Working default:

Hybrid retrieval for production unless corpus and query set prove vector-only is enough.

## Chapter 5: Reranking

Decisions:

- whether to rerank
- how many candidates to retrieve
- how many chunks to pass to the model
- when reranking cost is justified

Working default:

Use reranking when answer quality matters and when first-stage retrieval has mixed quality. Keep it feature-flagged and measured.

## Chapter 6: Generation And Source Attribution

Decisions:

- how many chunks to include
- citation format
- refusal behavior
- answer style
- evidence coverage

Working default:

Require citations/source attribution for factual answers. Refuse or ask for clarification when retrieved context is insufficient.

## Chapter 7: Evaluation

Decisions:

- what to measure
- how to build an eval set
- whether to use LLM-as-judge
- how to detect regressions

Working default:

Start with a small real-question eval set and measure:

- retrieval recall/hit rate
- context relevance
- groundedness/faithfulness
- answer relevance
- latency
- cost
- refusal correctness

## Chapter 8: Security, RBAC, And Multi-Tenancy

Decisions:

- namespace-per-tenant vs metadata filters
- pre-filter vs post-filter
- document permissions
- prompt injection through retrieved content
- poisoning and stale docs

Working default:

Treat access control as retrieval architecture, not prompt wording. Prefer pre-filtering or tenant isolation where possible for sensitive data.

## Chapter 9: Cost And Latency

Decisions:

- hosted file search vs custom stack
- embedding costs
- reranking costs
- storage costs
- caching
- batch ingestion

Working default:

Prototype with managed tools if they meet constraints. Move custom only when you need control over retrieval behavior, filtering, cost, or deployment.

## Chapter 10: When To Use GraphRAG

Decisions:

- graph or not
- local/global graph search
- entity extraction cost
- update cost

Working default:

Use GraphRAG only when relationship structure and multi-hop/global questions justify graph construction and maintenance.

## Chapter 11: When To Use Agentic RAG

Decisions:

- static retrieval vs agentic retrieval
- query planning
- iterative retrieval
- tools
- control/observability

Working default:

Do not start with agentic RAG for ordinary document Q&A. Add agentic retrieval when query complexity, tool use, and user value justify latency and control risk.

## Chapter 12: Production Checklist

Checklist:

- documents have source metadata
- chunks are inspectable
- retrieval logs are stored
- eval set exists
- vector-only and hybrid are compared
- reranking is measured
- citations are tested
- permissions are enforced before answer generation
- prompt injection risk is considered
- stale docs have freshness policy
- cost/latency budget is known

