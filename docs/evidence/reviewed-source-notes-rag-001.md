# Reviewed Source Notes For RAG-001

Date: 2026-05-16

Status: source-backed notes for the first Baseplate decision package. These are still private and should be checked once more before publication.

## Decision Being Supported

RAG-001 asks:

Should a solo AI builder start production RAG with vector-only retrieval, hybrid retrieval, GraphRAG, or agentic RAG?

Current Baseplate default:

Use hybrid retrieval plus metadata filters, reranking, citations, and evals as the production default. Use vector-only for prototypes/simple corpora. Use GraphRAG or agentic RAG only when query/data complexity justifies them.

## Source Notes

### OpenAI File Search Docs

URL: https://platform.openai.com/docs/assistants/tools/file-search

Useful evidence:

- OpenAI describes File Search as implementing retrieval best practices out of the box.
- It rewrites user queries, breaks complex queries into multiple parallel searches, runs keyword and semantic search, and reranks results before final generation.
- It exposes default chunking/ranking settings and notes known limitations around deterministic pre-search metadata filtering, images in documents, structured formats, and summarization.

Baseplate interpretation:

Managed retrieval systems are already multi-stage. This is strong evidence against treating "vector DB + top-k + prompt" as the production default.

Caveat:

OpenAI File Search is hosted and opinionated. Its limitations matter for systems needing deterministic metadata filters, custom retrieval controls, structured data retrieval, or stricter access-control guarantees.

### Pinecone Hybrid Search Docs

URL: https://docs.pinecone.io/guides/search/hybrid-search

Useful evidence:

- Pinecone says semantic search and lexical search are both powerful but have different limitations.
- Semantic search can miss exact keyword matches, especially domain-specific terminology.
- Lexical search can miss synonyms and paraphrases.
- Pinecone explicitly recommends normalization/weighting patterns before production because sparse and dense scores are not naturally comparable.

Baseplate interpretation:

Hybrid retrieval has a clear rationale: exact-match and semantic-match failures differ. But hybrid search is not free magic; score fusion/weighting is part of the architecture.

Caveat:

Hybrid requires tuning and evaluation. It can add operational complexity, especially if dense and sparse indexes are separate.

### Weaviate Hybrid Search Docs

URL: https://docs.weaviate.io/weaviate/concepts/search/hybrid-search

Useful evidence:

- Weaviate defines hybrid search as combining vector search and BM25.
- It runs both searches in parallel, combines normalized scores, and returns a combined ranking.
- It exposes the `alpha` parameter to weight vector vs keyword contribution.

Baseplate interpretation:

This supports hybrid retrieval as a mature, common search pattern. It also reinforces that weighting and score fusion are important design choices.

Caveat:

The right alpha/fusion behavior depends on corpus and query mix.

### Qdrant Search + Hybrid Reranking Docs

URLs:

- https://qdrant.tech/documentation/search/
- https://qdrant.tech/documentation/search-precision/reranking-hybrid-search/

Useful evidence:

- Qdrant's Query API includes hybrid search and multi-stage search as supported strategies.
- Qdrant's hybrid reranking tutorial frames reranking as a precision layer applied to a smaller candidate set retrieved by faster methods.
- The tutorial combines dense embeddings, sparse/BM25-style retrieval, and late-interaction embeddings for reranking.

Baseplate interpretation:

Hybrid plus reranking is a practical production pattern: broad first-stage recall, then deeper relevance scoring.

Caveat:

Tutorial examples are not neutral benchmarks. Reranking adds latency/cost and must be tested against the target workload.

### Anthropic Contextual Retrieval

URL: https://www.anthropic.com/engineering/contextual-retrieval

Useful evidence:

- Anthropic argues that semantic embeddings can miss exact matches and that BM25 is useful for unique identifiers or technical terms.
- Their workflow combines chunking, BM25, embeddings, rank fusion, and context injection.
- They report contextual embeddings plus contextual BM25 reducing top-20 retrieval failure, and further improvement with reranking.
- They explicitly call out chunk boundaries, embedding model choice, number of chunks, and reranking cost/latency as implementation considerations.

Baseplate interpretation:

This strongly supports the "production RAG is a retrieval system, not just an embedding store" framing.

