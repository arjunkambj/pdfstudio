# Repository Guidelines

## Project Structure & Module Organization
`pdfstudio` is a single Next.js 16 + TypeScript app using the App Router.
- `src/app/`: routes, layouts, and API handlers (`src/app/api/*/route.ts`).
- `src/components/`: UI modules by feature (`create`, `generate`, `projects`, `layout`, etc.).
- `src/hooks/`, `src/lib/`, `src/types/`: shared logic, utilities, and types.
- `src/styles/`: global Tailwind v4 and theme styling.
- `convex/`: backend schema and functions (`cards.ts`, `generations.ts`) plus generated bindings in `convex/_generated/`.
- `public/`: static assets.

Use the `@/*` alias for imports from `src` (configured in `tsconfig.json`).

## Build, Test, and Development Commands
This repo uses Bun (`bun.lock` present).
- `bun dev`: run the Next.js dev server at `http://localhost:3000`.
- `bun run build`: create a production build.
- `bun run start`: serve the production build locally.
- `bun run lint`: run Biome checks (lint + formatting diagnostics).
- `bun run format`: apply Biome formatting.
- `bunx tsc --noEmit`: run strict TypeScript checks.
- `bunx convex dev`: run Convex functions locally while developing backend logic.

## Coding Style & Naming Conventions
- Language: TypeScript (`strict: true`).
- Formatting: Biome, 2-space indentation, organized imports.
- React components: `PascalCase` file names (example: `GenerationCard.tsx`).
- Hooks: `useCamelCase` (example: `useGenerations.ts`).
- Route files follow Next.js conventions: `page.tsx`, `layout.tsx`, `loading.tsx`, `route.ts`.

## Testing Guidelines
There is no committed automated test framework yet.
- Minimum pre-PR quality gate: `bun run lint` and `bunx tsc --noEmit`.
- For behavior changes, also verify key flows manually (auth, generation, projects, settings).
- If adding tests, prefer colocated `*.test.ts(x)` files near the feature they cover.

## Commit & Pull Request Guidelines
Current history favors imperative, change-focused subjects (for example: `Refactor ...`, `Update ...`).
- Keep commit messages concise and scoped to one logical change.
- PRs should include: summary, affected paths, env/config changes, and screenshots for UI updates.
- Link related issues/tasks and list verification steps you ran locally.

## Security & Configuration Notes
Store secrets in `.env.local` only. Required variables include:
`NEXT_PUBLIC_CONVEX_URL`, `OPENROUTER_API_KEY`, and `FAL_KEY`.
Do not commit credentials or generated local artifacts.
