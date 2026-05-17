# Baseplate AI

Baseplate is a living AI architecture decision layer for builders.

The first wedge is production RAG: practical defaults, source-backed evidence, caveats, and decision history for solo AI builders who do not want to re-research the same architecture choices from scratch.

## Current Decision

`RAG-001`: For production RAG, default to measured hybrid retrieval:

- dense semantic retrieval
- lexical/sparse retrieval
- metadata filters
- reranking when quality matters
- citations/source attribution
- retrieval and answer evals

The rule is not "always use hybrid."

The rule is:

> Keep the simplest architecture that passes a realistic eval set.

## Repository Map

```text
docs/
  decisions/   Stable decision pages
  diffs/       Architecture Diff posts
  evidence/    Source queue, reviewed notes, and evidence schema
  offers/      Productized review offer and templates
  playbook/    RAG Decision Playbook drafts
  reference/   Comparison tables and reusable reference material
  validation/  Outreach, weekly operating plan, and validation tracking
```

## Start Here

- [RAG-001 default retrieval architecture](docs/decisions/RAG-001-default-retrieval-architecture.md)
- [Architecture Diff #001](docs/diffs/architecture-diff-001.md)
- [Week 1 operating plan](docs/validation/week-1-operating-plan.md)
- [Custom RAG review offer](docs/offers/custom-rag-review-offer.md)
- [GitHub and Notion workflow](docs/reference/github-notion-workflow.md)

## Trust Contract

Every Baseplate recommendation should include:

- recommended default
- when to use it
- when not to use it
- evidence basis
- caveats
- builder action
- what would change the decision

## Current Status

Private validation phase.

Do not treat these docs as final public claims yet. The next milestone is to share one RAG-001 artifact with 5 to 10 builders and record whether the decision saves time, prevents a bad choice, or creates demand for a custom review.
