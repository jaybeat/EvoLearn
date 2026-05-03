import { mockGenerateCourse } from './providers/mock';
import { anthropicGenerateCourse } from './providers/anthropic';
import { openaiGenerateCourse } from './providers/openai';
import type { GenerateCourseFn } from './types';

const provider = (
  import.meta.env.VITE_AI_PROVIDER ?? 'mock'
) as 'mock' | 'anthropic' | 'openai';

const providers: Record<typeof provider, GenerateCourseFn> = {
  mock: mockGenerateCourse,
  anthropic: anthropicGenerateCourse,
  openai: openaiGenerateCourse,
};

export const generateCourse: GenerateCourseFn = (input) =>
  (providers[provider] ?? mockGenerateCourse)(input);
