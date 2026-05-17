# Retrieval Architecture Comparison

Date: 2026-05-16

Use this table in Architecture Diff #001 or the playbook.

| Option | Best For | Strengths | Weaknesses | Baseplate Default |
| --- | --- | --- | --- | --- |
| Vector-only RAG | Prototypes, small corpora, semantically clean docs | Simple, fast to build, fewer moving parts | Can miss exact terms, acronyms, IDs, versions, names; hard to know quality without evals | Good prototype default, not production default |
| Lexical-only search | Exact keyword lookup, identifiers, legal/technical terms | Strong exact match, interpretable, cheap in existing search systems | Weak on paraphrases and semantic similarity | Useful baseline and hybrid component |
| Hybrid retrieval | Most production document Q&A | Combines semantic and lexical signals; better coverage of messy docs | Needs fusion/weighting/tuning; can add complexity | Current production default |
| Hybrid + reranking | Higher-quality production RAG | Broad recall first, then better ranking; often improves final context quality | More latency/cost; reranker must be measured | Default when quality matters |
| Hosted file search | Fast prototypes, low-ops teams, managed workflows | Less infrastructure; provider handles parsing/chunking/retrieval behavior | Less control, provider limits, cost/storage constraints, possible opacity | Use when constraints fit |
| GraphRAG | Multi-hop, entity/relationship-heavy corpora, global corpus questions | Can model relationships and support richer global/local retrieval | Costly indexing, graph extraction, maintenance, latency | Conditional, not default |
| Agentic RAG | Multi-step research, tool use, query planning | Can adapt retrieval strategy and use tools dynamically | Harder to test/control, higher latency/cost, more security concerns | Advanced pattern after static RAG fails |

## Practical Rule

Start with the simplest architecture that can pass an eval set.

Suggested progression:

1. vector-only baseline
2. lexical baseline
3. hybrid retrieval
4. hybrid plus reranking
5. GraphRAG or agentic RAG only if failure cases justify them

## Evaluation Questions

Ask these before deciding:

- Did the correct source appear in retrieved context?
- Did the answer cite the correct source?
- Did the model make unsupported claims?
- Did exact terms fail?
- Did paraphrases fail?
- Did latency remain acceptable?
- Did cost remain acceptable?
- Did access control apply before answer generation?

