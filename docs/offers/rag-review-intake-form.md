# Baseplate RAG Architecture Review Intake Form

Date: 2026-05-16

Purpose: intake form for the USD 99 Baseplate RAG Architecture Review.

Use this as a Google Form, Tally form, Notion form, or manual questionnaire.

## Intro Copy

Baseplate helps AI builders choose practical RAG architecture defaults without re-researching every trade-off from scratch.

This review gives you a source-backed recommendation for your RAG use case: retrieval strategy, chunking/metadata notes, eval plan, security caveats, and what not to overbuild.

Turnaround for the first manual version: 48 to 72 hours.

## Required Questions

### 1. What are you building?

Short answer.

Example: internal knowledge assistant, support bot, legal document Q&A, product docs assistant, research assistant.

### 2. Who will use it?

Short answer.

Example: internal employees, customers, analysts, students, support agents, developers.

### 3. What documents will it search?

Paragraph.

Ask for file types and examples:

- PDFs
- docs
- markdown
- web pages
- tickets
- emails
- code
- spreadsheets
- structured data

### 4. Rough corpus size?

Multiple choice:

- Under 100 documents
- 100 to 1,000 documents
- 1,000 to 10,000 documents
- 10,000+ documents
- Not sure

### 5. What kind of language does the corpus contain?

Checkboxes:

- technical docs
- legal/policy docs
- product docs
- support articles
- sales/marketing content
- code or API docs
- financial/medical/high-stakes content
- mixed/general docs

### 6. Do exact terms matter?

Multiple choice:

- Yes, IDs/acronyms/version numbers/product names matter a lot.
- Somewhat.
- Not much.
- Not sure.

### 7. Do users need citations/source links?

Multiple choice:

- Yes, every factual answer needs sources.
- Sometimes.
- Not needed for v1.
- Not sure.

### 8. Are there permissions or private documents?

Multiple choice:

- Yes, strict user/role/tenant permissions.
- Some private docs, but simple groups.
- No, all documents are public/shared.
- Not sure.

Follow-up if yes:

Describe roles, tenants, or access rules.

### 9. What failure would be unacceptable?

Paragraph.

Examples:

- cites wrong policy
- leaks private docs
- misses exact SKU/version
- hallucinates legal/financial answer
- gives outdated answer
- slow response

### 10. What response latency feels acceptable?

Multiple choice:

- Under 2 seconds
- 2 to 5 seconds
- 5 to 10 seconds
- Over 10 seconds is okay
- Not sure

### 11. What monthly cost range is acceptable for retrieval + generation?

Multiple choice:

- Under USD 25
- USD 25 to 100
- USD 100 to 500
- USD 500+
- Not sure

### 12. What stack are you already using or considering?

Checkboxes:

- OpenAI File Search
- Pinecone
- Weaviate
- Qdrant
- pgvector/Postgres
- Elasticsearch/OpenSearch
- LlamaIndex
- LangChain/LangGraph
- custom stack
- no stack yet

### 13. What kind of questions will users ask?

Checkboxes:

- simple factual lookup
- exact document lookup
- comparison across documents
- multi-hop reasoning
- global summary across corpus
- workflow/tool-use questions
- not sure yet

### 14. Do you already have example user questions?

Paragraph.

Ask for 5 to 10 examples if available.

### 15. What do you want from the review?

Checkboxes:

- tell me whether vector-only is enough
- choose retrieval architecture
- chunking and metadata defaults
- eval plan
- security/RBAC warnings
- cost/latency trade-offs
- what not to build yet

## Optional Questions

### What is your biggest RAG pain right now?

Paragraph.

### Are you willing to be quoted anonymously?

Yes/no.

### Would you want implementation help later?

Yes/no/maybe.

