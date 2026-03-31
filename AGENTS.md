# AGENTS.md

## Setup

```bash
bun install
bun run dev
bun run build-ci  # REQUIRED before commit
```

## Structure

- `convex/` — Backend (Convex functions + schema)
- `src/` — Frontend (React components + routes)
- `common/` — Shared code (Types, utils, etc.)

## Rules

1. Never edit: `src/routeTree.gen.ts`, `convex/_generated/`, or `*.generated.*` files
2. Use Bun only (not npm/yarn)
3. Use `#src/*` for `src/`, `#convex/*` for `convex/`, `#common/*` for `common/`
4. Run `bun run build-ci` before every commit

## Tech

- **Runtime**: Bun
- **Frontend**: TanStack Start + Router
- **Backend**: Convex
- **Auth**: `@convex-dev/auth`
- **Styling**: Tailwind CSS v4
- **Format**: Oxfmt (`.oxfmtrc.json`)
- **Lint**: Oxlint (`.oxlintrc.json`) + ESLint (`eslint.config.ts`) for specialty plugins

## Key Commands

```bash
bun run dev      # frontend + backend
bun run fix      # format + lint/fix
bun test         # run tests
```

## Docs

- [Convex](https://docs.convex.dev/)
- [TanStack Router](https://tanstack.com/router/latest)
- [TanStack Start](https://tanstack.com/start/latest)
- [Oxfmt](https://oxc.rs/docs/guide/usage/formatter)
- [Oxlint](https://oxc.rs/docs/guide/usage/linter)

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read `convex/_generated/ai/guidelines.md` first** for important guidelines on how to correctly use Convex APIs and patterns. The file contains rules that override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running `npx convex ai-files install`.

<!-- convex-ai-end -->
