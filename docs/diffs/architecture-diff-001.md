# Architecture Diff #001: The Default RAG Stack Is Boring Now

Date: 2026-05-16

Status: near-publishable draft. Review once more before posting.

## Draft Post

Most RAG demos still look like this:

1. Chunk documents.
2. Embed chunks.
3. Store them in a vector database.
4. Retrieve top-k chunks.
5. Pass those chunks to the model.

That is a good prototype.

I would not treat it as the default production architecture.

My current Baseplate default for production RAG is:

> hybrid retrieval plus metadata filters, reranking, citations, and evals.

The reason is simple: real documents are messy.

They contain acronyms, SKUs, policy names, product names, legal terms, version numbers, internal code names, error messages, and exact phrases. Dense semantic search helps with meaning and paraphrases, but it can miss exact terms. Lexical search helps with exact terms, but it can miss synonyms and reworded questions.

Hybrid retrieval exists because these two failure modes are different.

This is not just a preference. Current retrieval docs and research all point toward multi-stage systems:

- OpenAI File Search uses query rewriting, multiple searches, keyword plus semantic search, and reranking.
- Pinecone notes that semantic search can miss exact keywords while lexical search can miss synonyms and paraphrases.
- Weaviate hybrid search combines vector search and BM25, then fuses scores.
- Qdrant shows dense and sparse retrieval followed by reranking.
- Anthropic's contextual retrieval work combines contextual chunks, embeddings, BM25-style retrieval, and reranking.

So the production default is no longer:

> vector DB + prompt

It is closer to:

1. parse documents carefully
2. preserve source metadata and permissions
3. chunk by document structure where possible
4. retrieve with dense semantic search
5. retrieve with lexical/sparse search
6. filter by tenant, permission, date, product, or document type
7. rerank a wider candidate set
8. generate an answer with citations
9. evaluate retrieval and answer quality separately

Vector-only RAG is still fine when:

- you are prototyping
- the corpus is small
- the documents are semantically clean
- exact identifiers do not matter much
- latency and cost matter more than recall

Hybrid retrieval is safer when:

- the documents are technical, legal, support, policy, or product-heavy
- users expect source citations
- exact terms matter
- missing one version, policy, SKU, or section number creates real user pain
- the system is customer-facing

GraphRAG is not the default either.

It is worth considering when relationships between entities matter, when users ask multi-hop questions, or when they need global answers across a corpus. Microsoft frames GraphRAG around extracting entities and relationships, building graph/community structures, and using those structures at query time. That is powerful, but it is also more machinery.

A useful 2026 preprint, "Use Graph When It Needs," argues against applying GraphRAG rigidly to every query. The better direction is conditional routing: use ordinary RAG for simple questions and graph retrieval when query complexity justifies it.

The same principle applies to agentic RAG. It can help with planning, tool use, and iterative retrieval, but it should earn its latency and control complexity.

The caveat:

Hybrid retrieval is not automatically better. It can be slower, harder to tune, and more operationally complex. Pinecone even warns that sparse and dense scores may need normalization or weighting before production.

So the rule is not:

> always use hybrid

The rule is:

> test the simplest architecture that could work, then add retrieval layers only when the eval proves they help.

Before shipping, run the same 30 to 50 real questions against:

1. vector-only
2. lexical-only
3. hybrid
4. hybrid plus reranking

Track:

- did the right source appear?
- did it appear near the top?
- did the final answer cite it?
- was the answer grounded in the retrieved context?
- what latency did each layer add?
- what did each answer cost?

Then keep the simplest system that passes the eval.

That is Baseplate's current RAG-001 default:

> Do not start with fancy. Start with measured.

## Comparison Table

| Option | Use When | Avoid When |
| --- | --- | --- |
| Vector-only | Prototype, small corpus, semantically clean docs | Exact IDs, policies, product names, or citations matter |
| Lexical-only | Exact keyword lookup and cheap baseline | Users ask paraphrased/semantic questions |
| Hybrid | Production document Q&A with messy corpora | You cannot evaluate or tune weighting/fusion |
| Hybrid + reranking | Quality matters enough to pay latency/cost | Latency/cost budget is too tight |
| GraphRAG | Entity relationships, multi-hop, global corpus questions | Ordinary FAQ or simple document lookup |
| Agentic RAG | Planning/tool use/iterative retrieval is needed | Static retrieval already passes evals |

## Sources

- OpenAI File Search: https://platform.openai.com/docs/assistants/tools/file-search
- Pinecone Hybrid Search: https://docs.pinecone.io/guides/search/hybrid-search
- Weaviate Hybrid Search: https://docs.weaviate.io/weaviate/concepts/search/hybrid-search
- Qdrant Search: https://qdrant.tech/documentation/search/
- Qdrant Hybrid Search with Reranking: https://qdrant.tech/documentation/search-precision/reranking-hybrid-search/
- Anthropic Contextual Retrieval: https://www.anthropic.com/engineering/contextual-retrieval
- TruLens RAG Triad: https://www.trulens.org/getting_started/core_concepts/rag_triad/
- LangSmith RAG evaluation: https://docs.langchain.com/langsmith/evaluate-rag-tutorial
- LlamaIndex retrieval evaluation: https://developers.llamaindex.ai/python/framework-api-reference/evaluation/retrieval/
- Microsoft GraphRAG: https://microsoft.github.io/graphrag/
- Use Graph When It Needs: https://arxiv.org/abs/2602.03578
- OWASP GenAI Top 10 2025: https://genai.owasp.org/llm-top-10/

## Suggested Social Caption

Architecture Diff #001:

Vector-only RAG is still a good prototype default.

But for production RAG, my current default is hybrid retrieval + metadata filters + reranking + citations + evals.

The point is not to make RAG fancy.

The point is to keep the simplest system that passes real questions.

## Builder Feedback Question

If you have built RAG recently: did exact terms, acronyms, IDs, or policy names cause retrieval failures for you, or was vector-only enough?

