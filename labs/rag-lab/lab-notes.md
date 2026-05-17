# Baseplate RAG Lab Notes

Date created: 2026-05-17

## Purpose

Build direct RAG experience before selling or publishing too much RAG judgment.

This lab uses OpenAI File Search over public-safe Baseplate docs. The goal is to learn what works, what fails, and what needs to change in `RAG-001`.

## Current Hypotheses

- Managed File Search should answer simple Baseplate questions with less setup than an owned retrieval pipeline.
- The lab will expose whether Baseplate docs are structured clearly enough to be retrieved.
- Failure cases will be more useful than successful answers.
- This lab will not fully test hybrid retrieval tuning, reranking control, RBAC, or multi-tenant production behavior.

## Initial Failure Cases To Look For

- Answers without citations.
- Correct answer but weak source retrieval.
- Vague answers for exact project terms like `RAG-001`.
- Confusion between public GitHub docs and private Notion/local memory.
- Missing answer for "no-recommendation rule" because this concept is still underdocumented.
- Over-answering from model knowledge instead of indexed files.

## Manual Observations

- [ ] Run `npm run rag:index`.
- [ ] Run `npm run rag:ask -- "What is Baseplate's current RAG-001 default recommendation?"`.
- [ ] Run `npm run rag:eval -- --limit 5`.
- [ ] Record the first five surprises here.
