import { z } from 'zod';

export const AICourseDraftSchema = z.object({
  title: z.string().min(1).max(40),
  subtitle: z.string().max(80),
  description: z.string().max(240),
  dailyGoalMinutes: z.number().int().min(5).max(60),
  achievements: z
    .array(z.object({ title: z.string(), body: z.string() }))
    .length(4),
  sections: z
    .array(
      z.object({
        number: z.number().int(),
        title: z.string(),
        lessons: z
          .array(
            z.object({
              number: z.string(),
              title: z.string(),
              hookingQuestion: z.string(),
              estimatedMinutes: z.number().int(),
              isAdvanced: z.boolean().optional(),
            }),
          )
          .min(1)
          .max(4),
      }),
    )
    .length(4),
});

export type AICourseDraft = z.infer<typeof AICourseDraftSchema>;

export interface GenerateCourseInput {
  text: string;
  language?: 'zh' | 'en';
}
