# Baseplate RAG Lab

This is the first grounding build for Baseplate.

It is not the Baseplate product. It is a small managed RAG lab that indexes public-safe Baseplate docs with OpenAI File Search, asks cited questions over them, and records what works or fails.

## Why This Exists

Baseplate should not stay as commentary about RAG from the outside.

This lab gives us direct experience with:

- document ingestion
- managed chunking, embedding, and indexing
- file citations
- weak or missing retrieval
- exact-term questions
- eval questions
- latency and cost tradeoffs
- how much managed RAG hides from the builder

## What It Indexes

The indexer includes public-safe project artifacts only:

- `README.md`
- `AGENTS.md`
- `NEXT_SESSION_BRIDGE.md`
- `docs/**/*.md`
- `docs/**/*.csv`

It does not index private folders such as raw chat backups, Notion exports, personal notes, or generated memory folders.

## Setup

Set an OpenAI API key in your shell:

```powershell
$env:OPENAI_API_KEY="sk-..."
```

Optional settings:

```powershell
$env:OPENAI_RAG_MODEL="gpt-4.1"
$env:OPENAI_RAG_MAX_RESULTS="8"
```

The default model is `gpt-4.1`, matching the OpenAI File Search example docs. Override it if your account uses a different model.

## Commands

Index the docs:

```powershell
npm run rag:index
```

Preview which docs will be indexed:

```powershell
npm run rag:index:dry
```

Ask one question:

```powershell
npm run rag:ask -- "What is the current RAG-001 default?"
```

Run the eval set:

```powershell
npm run rag:eval
```

Limit eval questions during testing:

```powershell
npm run rag:eval -- --limit 5
```

## Generated Local Files

The lab writes local runtime state and eval results:

- `labs/rag-lab/.rag-state.json`
- `labs/rag-lab/eval-results-*.json`

These are ignored by Git because they can contain account-specific IDs and raw model outputs.

## Success Criteria

This lab is successful when it produces:

- one OpenAI vector store containing Baseplate docs
- cited answers for simple Baseplate questions
- visible failure cases for vague, exact-term, or cross-document questions
- notes that improve `RAG-001`

The failures are not embarrassing. They are the point.
