# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PDFStudio is a Gamma AI clone — an AI-powered presentation/document builder. The stack is Next.js 16 (App Router) with Convex as the serverless backend, Stack Auth for authentication, and AI ADK for AI capabilities.

## Commands

```bash
bun run dev        # Start Next.js dev server
bun run build      # Production build
bun run start      # Run production server
bun run lint       # Lint with Biome
bun run format     # Format with Biome
npx convex dev     # Start Convex dev server (run alongside Next.js dev)
```

Package manager is **Bun** — use `bun add` / `bun install`, not npm or yarn.

## Architecture

### Provider Hierarchy (src/app/layout.tsx)

```
StackProvider (auth, server-side)
  └── HeroUIProvider (UI components, client-side)
      └── StackTheme (theming)
          └── ConvexClientProvider (backend, client-side)
              └── {children}
```

### Key Directories

- `src/app/` — Next.js App Router pages and layouts
- `src/app/(auth)/handler/[...stack]/` — Stack Auth route handler
- `src/components/` — React components (providers, UI)
- `src/stack/` — Stack Auth config (`client.ts` for client, `server.ts` for server)
- `src/styles/` — Global CSS (Tailwind v4) and HeroUI theme config (`hero.ts`)
- `convex/` — Convex backend functions (queries, mutations, actions)
- `convex/_generated/` — Auto-generated Convex types (do not edit)

### Path Alias

`@/*` maps to `./src/*` in imports.

### Styling

- **Tailwind CSS v4** — uses `@import "tailwindcss"` syntax in `globals.css`
- **HeroUI** — component library with custom theme in `src/styles/hero.ts`
- Color palette: Zinc (default), Indigo (primary), Purple (secondary), Green (success), Orange (warning), Pink (danger)
- Fonts: Geist Sans (`--font-geist-sans`) and Geist Mono (`--font-geist-mono`)

### Linting & Formatting

Biome 2.2 handles both linting and formatting. Config in `biome.json`:
- 2-space indentation
- React and Next.js domain rules enabled
- Import organization enabled

### React Compiler

Babel React Compiler is enabled in `next.config.ts` for automatic memoization.

## Environment Variables

Required in `.env.local`:
- `CONVEX_DEPLOYMENT` / `NEXT_PUBLIC_CONVEX_URL` / `NEXT_PUBLIC_CONVEX_SITE_URL` — Convex
- `NEXT_PUBLIC_STACK_PROJECT_ID` / `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` / `STACK_SECRET_SERVER_KEY` — Stack Auth
- `OPENROUTER_API_KEY` — AI integration
