import type { AICourseDraft, GenerateCourseInput } from '@/types/ai';

export type GenerateCourseFn = (input: GenerateCourseInput) => Promise<AICourseDraft>;
