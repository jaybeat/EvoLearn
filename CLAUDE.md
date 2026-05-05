# EvoLearn — Project Context for Claude Code

## What This Project Is

EvoLearn 是一个对抗"知识点列表式学习"的进化式课程产品。

学习者——无论是学生还是工作中的人——在学一个新领域时，最常见的困境是：知识点像海洋，不知道从哪学起，也容易陷在细节里看不到全貌。EvoLearn 的回答是：每个主题都有一个**核心机制**，所有看似复杂的知识点都是这个核心机制为了解决新问题而**演化**出来的变体。把这条演化路径还原出来，学习者就能形成对核心概念的直观理解，而不是背一堆并列的事实。

每门课的内容形态是：**沿"核心机制 → 进化分支"组织的学习地图**，每节课是分页的短课，混合图文、展示型交互、游戏型交互、多种类型的题目。教学方式以**归纳**为主——让用户先感受具体问题，再在解决问题的过程中归纳出概念。

## Core Value Proposition

**让学习者沿知识的演化路径走一遍——先感受问题，再归纳概念，再看它如何进化出变体——而不是面对一份扁平的知识点清单。**

## Where This Project Is Going

当前阶段：**MVP**。MVP 的唯一目标是端到端跑通一条路径——

1. **把 AI pipeline 从代码外搬进代码内**：让 `src/lib/ai/providers/anthropic.ts` 真的能用，把"原始材料 → Course/Lesson/Page/Block 结构化数据"这条流水线在产品里跑通。
2. **用这条 pipeline 把已有蓝本课程灌进产品**：5–6 节已经写好文字稿、但还没结构化进 `src/data/` 的蓝本课程，全部走 pipeline 转成代码里的课程数据。
3. **课程地图能让用户从头学到尾**：前端足以支撑一个真实学习者把这些课从头学到尾，进度、互动、成就这些核心反馈循环跑通。

**MVP 之外的所有事都暂不规划**。MVP 跑通后再回头讨论下一阶段方向。

## Key Decisions (Settled)

这些是已经定下来、不要反复挑战的决策：

- **AI pipeline 是产品的核心基础设施，不是可选功能**。即使产品永远不开放给终端用户上传材料生成课程，AI pipeline 也必须存在——因为人工把文字稿切成 lesson/page/block、配可视化 spec 是不现实的。AI 首先是创作者（目前是项目作者本人）的内容生产流水线，开放给终端用户是后期的事。
- **进化式课程形态已经验证过，不要再质疑这个产品形态**。已有 5–6 节手写蓝本课程作为蓝本，AI pipeline 也在代码外跑通过。当前不确定性在"集成"和"规模化"，不在"形态对不对"。
- **教学方式以归纳为主**。先给具体问题/场景，再让用户归纳出概念——不要在 lesson 设计上反过来（先抛定义再举例）。这是产品的核心教学法，不是可调风格。
- **`AICourseDraftSchema`（`src/types/ai.ts`）是 AI 生成的权威契约，prompt 文案不是**。当 prompt 文案和 Schema 冲突时，以 Schema 为准。
- **页面通过 `src/lib/courses.ts` 读课程数据，不通过 Zustand store**。`useCourseStore` 存在但不是运行时数据源。新增课程时改 `allCourses` 数组，不改 pages。
- **v2 设计系统是唯一的设计系统**。语义化 Tailwind 类（`bg-surface`、`text-text-secondary` 等）是默认选择，CSS 变量在 `src/index.css`。不要引入 hex 颜色，不要绕过设计 token。
- **ChunkyButton 是主要 CTA primitive**，不要为了"更现代"或"更简洁"就替换它。它的视觉签名（堆叠 drop-shadow、hover 抬升、active 折叠）是设计语言的一部分。
- **Mobile-first**。所有布局先按移动端视口设计，iOS safe-area 用已有的 `.safe-area-top` / `.pb-nav-safe` 工具类。
- **种子内容是 zh-CN，不要在重构时把中文字符串"自动翻译"成英文**。

## Known Tech Debt

