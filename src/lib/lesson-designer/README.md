# Lesson Designer Pipeline

A 3-step methodology for converting long-form educational articles into EvoLearn Lessons.

## Why Multi-Step?

A single prompt tries to do "understand → paginate → design components → design interactions" all at once. This causes attention dilution, cascading errors, and no human review points. The pipeline splits these into discrete steps with stable intermediate formats.

## The 3 Steps

### Step 1: Narrative Analysis & Pagination

**Goal:** Split the article into LessonPages, each with a single cognitive goal.

**Output:** `PageOutline[]`

**Rules:**
1. **Single Insight Rule** — Each page must have exactly one `keyInsight`. If you find two, split the page.
2. **Time Box Rule** — `estimatedReadSeconds` must be 30–90. Exceeding 90 means the page is too dense.
3. **Emotion Turn Rule** — When `emotionalArc` changes quality (e.g. hope → despair), a new page must start.
4. **Bloom Purity Rule** — One page should target one Bloom level. Don't mix "understand" and "apply" on the same page.
5. **Exit-Friendly Rule** — Each page must end at a natural pause (a conclusion, a question, or an interaction result).

### Step 2: Cognitive Step Decomposition

**Goal:** Break each page's cognitive goal into 3–5 steps and match each step to a content component.

**Output:** `PageSteps[]`

**Component Selection Heuristics:**

| `userMentalState` | Recommended Component |
|---|---|
| Just entered / needs context | `hero` |
| Receiving information | `text` (default) |
| Hitting a conflict / twist | `text` (callout) |
| Needs to memorize a core concept | `knowledgeCard` |
| Needs spatial understanding | `illustration` |
| Needs to see a dynamic process | `interaction_placeholder` (demo) |
| Ready to try it themselves | `interaction_placeholder` (game) |

### Step 3: Interaction & Assessment Design

**Goal:** Turn `interaction_placeholder` steps into concrete designs, and add `multipleChoice` or `reflection` where needed.

**Interaction Type Decision Tree:**

```
Does the user already have a correct mental model?
  ├─ No  → Demo interaction (I show, you watch)
  └─ Yes → Game interaction (you do, I validate)
```

**Assessment Selection:**

| Type | Cognitive Mechanism | Use When |
|---|---|---|
| `multipleChoice` | Recognition (low load) | End of a page; quick comprehension check |
| `reflection` | Generation / Self-explanation | Emotional turning point; far transfer; abstract synthesis |

**MultipleChoice Distractor Design:**
- Distractor 1: Prior page's "old思维锚定" (old mental model)
- Distractor 2: Misconception about magnitude/scale
- Distractor 3: Close to correct but imprecise

## Intermediate Data Flow

```
Article
   │
   ▼
Step 1 ──▶ PageOutline[] ──┐
                           ├──▶ Step 2 ──▶ PageSteps[] ──▶ Step 3 ──▶ LessonPageDesign[]
Article (full text) ───────┘                           Article (full text)
```

Each step can be run independently as long as the previous step's JSON is provided.

## Human Review Points

1. **After Step 1** — Review `keyInsight` for each page. If any page has two insights, adjust before Step 2.
2. **After Step 2** — Review `userMentalState` and `component` pairing. Ensure no page is all text.
3. **After Step 3** — Review `multipleChoice` distractors. They must reflect real misconceptions, not random noise.

## Current Limitations

- This pipeline is documented as types + heuristics. It is not yet wired to an AI agent.
- `interaction_placeholder` blocks cannot be rendered by the current LessonBlockRenderer. They must be implemented as new block types or embedded experiences.
