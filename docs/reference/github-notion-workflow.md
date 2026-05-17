# GitHub And Notion Workflow

Date: 2026-05-17

## Rule

GitHub is the canonical home for polished Baseplate artifacts.

Notion is the private operating dashboard.

## GitHub Owns

Use GitHub for:

- decision pages
- Architecture Diff posts
- evidence files
- evidence schema
- playbook drafts
- paid review templates
- validation scripts/templates
- changelog-worthy changes
- future automation code

Why:

- version history
- readable diffs
- reviewable changes
- easier public release
- better fit for technical builders
- natural fit for Codex work

## Notion Owns

Use Notion for:

- private dashboard
- builder conversations
- validation status
- quick notes
- messy source inbox
- weekly operating view
- links back to GitHub files

Why:

- fast visual scanning
- database views
- better for CRM-style tracking
- easier tired-brain review

## Avoid

Do not maintain two separate canonical versions of the same polished decision.

If a decision changes, update GitHub first, then update Notion links/status.

If a builder conversation creates a new insight, record it in Notion first. Promote it to GitHub only when it changes a decision, offer, or artifact.

## Current Source Of Truth

Repo:

https://github.com/cyalcala/baseplate-ai

Current first decision:

`docs/decisions/RAG-001-default-retrieval-architecture.md`

Current first diff:

`docs/diffs/architecture-diff-001.md`

Current validation tracker:

Notion Builder Validation Tracker plus `docs/validation/validation-tracker.csv` as a lightweight local fallback.

