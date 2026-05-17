# Baseplate Agent Context

Date updated: 2026-05-17

This file is the persistent operating context for Codex and other coding agents working in this repository.

## Project Thesis

Baseplate is a living AI architecture decision layer for builders.

The first wedge is production RAG. The product should help solo AI builders and small teams avoid re-researching the same architecture decisions from scratch.

Baseplate recommendations must be practical, evidence-backed, caveated, and explicit about when not to use a pattern.

## Current Scope

Work on `RAG-001` first:

- Baseplate RAG Lab v1
- default retrieval architecture for production RAG
- evidence bank and source notes
- Architecture Diff #001
- custom RAG architecture review offer
- validation workflow with 5 to 10 builder conversations

Do not expand into all AI architecture topics until RAG-001 gets real validation.

## Current Default Decision

For production RAG, the current draft default is measured hybrid retrieval:

- dense semantic retrieval
- lexical/sparse retrieval
- metadata filters
- reranking when quality matters
- citations/source attribution
- retrieval and answer evals

The rule is not "always use hybrid."

The rule is: keep the simplest architecture that passes a realistic eval set.

## Trust Contract

Every decision artifact should include:

- the question being answered
- recommended default
- when to use it
- when not to use it
- evidence basis
- caveats and failure modes
- builder action
- what would change the decision
- date reviewed

Never publish a confident recommendation without a caveat.

## Repository Map

- `README.md` - public entry point.
- `docs/README.md` - docs map and update rule.
- `docs/decisions/` - stable decision pages.
- `docs/diffs/` - Architecture Diff posts.
- `docs/evidence/` - source queue, evidence schema, reviewed notes, CSV evidence.
- `docs/offers/` - productized review offer and templates.
- `docs/playbook/` - RAG Decision Playbook drafts.
- `docs/reference/` - workflow, comparisons, master plan.
- `docs/validation/` - outreach, operating plan, validation tracker.

Private memory and raw chat backups are not part of the public repo.

## Public Vs Private Rules

GitHub is for polished artifacts:

- decisions
- diffs
- evidence schema
- source notes
- validation templates
- offer templates
- future automation code

Notion and local ignored folders are for private operating memory:

- raw conversation backups
- personal uncertainty
- messy notes
- builder CRM notes
- private strategy pivots
- links that should not be public

Do not commit:

- API keys or credentials
- payment details
- raw private transcripts
- private builder conversations
- local generated backups

## Current Business Path

Stage 1: public proof

- build a small managed RAG lab over Baseplate docs
- document retrieval failures and surprises
- publish one useful RAG decision artifact
- get builder feedback
- learn which decision actually matters

Stage 2: paid validation

- offer a USD 99 custom RAG architecture review
- deliver manually
- record objections and outcomes

Stage 3: repeatable decision product

- improve decision cards
- assemble paid RAG Decision Playbook
- publish weekly Architecture Diffs

Stage 4: software only after demand

- automate evidence ingestion
- add decision monitoring
- consider CLI, dashboard, or SaaS

## Model And Token Operating Model

Use high reasoning for:

- strategy decisions
- positioning
- source conflict resolution
- trust contract design
- architecture recommendation logic
- final review before publishing

Use cheaper/faster work for:

- formatting
- file cleanup
- extraction
- CSV updates
- simple markdown edits
- repetitive Notion/GitHub organization

Use Graphify for relationship questions before loading long docs.

Useful graph questions:

- What connects automation to trust?
- What connects RAG wedge to SaaS?
- Which nodes are weakly connected?
- What bridges evidence, validation, and money path?

## Build Discipline

Prefer small durable artifacts over broad discussion.

For each session:

1. Read `NEXT_SESSION_BRIDGE.md`.
2. Read the specific docs needed for the task.
3. Make the smallest useful change.
4. Verify files and git status.
5. Update `NEXT_SESSION_BRIDGE.md` if the direction changes.

Do not build SaaS, CLI, dashboards, or broad automation until the decision layer has user pull.

## Current Next Milestone

Turn `RAG-001` from a strong draft into public proof:

- run the managed RAG lab
- record what breaks
- update the decision page from lab observations
- final review of decision page
- final review of Architecture Diff #001
- share with 5 to 10 builders
- track whether it saves time, prevents bad decisions, or creates demand for a review
