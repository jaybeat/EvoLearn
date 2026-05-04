import { z } from 'zod';
import type { LessonPage } from './course';

// Re-export lesson-designer input types for consumers who want to
// generate lesson pages from raw article text.
export type { GenerateLessonInput, LessonPageDesign } from '@/lib/lesson-designer/types';

// Legacy placeholder schema kept for backward compat.
// New code should use the types exported from @/lib/lesson-designer.
export const AILessonContentSchema = z.object({
  lessonId: z.string(),
  pages: z.array(
    z.object({
      page: z.number().int().min(1),
      blocks: z.array(z.record(z.unknown())),
    }),
  ),
});

export type AILessonContent = z.infer<typeof AILessonContentSchema>;

// Convenience type for a fully generated lesson payload.
export interface GeneratedLessonPayload {
  input: import('@/lib/lesson-designer/types').GenerateLessonInput;
  pages: LessonPage[];
}