已知的债，写出来是为了让 Claude Code 知道这是"已知现状"，不要误以为是"有意设计"，也不要在不相关的工作里顺手"修"它：

- **`src/lib/ai/providers/anthropic.ts` 和 `openai.ts` 当前抛错**。生成 pipeline 的真实实现已经在代码外（外部脚本/notebook）跑通了，但还没搬进仓库。`VITE_AI_PROVIDER=mock` 是当前唯一能用的 provider。把外部 pipeline 集成进 `anthropic.ts` 是 MVP 的关键路径。
- **5–6 节蓝本课程的文字稿已写好，但还没结构化进 `src/data/`**。仓库里只有 `seedCourse`（Learning How to Learn）和 `binaryTreeCourse`。其他课程要等 AI pipeline 集成后批量灌入。
- **Zustand store 层（`src/stores/`）存在但 pages 不通过 store 读课程数据**，运行时 source of truth 是 `src/lib/courses.ts` 的 `allCourses` 数组。`useCourseStore` 目前是空架子。这个分裂状态短期不修——MVP 阶段课程数据是只读的，不需要 store 的能力。
- **`prompt.ts` 的提示词文案和 `AICourseDraftSchema` 不一致**（提示词说 ≤24-char title / 8–10 lessons，Schema 说 ≤40 / 4 sections / 4 achievements）。Schema 是权威契约，prompt 文案需要在 AI pipeline 真正接通时同步修正。
- **`npm run lint` 当前是坏的**——脚本调 `eslint . --max-warnings 0`，但仓库里没有 ESLint config，`eslint` 也不在 devDependencies。`npm run typecheck` 是当前真正的代码质量门槛。
- **根目录有 stale 的 `vite.config.js` 和 `vite.config.d.ts`**，权威是 `vite.config.ts`。

## Out of Scope (Don't Build)

MVP 阶段**明确不做**以下方向。即使看起来"做了不亏"或"用户可能想要"，都不要主动建议或顺手实现：

- **社交/社区功能**：评论、讨论区、学习伙伴、排行榜、分享——全部不做。
- **账号系统 / 云同步 / 后端服务**：当前所有数据走 localStorage，不要建议加用户系统、不要建议引入后端。
- **付费/订阅**。
- **SRS / 间隔重复 / Anki 式复习系统**。
- **学习数据分析 dashboard**：学习时长统计、掌握度热力图、进度报表等，全部不做。
- **多端**：桌面端布局、平板端适配、原生 App、PWA 安装——MVP 只做 mobile-first web。
- **多语言 / i18n 框架**：当前内容是 zh-CN，不要引入 i18n 库或抽象。
- **直接开放给终端用户上传材料生成课程**：这是 post-MVP 方向，MVP 阶段 AI pipeline 只服务于创作者（项目作者本人）的内容生产，不暴露给终端用户。
- **测试框架**：没有 Vitest/Jest，没有 `*.test.*` 文件，没有 test script。不要建议"加个测试验证一下"作为工作流的一部分。如果某段逻辑确实需要测试覆盖，先和我讨论是否要引入测试基础设施。

## Working Style with Claude Code

- **修改前先看 `Key Decisions` 和 `Out of Scope`**。如果建议会撞上其中一条，先指出来再讨论，不要默默绕过去。
- **不要建议引入新依赖来解决可以用现有栈解决的问题**。当前栈（React 18 + Zustand + Zod + Sonner + Tailwind + lucide-react）已经覆盖绝大多数需求，新增依赖前先确认现有工具不够用。
- **不要建议加测试作为验证手段**。验证手段是 `npm run typecheck` 和手动跑 `npm run dev`。
- **不要建议跑 `npm run lint`**——它是坏的，跑了徒增噪声。
- **遇到中文内容/注释/UI 文案不要自动翻译成英文**。
- **新增课程时改 `src/lib/courses.ts` 的 `allCourses` 数组**，不要改 pages、不要改 store。

---

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

