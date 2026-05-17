# Baseplate Outreach Batch 001

Date: 2026-05-16

Purpose: first 5 to 10 conversations for validating RAG-001 and the USD 99 review offer.

Do not spam. Personalize each message based on the person's actual project or post.

## Target Profile

Look for builders who mention:

- RAG
- document Q&A
- knowledge assistants
- vector databases
- LangChain
- LlamaIndex
- evals
- customer support AI
- internal search
- enterprise search
- AI agents over docs

## Message 1: Feedback On Decision

Hey [name], quick question. I am testing Baseplate, a practical decision layer for AI builders.

First wedge is production RAG. My current decision is: vector-only is fine for prototypes, but production RAG usually needs measured hybrid retrieval, metadata filters, reranking, citations, and evals.

Would that have saved you time on any RAG project, or is it too obvious?

## Message 2: Pain Discovery

Hey [name], I am collecting painful RAG architecture decisions from builders.

What was the most annoying choice in your last RAG build: chunking, retrieval, reranking, evals, citations, RBAC/security, or cost?

I am turning repeated answers into a public decision guide.

## Message 3: Offer Test

Hey [name], I am testing a lightweight RAG architecture review.

You answer a short intake form about your corpus, users, security, latency, and cost constraints. I return a practical architecture recommendation: vector-only vs hybrid vs GraphRAG vs agentic RAG, plus caveats and what not to overbuild.

I am testing the first few at USD 99. Useful, or not quite the thing builders need?

## Message 4: Specific To Vector DB Posts

Saw your post about [vector DB / retrieval / RAG].

I am testing a Baseplate decision: production RAG should not default to "vector DB + prompt." It should compare vector-only, lexical, hybrid, and reranked retrieval against a small eval set.

Does that match your experience, or have you seen vector-only hold up well enough?

## Message 5: Specific To GraphRAG Posts

Saw your GraphRAG note.

I am working on a Baseplate decision page that treats GraphRAG as conditional: useful for relationship-heavy or global-corpus questions, but not the default for ordinary document Q&A.

Curious if that matches your experience, or if you think GraphRAG should be a stronger default.

## Follow-Up If They Reply

Thanks, that is useful.

Would you be open to sharing:

1. what kind of corpus you were working with
2. what failed first
3. what you would have wanted a decision guide to tell you earlier

## Follow-Up If They Show Buying Intent

That sounds exactly like the use case I am testing the review for.

The first version is simple: you answer a short intake form, and I return a practical RAG architecture recommendation with retrieval strategy, caveats, eval plan, security notes, and what not to overbuild.

I am pricing the first few at USD 99 while validating the format.

## What To Record

For each conversation, record:

- person/handle
- channel
- what they are building
- exact pain words
- whether RAG-001 felt useful
- whether they challenged the default
- whether they asked for examples
- whether they would pay
- next step

