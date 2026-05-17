# Baseplate Next Session Bridge

Date updated: 2026-05-17

Use this file to start the next Codex session without reloading the whole conversation.

## Current State

Baseplate is a living AI architecture decision layer for builders.

The first wedge is production RAG for solo AI builders and small teams.

The repo is now the canonical home for polished docs. Notion is private operating memory. Raw chat backups are stored locally and indexed in Notion, not in GitHub.

## Where We Are

We are in the private validation phase.

Already created:

- public repo structure
- RAG-001 decision page
- Architecture Diff #001 draft
- Baseplate RAG Lab v1 scaffold
- evidence schema and source queue
- reviewed source notes
- custom RAG review offer
- intake/deliverable templates
- Week 1 operating plan
- Graphify relationship map
- Notion private backup and raw archive index

The project is not yet validated by users and has no revenue yet.

## Next Best Action

Move from strategy to public proof.

Recommended next task:

1. Run `npm run rag:index` with `OPENAI_API_KEY` set.
2. Run `npm run rag:eval -- --limit 5`.
3. Record failure cases in `labs/rag-lab/lab-notes.md`.
4. Update `RAG-001` from the lab observations.
5. Final-polish and share one artifact with 5 builders.

## Important Constraints

- Do not broaden beyond RAG yet.
- Do not build SaaS or CLI yet.
- Do not put raw private chat in GitHub.
- Do not publish overconfident claims.
- Do not change a decision unless new evidence is meaningfully stronger, directly relevant, contradictory, or reveals major risk.

## Fast Context Links

- `AGENTS.md`
- `README.md`
- `docs/reference/master-plan.md`
- `labs/rag-lab/README.md`
- `labs/rag-lab/lab-notes.md`
- `docs/decisions/RAG-001-default-retrieval-architecture.md`
- `docs/diffs/architecture-diff-001.md`
- `docs/offers/custom-rag-review-offer.md`
- `docs/validation/week-1-operating-plan.md`
- `docs/reference/github-notion-workflow.md`
- `graphify-out/GRAPH_REPORT.md`

## Best Prompt For The Next Session

Continue Baseplate from `NEXT_SESSION_BRIDGE.md` and `AGENTS.md`. Focus on grounding RAG-001 through the Baseplate RAG Lab. First inspect `labs/rag-lab/README.md`, `labs/rag-lab/lab-notes.md`, and `docs/decisions/RAG-001-default-retrieval-architecture.md`. Then help run or interpret the lab before public sharing.