**Course registry (`src/lib/courses.ts`).** The single source of truth for runtime course/lesson lookup. `allCourses` is a hardcoded array (`[seedCourse, binaryTreeCourse]`). If a new course file is added under `src/data/`, it must be imported and added to this array. Pages never import seed data directly.

**Important integration gap.** The store layer exists but isn't fully wired in. Pages read courses and lessons through `src/lib/courses.ts` (`findCourse`, `findLesson`, `findCourseByLessonId`), which exports a hardcoded `allCourses` array (`[seedCourse, binaryTreeCourse]`). The Zustand `useCourseStore` exists but is **not** the runtime data source for pages. When adding a new course or changing lesson lookup, update `src/lib/courses.ts` — not the pages.

**AI provider layer (`src/lib/ai/`).** Pluggable via the `VITE_AI_PROVIDER` env var (`.env.local` ships with `VITE_AI_PROVIDER=mock`).
- `generate-course.ts` is the dispatch entry; it routes to `providers/mock.ts` | `providers/anthropic.ts` | `providers/openai.ts` | `providers/gemini-course.ts`.
- **`mock` works offline.** It sleeps 800 ms and returns a draft built from `seedCourse`.
- **`gemini` works when `VITE_GEMINI_API_KEY` is set.** It calls `gemini-2.0-flash` with JSON response mode and validates output against `AICourseDraftSchema`. The `anthropic` and `openai` provider files still intentionally throw `'… provider not configured in v1. Set VITE_AI_PROVIDER=mock or wire a server route.'`
- `prompt.ts` has system/user prompt builders for course-outline generation. Note: the prompt copy says ≤24-char title / 8–10 lessons total, but the Zod schema in `src/types/ai.ts` (`AICourseDraftSchema`) enforces title ≤40 / exactly 4 sections / 4 achievements — **the schema is the authoritative contract**, not the prompt text.

**Component organization (`src/components/`).** Grouped by feature surface: `primitives/` (cross-cutting building blocks), `chrome/` (app shell — top/bottom nav, sidebar, streak pill), `lessons-map/` (the snake-path lesson map screen), `outline/` (course outline / accordion), `cover/` (course cover hero), `lesson-detail/` (paginated lesson reader + block renderers), `interactions/` (step controllers), `visualizers/` (array/tree canvases). `src/illustrations/` exports SVG-as-component illustrations plus a `renderIllustration(key)` helper keyed by `IllustrationKey` from `src/types/course.ts`.

**Lesson content blocks.** A `Lesson` stores its content as `content: LessonPage[]` (`src/types/course.ts`). Each `LessonPage` has `blocks: LessonBlock[]`. The block type system lives in `src/types/lesson-blocks.ts` and includes `hero`, `text`, `multipleChoice`, `reflection`, `knowledgeCard`, `illustration`, and `steppedDemo`.

Rendering is dispatched by a plain `switch` in `src/components/lesson-detail/LessonBlockRenderer.tsx`. Individual renderers live in `src/components/lesson-detail/blocks/`. Interactive blocks (`multipleChoice`, `reflection`) receive `interactionState` and `onInteract` callbacks from the page-level state hook.

**Gating logic.** If a page contains interactive blocks, the user must submit answers before advancing. Correctness and completion are computed by `src/lib/lesson/blocks.ts` (`isPageComplete`, `hasInteractiveBlocks`, `canAdvance`). The footer action mode cycles `submit → continue → next → finish` based on these checks.

**Quiz state is ephemeral.** Page-level interaction state is held in `useLessonPageState` (`src/hooks/useLessonPageState.ts`), a simple `useState` keyed by block ID. It resets on every page change; persistence is limited to `progress-store.ts` (tracks `completedPages` per lesson).

**Stepped demos & visualizers.** The `steppedDemo` block embeds a full step sequence inline (no ID lookup). `src/components/interactions/StepPlayer.tsx` is the generic step controller: prev/next/play-pause/reset with a 1400 ms auto-advance interval. It accepts a `visualizer` component prop.

