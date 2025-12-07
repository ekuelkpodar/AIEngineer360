# ModelPrep Hub

A production-minded Next.js 14 (App Router) app for ML/DS/Python interview prep with topic browsing, search, practice modes, admin tooling, and seeded content.

## Features
- Landing page with topic highlights and practice teasers
- Topic directory + topic detail filters (difficulty, type)
- Question detail with reveal, notes, progress, and related items
- Practice modes: Random Drill and Timed Session (UI) with topic filters
- Global search API endpoint with typo-friendly client-side usage
- Admin dashboard stubs for creating topics/questions
- Prisma schema with Postgres + seed generating 100+ original Q&As
- Basic API routes for search, bookmarks, and progress
- Tests: Vitest unit coverage and a Playwright smoke test

## Stack
- Next.js 14 App Router, TypeScript
- Tailwind CSS, Headless UI patterns, lucide icons
- Prisma ORM with PostgreSQL
- (Optional) Redis/Meilisearch can be wired later for caching/search

## Getting Started
1. Install deps
```bash
npm install
```

2. Environment
Create `.env` with a Postgres connection:
```
DATABASE_URL="postgresql://user:password@localhost:5432/modelprep"
```

3. Database + seed
```bash
npx prisma db push
npx prisma db seed
```

4. Develop
```bash
npm run dev
```

5. Build
```bash
npm run build && npm start
```

6. Tests
```bash
npm test           # vitest
npm run test:e2e   # playwright (requires `npm run dev`)
```

## Project Structure
- `app/` – Next.js routes (landing, topics, topic detail, question detail, practice, admin, API endpoints)
- `src/components/` – Layout shell, shared UI primitives, question view
- `src/lib/` – Prisma client, helpers, domain utilities
- `prisma/schema.prisma` – Data model
- `prisma/seed.ts` – Seed script with generated topics/questions/blog/jobs
- `tests/` – Vitest unit tests and Playwright smoke

## Notes
- Admin routes are demo-only (no auth) and use server actions.
- Question prompts/answers are intentionally concise; extend with richer MDX as needed.
- Add analytics (Plausible/PostHog), rate limiting, and CSP headers before production.
