# Portfolio — Agent Notes

## Commands

- **Runtime:** `bun` (not npm/yarn/pnpm). Use `bun install`, `bun dev`, `bun run build`.
- **Dev server:** `bun dev` runs on **port 4011** (not default 3000). `next.config.ts` has `reactCompiler: true`.
- **Lint:** `bun run lint` (ESLint v9, config at `eslint.config.mjs`). No separate typecheck script; use `tsc --noEmit` if needed.
- **No test framework configured.** Do not invent one without asking.
- **No formatter configured** (no Prettier/biome). Follow existing file style.

## Architecture

- **Next.js 16** (App Router), **React 19**, **TypeScript strict**, **Tailwind CSS v4** (via `@tailwindcss/postcss`, no `tailwind.config`).
- **Path alias:** `@/*` → `./src/*`. All source lives in `src/`.
- **Key entry:** `src/app/page.tsx`. Routes: `/contact`, `/dashboard`, `/journey`, `/lab`, `/api/`.
- **shadcn/ui** (new-york style): components in `src/components/ui/`. Add new ones via `bunx shadcn@latest add <component>`.
- **Three.js scene:** `src/components/canvas/DataScene.tsx` — import via `next/dynamic` with `{ ssr: false }` to avoid hydration errors.
- **shadcn cmdk:** `src/components/ui/command.tsx` — command palette (Cmd+K).
- **Metrics/constants:** `src/lib/constants.ts` — single source for copy and metrics.
- **PocketBase client:** `src/lib/pocketbase.ts` — CMS integration.
- **Analytics:** `src/components/analytics/` — Umami tracking (see cSpell words).

## Visual & Content Rules

- **Theme:** Dark mode (deep charcoal/black), emerald green / electric blue accents.
- **Style:** Glassmorphism cards, thinner borders, sharper corners (shadcn "new-york" style).
- **Hero copy:** "I build and scale the engines of modern startups." — do not replace with generic "Hi, I'm X".
- **Sections:** Hero → Live Status Dashboard → Timeline (Acquisition Journey) → Lab (Projects) → Hiring Mindset.
- **Custom cursor:** ring cursor in `src/components/interaction/`.
- **Loading screen:** terminal-style "System Initializing" sequence at `src/app/loading.tsx`.

## Gotchas

- Tailwind v4 uses CSS-first config (`src/app/globals.css`), not `tailwind.config.ts`.
- `babel-plugin-react-compiler` is a dev dependency — React Compiler is enabled via `next.config.ts`.
- `ignoreScripts` and `trustedDependencies` in package.json for `sharp` and `unrs-resolver` — do not remove without reason.
- Deployment target: **Vercel**. `src/app/robots.ts` and `src/app/sitemap.ts` handle SEO.

