# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on **port 5180** (not the Vite default 5173); `host: true` so it's reachable on the LAN.
- `npm run build` — runs `tsc -b` first, then `vite build`. Type errors block the build.
- `npm run preview` — serves the `dist/` build.
- `npm run typecheck` — `tsc -b --pretty`. This is the de facto code-quality gate.
- **`npm run lint` is currently broken.** The script calls `eslint . --max-warnings 0` but no ESLint config exists in the repo and `eslint` is not in `devDependencies`. Don't run it expecting a clean pass; if linting needs to work, ESLint must be installed and configured first.
- **No test framework is set up.** No Vitest/Jest, no `*.test.*` files, no test script. Don't suggest running tests as a verification step.

Node engine: `>=20.11`. ESM project (`"type": "module"`).

## Architecture

**Stack.** React 18 + TypeScript SPA, Vite 5, Tailwind 3, Zustand 5 (with `persist`), React Router 6, Zod for validation, Sonner for toasts, lucide-react for icons.

**Routing entry chain.** `index.html` → `src/main.tsx` → `src/router.tsx` (defines `createBrowserRouter` with `App` as layout). `/` redirects to `/courses/learning-how-to-learn/lessons` — the seed course is hardcoded as the landing target. Other routes: `/courses/new`, `/courses/:id/outline`, `/courses/:id`, `/courses/:id/lessons`, `/lessons/:id`, and `*` → `/`.

**Path alias.** `@/*` → `src/*` (configured in both `tsconfig.json` and `vite.config.ts`). All imports use `@/...` — never relative deep paths.

**The "v2" design system (critical).** Every page wraps content in `<div className="theme-v2 inter-font min-h-screen bg-surface">`. The design tokens live in `src/index.css` as HSL CSS custom properties (e.g., `--surface`, `--brand`, `--streak-bg`), and `tailwind.config.ts` consumes them via `hsl(var(--…) / <alpha-value>)`. **Use semantic Tailwind classes** (`bg-surface`, `text-text-secondary`, `bg-brand`, `border-border`) — do not introduce raw hex colors. Custom font utility classes (`.young-serif-font`, `.share-tech-mono-font`, etc.) and iOS safe-area utilities (`.safe-area-top`, `.pb-nav-safe`) are also defined in `src/index.css`.

**ChunkyButton is the primary CTA primitive.** `src/components/primitives/ChunkyButton.tsx` — variants `brand`/`secondary`/`tertiary`, three sizes, default `uppercase` (Share Tech Mono). The signature stacked drop-shadow lifts on hover and collapses to zero shadow with `translate-y-1` on `:active`. Supports `asChild` via Radix Slot for wrapping links.

**State (`src/stores/`).** Three Zustand stores. Persisted ones use the `evolearn:<feature>` localStorage key namespace.
- `course-store.ts` — `useCourseStore`, persisted (`evolearn:courses`), seeded from `src/data/seed-course.ts`.
- `progress-store.ts` — `useProgressStore`, persisted (`evolearn:progress`), maps `lessonId → page`.
- `ui-store.ts` — `useUIStore`, ephemeral (`scrollY` only).

**Important integration gap.** The store layer exists but isn't fully wired in. Pages like `CourseOutline` and `LessonDetail` import `seedCourse` directly from `src/data/seed-course.ts` rather than reading from `useCourseStore`. When editing pages, check whether the data should come from the store or the seed before assuming.

**AI provider layer (`src/lib/ai/`).** Pluggable via the `VITE_AI_PROVIDER` env var (`.env.local` ships with `VITE_AI_PROVIDER=mock`).
- `generate-course.ts` is the dispatch entry; it routes to `providers/mock.ts` | `providers/anthropic.ts` | `providers/openai.ts`.
- **Only `mock` works.** It sleeps 800 ms and returns a draft built from `seedCourse`. The `anthropic` and `openai` provider files intentionally throw `'… provider not configured in v1. Set VITE_AI_PROVIDER=mock or wire a server route.'`
- `prompt.ts` has system/user prompt builders for when a real provider is wired up. Note: the prompt copy says ≤24-char title / 8–10 lessons total, but the Zod schema in `src/types/ai.ts` (`AICourseDraftSchema`) enforces title ≤40 / exactly 4 sections / 4 achievements — **the schema is the authoritative contract**, not the prompt text.

**Component organization (`src/components/`).** Grouped by feature surface: `primitives/` (cross-cutting building blocks), `chrome/` (app shell — top/bottom nav, sidebar, streak pill), `lessons-map/` (the snake-path lesson map screen), `outline/` (course outline / accordion), `cover/` (course cover hero), `lesson-detail/` (paginated lesson reader). `src/illustrations/` exports SVG-as-component illustrations plus a `renderIllustration(key)` helper keyed by `IllustrationKey` from `src/types/course.ts`.

**Toast feedback.** Use `import { toast } from 'sonner'`. The single `<Toaster>` host lives in `src/App.tsx` (top-center, light theme, themed via the v2 CSS vars). Don't mount additional `<Toaster>` instances.

**Mobile-first.** Layouts assume a mobile viewport first. iOS safe-area `env()` utilities are already in the CSS (`.safe-area-top`, `.pb-nav-safe`) — use them on full-bleed surfaces rather than reinventing.

**Locale.** Seed content is zh-CN; `index.html` sets `lang="zh-CN"`. Don't auto-translate Chinese strings to English when refactoring.

## Repo quirks

- The root contains design references — `course_cover.png/.txt`, `course_lessons.html/.png`, `create_course.html/.png`, `lesson_detail.png/.txt`. These are mockups / extracted text used as the design source-of-truth, not part of the build. Don't move, rename, or delete them when tidying.
- A stale `vite.config.js` and `vite.config.d.ts` sit alongside the canonical `vite.config.ts`. Edit the `.ts` only.
- `.env.example` and `.env.local` both contain just `VITE_AI_PROVIDER=mock`. Adding a new env var means updating both.
- TypeScript strict mode is on, plus `noUnusedLocals` and `noUnusedParameters` — unused imports/variables fail `npm run typecheck` and therefore the build.
