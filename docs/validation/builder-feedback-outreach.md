# Builder Feedback Outreach

Date: 2026-05-16

Purpose: validate whether the first Baseplate decision is useful to real builders.

## Who To Ask

Find 5 to 10 people who are:

- building RAG
- building document Q&A
- building customer support AI
- building internal knowledge assistants
- building AI products as solo founders
- posting about LangChain, LlamaIndex, vector DBs, evals, agents, or RAG

## One-Line Product Explanation

Baseplate gives AI builders evidence-backed architecture defaults so they do not have to re-research the same RAG decisions from scratch.

## Feedback Ask

Short version:

> I am testing a decision layer for AI builders. First wedge is production RAG. Would this decision save you time or prevent a bad architecture choice?

## DM Option 1: Direct

Hey, I am testing a small product idea called Baseplate: evidence-backed architecture defaults for AI builders.

First wedge is production RAG. I drafted a decision: vector-only is fine for prototypes, but production RAG should usually start with hybrid retrieval + reranking + evals unless the corpus proves otherwise.

Would this have saved you time on any RAG project, or is it too obvious?

## DM Option 2: Softer

Quick question: when you build RAG systems, do you usually start vector-only and add hybrid/reranking later, or do you start with hybrid from the beginning?

I am testing whether a practical decision guide for solo AI builders would actually save people time.

## DM Option 3: Ask For Pain

I am collecting painful RAG architecture decisions from builders.

What was the most annoying choice you had to make recently: chunking, retrieval, reranking, evals, citations, security, or cost?

I am turning repeated answers into a public decision guide.

## DM Option 4: Custom Review Offer

I am testing a lightweight RAG architecture review offer.

You answer 5 questions about your corpus, users, security needs, and latency/cost constraints. I return a practical recommended RAG architecture with caveats and what not to overbuild.

Would that be useful at USD 99, or would you expect something different?

## Questions To Track

For each person:

- Did they understand Baseplate in one sentence?
- Which decision did they care about?
- Did they disagree with the default?
- Did they ask for the full playbook?
- Would they pay for a custom review?
- What exact words did they use for their pain?

## Validation Signals

Weak signal:

- likes or polite replies only

Medium signal:

- asks for more detail
- shares a specific RAG pain
- says the decision would help

Strong signal:

- asks for the playbook
- wants a review
- offers to pay/preorder
- introduces another builder

