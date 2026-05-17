# RAG-001: Default Retrieval Architecture For Production RAG

Date reviewed: 2026-05-16

Status: draft public decision page

## Question

Should a solo AI builder start production RAG with vector-only retrieval, hybrid retrieval, GraphRAG, or agentic RAG?

## Current Default

Start production RAG with measured hybrid retrieval:

- dense semantic retrieval
- lexical/sparse retrieval
- metadata filters
- reranking when quality matters
- citations/source attribution
- retrieval and answer evals

Use vector-only as the prototype baseline.

Use GraphRAG or agentic RAG only when the query/data shape justifies the added complexity.

## Why

Real production documents are messy. They include exact terms, acronyms, SKUs, policy names, version numbers, internal labels, and technical identifiers.

Dense semantic search can miss exact terms. Lexical search can miss paraphrases. Hybrid retrieval combines both signals, but it still needs tuning and evaluation.

The strongest practical rule is:

> Keep the simplest architecture that passes a realistic eval set.

## Use Hybrid Retrieval When

- users ask factual questions over documents
- source citations matter
- exact terms matter
- missed context damages trust
- documents are technical, legal, product, policy, or support-heavy
- the corpus is heterogeneous
- tenant or permission boundaries matter

## Use Vector-Only First When

- you are prototyping
- the corpus is small
- the documents are semantically clean
- exact identifiers are rare
- latency/cost matters more than recall
- no real question set exists yet

## Use GraphRAG When

- entity relationships matter
- multi-hop questions are common
- users ask global questions across the corpus
- graph construction and maintenance are worth the cost

## Use Agentic RAG When

- the task requires planning
- retrieval must be iterative
- tools must be selected dynamically
- latency, cost, and observability trade-offs are acceptable

## Evaluation Checklist

Build 30 to 50 realistic questions and test:

1. vector-only
2. lexical-only
3. hybrid
4. hybrid plus reranking

Track:

- correct source retrieved
- correct source ranked near top
- answer cites source
- answer grounded in context
- exact-term failures
- paraphrase failures
- latency
- cost
- access-control behavior

## Evidence

- OpenAI File Search uses query rewriting, multiple searches, keyword plus semantic search, and reranking: https://platform.openai.com/docs/assistants/tools/file-search
- Pinecone documents the complementary limits of semantic and lexical search: https://docs.pinecone.io/guides/search/hybrid-search
- Weaviate documents hybrid search as vector search plus BM25 with score fusion: https://docs.weaviate.io/weaviate/concepts/search/hybrid-search
- Qdrant documents hybrid retrieval and reranking patterns: https://qdrant.tech/documentation/search-precision/reranking-hybrid-search/
- Anthropic contextual retrieval combines contextual chunks, embeddings, BM25, and reranking: https://www.anthropic.com/engineering/contextual-retrieval
- TruLens evaluates context relevance, groundedness, and answer relevance: https://www.trulens.org/getting_started/core_concepts/rag_triad/
- LangSmith separates groundedness and retrieval relevance in RAG evals: https://docs.langchain.com/langsmith/evaluate-rag-tutorial
- Microsoft GraphRAG targets connected/global corpus questions: https://microsoft.github.io/graphrag/
- A 2026 GraphRAG preprint argues for routing to graph retrieval only when query complexity warrants it: https://arxiv.org/abs/2602.03578
- OWASP GenAI Top 10 highlights risks relevant to production RAG security: https://genai.owasp.org/llm-top-10/

## Caveats

Hybrid retrieval is not automatically better. It can be slower, harder to tune, and more expensive.

Reranking improves quality only if it improves your eval set enough to justify latency and cost.

GraphRAG is powerful for connected knowledge, but graph construction and maintenance are real work.

LLM-as-judge evals are useful but imperfect; use them with curated examples and human review for high-risk decisions.

## Decision Rule

Default to measured hybrid retrieval for production RAG, but keep the simplest architecture that passes the eval.