Visualizers are purely presentational:
- `src/components/visualizers/NumberArray.tsx` — array items with status-driven styling (`normal | highlighted | excluded | inserting | removing`).
- `src/components/visualizers/TreeCanvas.tsx` — SVG tree with animated nodes/edges.

Step state shapes (`ArrayVisualizerState`, `TreeVisualizerState`) are defined in `src/types/lesson-blocks.ts`. The `binaryTreeCourse` in `src/data/binary-tree-course.ts` is the primary consumer. It has been restructured into **3 lessons** (1.1 二叉搜索树的诞生 — completed, 1.2 删除的艺术 — placeholder, 1.3 当树失去平衡 — placeholder) as a case study for the lesson-split criteria documented in `COURSE_DESIGN.md`.

**Lesson Designer Pipeline (`src/lib/lesson-designer/`).** A Gemini-powered pipeline that turns a raw article into fully designed `LessonPage[]` content. This is the **production** side of the content block system (as opposed to the **consumption** side in `lesson-detail/`).

- **`generateLessonPages(input)`** — runs the pipeline end-to-end and returns `LessonPage[]` ready for storage.
- **Step 1** (`step1-paginate.ts`) — Narrative analysis & pagination. Splits the article into `PageOutline[]` by cognitive leap points, ensuring one `keyInsight` per page and 30–90s reading time.
- **Step 1.5** (`step1b-lesson-split.ts`) — **Lesson split analysis**. Analyzes the paginated result to determine whether the content should form 1 lesson or multiple lessons, based on 5 criteria: cognitive arc completeness, mental model shift, achievement mapping, hookingQuestion independence, and attention window. Outputs `LessonGroup[]`.
- **Step 2** (`step2-components.ts`) — Cognitive step & component design. Maps each page into 3–5 `CognitiveStep`s, selecting components (`hero`/`text`/`knowledgeCard`/`illustration`/`interaction_placeholder`) based on user mental state.
- **Step 3** (`step3-interactions.ts`) — Interaction & assessment design. Converts steps into concrete `LessonBlock`s, including `multipleChoice`, `reflection`, and `steppedDemo` blocks with full `narration` + `state` arrays.
- **`formatter.ts`** — Post-processor that assigns deterministic `id`s, fills `totalPages`, and casts AI-generated blocks into the strict `LessonBlock` union.
- **Prompts** live in `prompts.ts`; Zod schemas for validation live in `types.ts`. Each step calls `callGemini()` (`src/lib/ai/providers/gemini.ts`) with `gemini-2.0-flash` and `responseMimeType: 'application/json'`.
- **Individual step functions** (`runStep1`, `runStep1b`, `runStep2`, `runStep3`) are also exported for manual review workflows.

**Course design principles** are documented in `COURSE_DESIGN.md` at repo root, including the lesson split criteria and the binary tree course case study.

**Toast feedback.** Use `import { toast } from 'sonner'`. The single `<Toaster>` host lives in `src/App.tsx` (top-center, light theme, themed via the v2 CSS vars). Don't mount additional `<Toaster>` instances.

**Mobile-first.** Layouts assume a mobile viewport first. iOS safe-area `env()` utilities are already in the CSS (`.safe-area-top`, `.pb-nav-safe`) — use them on full-bleed surfaces rather than reinventing.

**Locale.** Seed content is zh-CN; `index.html` sets `lang="zh-CN"`. Don't auto-translate Chinese strings to English when refactoring.

## Repo quirks

- The root contains design references — `course_cover.png/.txt`, `course_lessons.html/.png`, `create_course.html/.png`, `lesson_detail.png/.txt`. These are mockups / extracted text used as the design source-of-truth, not part of the build. Don't move, rename, or delete them when tidying.
- A stale `vite.config.js` and `vite.config.d.ts` sit alongside the canonical `vite.config.ts`. Edit the `.ts` only.
- `.env.example` and `.env.local` both contain just `VITE_AI_PROVIDER=mock`. Adding a new env var means updating both.
- TypeScript strict mode is on, plus `noUnusedLocals` and `noUnusedParameters` — unused imports/variables fail `npm run typecheck` and therefore the build.