Caveat:

This is vendor research. The reported gains depend on methodology, models, corpus, and evaluation setup.

### TruLens RAG Triad

URL: https://www.trulens.org/getting_started/core_concepts/rag_triad/

Useful evidence:

- TruLens frames RAG evaluation around context relevance, groundedness, and answer relevance.
- It notes RAG can still hallucinate when retrieval fails or irrelevant context is used.

Baseplate interpretation:

Evaluation must check retrieval and generation separately. This supports making evals part of the default architecture.

Caveat:

LLM-based evals require calibration. They should be combined with curated question sets and human review for high-risk use cases.

### LangSmith RAG Evaluation Tutorial

URL: https://docs.langchain.com/langsmith/evaluate-rag-tutorial

Useful evidence:

- LangSmith separates correctness, relevance, groundedness, and retrieval relevance.
- It shows groundedness as answer vs retrieved docs and retrieval relevance as retrieved docs vs input.

Baseplate interpretation:

This reinforces the same measurement split: answer quality, context quality, and grounding are different axes.

Caveat:

The tutorial uses LLM-as-judge evaluators, which can be useful but should not be treated as perfect truth.

### LlamaIndex Retrieval Evaluation Docs

URL: https://developers.llamaindex.ai/python/framework-api-reference/evaluation/retrieval/

Useful evidence:

- LlamaIndex includes retrieval metrics such as hit rate and MRR.
- Hit rate checks whether expected documents appear in retrieved results.
- MRR measures how early relevant documents appear.

Baseplate interpretation:

Before choosing vector-only vs hybrid vs reranked retrieval, builders should run retrieval-specific evals, not only inspect final answer quality.

Caveat:

Metrics require expected document IDs/texts or some labeled evaluation set. Builders need a small but realistic question set.

### Microsoft GraphRAG

URLs:

- https://www.microsoft.com/en-us/research/project/graphrag/
- https://microsoft.github.io/graphrag/

Useful evidence:

- Microsoft frames GraphRAG as a structured, hierarchical approach involving knowledge graph extraction, community hierarchy, summaries, and query-time use of graph structures.
- Microsoft highlights situations where baseline RAG struggles to connect disparate information or answer holistic questions over large collections.

Baseplate interpretation:

GraphRAG is a real pattern for relationship-heavy and global-corpus questions. It is not merely hype.

Caveat:

GraphRAG adds indexing, entity/relationship extraction, community generation, summaries, prompt tuning, and maintenance. It should be conditional.

### Use Graph When It Needs

URL: https://arxiv.org/abs/2602.03578

Useful evidence:

- The paper argues rigidly applying GraphRAG to all queries can hurt accuracy and latency in real-world mixed scenarios.
- It proposes routing between dense RAG and graph-based retrieval based on query complexity.

Baseplate interpretation:

This is a useful caveat against GraphRAG-by-default. It supports "route to GraphRAG when needed" rather than replacing ordinary RAG entirely.

Caveat:

It is a 2026 preprint. Treat as emerging evidence, not settled consensus.

### OWASP GenAI Top 10 2025

URL: https://genai.owasp.org/llm-top-10/

Useful evidence:

- OWASP lists prompt injection, sensitive information disclosure, data/model poisoning, excessive agency, vector and embedding weaknesses, misinformation, and unbounded consumption among 2025 GenAI/LLM risks.

Baseplate interpretation:

Production RAG decisions must include security, access control, poisoning, retrieval integrity, and cost controls. Security is architecture, not prompt polish.

Caveat:

OWASP guidance is broad. RAG-specific mitigations need to be mapped into concrete retrieval, filtering, permission, and logging decisions.

## Strongest Current Claim

The strongest defensible claim is:

> For production RAG, vector-only retrieval is better treated as a baseline/prototype, not as the default final architecture. A safer production default is hybrid retrieval with metadata controls, reranking, citations, and evals.

## Strongest Caveat

Hybrid retrieval is not automatically better. It can be slower, harder to tune, and operationally more complex. The correct rule is not "always hybrid"; it is "measure vector-only, lexical, hybrid, and reranked variants against a realistic eval set, then keep the simplest passing architecture."

