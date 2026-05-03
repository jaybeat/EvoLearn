import { z } from 'zod';

// TODO: Define strict Zod schemas per block type once content generation is wired up.
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
