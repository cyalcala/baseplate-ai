# Baseplate Evidence Schema

Date: 2026-05-16

This schema is for a private evidence bank. It is designed to support decision quality, not to hoard links.

## Decision Table

Fields:

- `decision_id`
- `domain`
- `question`
- `recommended_default`
- `when_to_use`
- `when_not_to_use`
- `confidence`
- `basis_summary`
- `key_caveats`
- `status`
- `last_reviewed`
- `next_review_trigger`

Example:

| Field | Value |
| --- | --- |
| decision_id | RAG-001 |
| domain | Production RAG |
| question | Should a solo builder start with vector-only, hybrid, graph, or agentic retrieval? |
| recommended_default | Hybrid retrieval plus reranking and evals |
| confidence | Medium |
| status | Draft |
| last_reviewed | 2026-05-16 |

## Evidence Table

Fields:

- `evidence_id`
- `source_title`
- `source_url`
- `source_type`
- `source_quality`
- `claim`
- `affected_decision`
- `basis`
- `limitation`
- `date_published_or_updated`
- `date_reviewed`
- `confidence_hint`
- `action`

Source types:

- official docs
- research paper
- framework docs
- vendor engineering post
- credible engineering post
- benchmark
- repo/changelog
- community anecdote

Source quality:

- A: primary source or official documentation
- B: peer-reviewed or strong research preprint
- C: credible vendor/engineering source with clear details
- D: community anecdote or unverified claim

Action:

- use in decision
- needs deeper review
- archive for later
- watch for update
- contradicts current default

## Diff Table

Fields:

- `diff_id`
- `title`
- `old_default`
- `new_evidence`
- `decision_changed`
- `new_default`
- `builder_action`
- `caveat`
- `published_status`
- `date`

## Confidence Scale

High:

- multiple primary/official sources agree
- trade-offs are clear
- recommendation applies directly to solo-builder RAG
- known caveats are documented

Medium:

- strong directional evidence
- some source/vendor bias or incomplete benchmarks
- needs real-world validation

Low:

- speculative
- mostly anecdotal
- emerging research
- unclear production transfer

## Decision Change Threshold

A recommendation changes only when the new evidence is:

- stronger than the existing evidence
- directly relevant to the target builder
- contradictory to the existing default
- supported by more than novelty
- clear about limitations

Newer is not automatically better.

## Publication Rule

No public decision should be published unless:

- at least 5 evidence rows are reviewed
- at least 1 source is primary/official
- the caveat is explicit
- the "when not to use" section is written
- the user action is concrete

