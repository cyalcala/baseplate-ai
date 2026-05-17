# Architecture Diff #001 Post Variants

Date: 2026-05-16

Purpose: shorter variants of the RAG-001 post for different channels.

## LinkedIn Variant

Most RAG demos still follow the same pattern:

chunk documents, embed chunks, store them in a vector DB, retrieve top-k, pass to the model.

That is a good prototype.

I would not treat it as the default production architecture.

My current Baseplate default for production RAG is:

hybrid retrieval + metadata filters + reranking + citations + evals.

Why? Real documents are messy. They contain acronyms, SKUs, policy names, product names, version numbers, error codes, and exact phrases.

Dense semantic search helps with meaning, but it can miss exact terms. Lexical search helps with exact terms, but it can miss paraphrases. Hybrid retrieval exists because those failure modes are different.

The caveat: hybrid is not automatically better. It can be slower, harder to tune, and more expensive.

So the rule is not "always use hybrid."

The rule is:

keep the simplest architecture that passes a realistic eval set.

Before shipping, test the same 30 to 50 questions against vector-only, lexical-only, hybrid, and hybrid + reranking.

Track whether the right source appears, whether the answer cites it, whether it is grounded, and what latency/cost each layer adds.

That is Architecture Diff #001 for Baseplate.

Question for builders: where did your last RAG system fail first: retrieval, citations, evals, RBAC, or cost?

## X / Twitter Thread

1/ Vector-only RAG is still a good prototype default.

I would not treat it as the default production architecture anymore.

2/ Real docs contain acronyms, SKUs, policy names, version numbers, error codes, exact phrases.

Dense search can miss exact terms. Lexical search can miss paraphrases.

That is why hybrid retrieval exists.

3/ My current Baseplate default for production RAG:

- dense retrieval
- lexical/sparse retrieval
- metadata filters
- reranking
- citations
- evals
- logs

4/ The caveat:

Hybrid is not magic. It can be slower, harder to tune, and more expensive.

So the rule is not "always hybrid."

5/ The rule:

Keep the simplest architecture that passes a realistic eval set.

Test vector-only, lexical-only, hybrid, and hybrid + reranking on the same 30-50 questions.

6/ GraphRAG and agentic RAG are not defaults either.

They are conditional tools for relationship-heavy, multi-hop, global-corpus, or tool-use workflows.

7/ Baseplate Diff #001:

Do not start with fancy.

Start with measured.

Where did your last RAG system fail first?

## GitHub Discussion Variant

I am testing a small decision layer for AI builders called Baseplate. First decision: default retrieval architecture for production RAG.

Current draft:

For production RAG, vector-only should be treated as a prototype baseline, not the final default.

A safer production default is:

- dense retrieval
- lexical/sparse retrieval
- metadata filters
- reranking when quality matters
- citations/source attribution
- retrieval and answer evals

But the caveat matters:

Hybrid retrieval is not automatically better. The actual rule is to test vector-only, lexical-only, hybrid, and hybrid + reranking against the same realistic question set, then keep the simplest architecture that passes.

I would love feedback from anyone building RAG:

- Is this useful, or too obvious?
- Where did your RAG system fail first?
- Would a source-backed decision guide have saved you time?

## Short CTA

I am testing a USD 99 RAG architecture review.

You answer a short intake form. I return a practical recommendation: vector-only vs hybrid vs GraphRAG vs agentic RAG, with caveats, eval plan, security notes, and what not to overbuild.

Useful, or wrong shape?

