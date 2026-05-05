import { z } from 'zod';

// ─────────────────────────────────────────────
// Step 1: 叙事分析与分页
// ─────────────────────────────────────────────

export const CognitiveGoalSchema = z.object({
  level: z.string(),
  description: z.string(),
});

export const PageOutlineSchema = z.object({
  pageNumber: z.number().int().min(1),
  theme: z.string().min(1),
  cognitiveGoal: CognitiveGoalSchema,
  emotionalArc: z.string().min(1),
  keyInsight: z.string().min(1),
  sourceParagraphs: z.array(z.string()),
  estimatedReadSeconds: z.number().int().min(30).max(90),
});

export const Step1OutputSchema = z.array(PageOutlineSchema).min(1).max(12);

export type PageOutline = z.infer<typeof PageOutlineSchema>;

// ─────────────────────────────────────────────
// Step 1.5: 分课分析
// ─────────────────────────────────────────────

export const LessonGroupSchema = z.object({
  lessonIndex: z.number().int().min(1),
  lessonTitle: z.string().min(1),
  hookingQuestion: z.string().min(1),
  estimatedMinutes: z.number().int().min(3).max(10),
  achievementTitle: z.string().min(1),
  achievementBody: z.string().min(1),
  pageNumbers: z.array(z.number().int().min(1)).min(1).max(8),
  narrativeArc: z.string().min(1),
  splitReason: z.string().min(1),
});

export const Step1bOutputSchema = z.object({
  recommendedLessonCount: z.number().int().min(1).max(5),
  overallReasoning: z.string().min(1),
  lessons: z.array(LessonGroupSchema).min(1),
});

export type LessonGroup = z.infer<typeof LessonGroupSchema>;

// ─────────────────────────────────────────────
// Step 2: 认知步骤与组件设计
// ─────────────────────────────────────────────

export const ComponentTypeSchema = z.enum([
  'hero',
  'text',
  'knowledgeCard',
  'illustration',
  'interaction_placeholder',
  'multipleChoice',
  'reflection',
]);

export const CognitiveStepSchema = z.object({
  stepOrder: z.number().int().min(1),
  userMentalState: z.string().min(1),
  contentPurpose: z.string().min(1),
  component: ComponentTypeSchema,
  proposedContent: z.record(z.unknown()),
  interactionType: z.enum(['demo', 'game']).optional(),
});

export const Step2PageSchema = z.object({
  pageNumber: z.number().int().min(1),
  steps: z.array(CognitiveStepSchema).min(1).max(6),
});

export const Step2OutputSchema = z.array(Step2PageSchema).min(1);

export type CognitiveStep = z.infer<typeof CognitiveStepSchema>;

// ─────────────────────────────────────────────
// Step 3: 交互与检测设计（接近最终 LessonBlock 结构）
// ─────────────────────────────────────────────

export const Step3HeroBlockSchema = z.object({
  type: z.literal('hero'),
  title: z.string().min(1),
  subtitle: z.string().min(1),
});

export const Step3TextBlockSchema = z.object({
  type: z.literal('text'),
  body: z.string().min(1),
  variant: z.enum(['default', 'callout', 'tip']).optional(),
});

export const Step3KnowledgeCardBlockSchema = z.object({
  type: z.literal('knowledgeCard'),
  emoji: z.string().min(1).max(4),
  title: z.string().min(1),
  body: z.string().min(1),
});

export const Step3IllustrationBlockSchema = z.object({
  type: z.literal('illustration'),
  key: z.string().min(1),
});

export const Step3MultipleChoiceBlockSchema = z.object({
  type: z.literal('multipleChoice'),
  question: z.string().min(1),
  options: z.array(z.string()).min(2).max(4),
  correctIndex: z.number().int().min(0),
  explanation: z.string().min(1),
});

export const Step3ReflectionBlockSchema = z.object({
  type: z.literal('reflection'),
  prompt: z.string().min(1),
  sampleAnswer: z.string().optional(),
});

export const Step3SteppedDemoBlockSchema = z.object({
  type: z.literal('steppedDemo'),
  title: z.string().min(1),
  visualizerType: z.enum(['array', 'tree']),
  steps: z.array(
    z.object({
      narration: z.string().min(1),
      state: z.record(z.unknown()),
    }),
  ).min(1),
});

export const Step3BlockSchema = z.union([
  Step3HeroBlockSchema,
  Step3TextBlockSchema,
  Step3KnowledgeCardBlockSchema,
  Step3IllustrationBlockSchema,
  Step3MultipleChoiceBlockSchema,
  Step3ReflectionBlockSchema,
  Step3SteppedDemoBlockSchema,
]);

export const LessonPageDesignSchema = z.object({
  pageNumber: z.number().int().min(1),
  blocks: z.array(Step3BlockSchema).min(1).max(8),
});

export const Step3OutputSchema = z.array(LessonPageDesignSchema).min(1);

export type LessonPageDesign = z.infer<typeof LessonPageDesignSchema>;

// ─────────────────────────────────────────────
// Pipeline Input
// ─────────────────────────────────────────────

export const GenerateLessonInputSchema = z.object({
  sourceText: z.string().min(1),
  lessonTitle: z.string().optional(),
});

export type GenerateLessonInput = z.infer<typeof GenerateLessonInputSchema>;
