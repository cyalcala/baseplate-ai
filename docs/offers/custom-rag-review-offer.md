# Baseplate Custom RAG Review Offer

Date: 2026-05-16

Status: private validation offer draft

## Offer Name

Baseplate RAG Architecture Review

## Price

Starter validation price: USD 99

Later price if demand appears: USD 199 to USD 299

## One-Sentence Offer

Answer a short intake form about your RAG product, corpus, users, security needs, and latency/cost constraints; receive a practical architecture recommendation with defaults, caveats, risks, and what not to overbuild.

## Who It Is For

Solo AI builders and small teams building:

- document Q&A
- internal knowledge assistants
- customer support RAG
- AI research assistants
- policy/legal/document intelligence
- product documentation assistants

## What The Buyer Gets

Deliverable:

- 1 to 2 page RAG architecture recommendation
- retrieval default: vector-only, hybrid, GraphRAG, or agentic RAG
- chunking/metadata notes
- eval checklist
- security/RBAC notes
- cost/latency warnings
- "do not build yet" list
- source-backed caveats

Turnaround:

- 48 to 72 hours for the first manual version

## Intake Questions

1. What are you building?
2. Who are the users?
3. What documents are being searched?
4. Rough corpus size?
5. Are documents technical, legal, support, sales, code, or mixed?
6. Do users need citations?
7. Are there tenants, roles, permissions, or private documents?
8. What failures are unacceptable?
9. What latency budget do you have?
10. What monthly cost range is acceptable?
11. Are questions mostly factual lookup, multi-hop, global summaries, or workflows?
12. What stack are you already using?

## Recommendation Template

### Recommended Default

State the chosen architecture:

- vector-only
- lexical baseline
- hybrid retrieval
- hybrid plus reranking
- GraphRAG
- agentic RAG

### Why

Explain the recommendation in plain language tied to their corpus and users.

### When This Could Be Wrong

Give caveats and conditions that would change the recommendation.

### First Implementation Shape

List the first version they should build.

### What Not To Build Yet

List tempting overbuilds to avoid.

### Eval Plan

Give a 30 to 50 question eval plan and what to measure.

### Security Notes

Call out permissions, leakage, prompt injection, poisoning, and logging concerns.

## Sales Message

Short DM:

> I am testing Baseplate, a practical architecture decision layer for AI builders. First wedge is production RAG. If you are building document Q&A or a knowledge assistant, I can review your use case and return a source-backed RAG architecture recommendation: retrieval strategy, chunking/metadata notes, eval checklist, security caveats, and what not to overbuild. I am testing the first few at USD 99. Useful, or too early?

## Validation Goal

Do not optimize for many sales yet.

Goal:

- 5 conversations
- 1 paid review or serious buyer request
- 3 objections documented
- 1 repeated pain pattern discovered

## Success Criteria

The offer is worth continuing if:

- builders understand it in one sentence
- they share real RAG context without heavy explanation
- they ask what the deliverable looks like
- at least one person pays, preorders, or asks to be first

## Failure Signals

Change the offer if:

- people say it is too abstract
- they want implementation help instead of a decision review
- they ask for examples before paying
- they do not know what RAG decision they need help with

Possible adjustment:

Turn the offer into:

> "I will tell you whether your RAG should be vector-only, hybrid, GraphRAG, or agentic, and give you the simplest first version to build."

