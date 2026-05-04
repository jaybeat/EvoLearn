import { mockGenerateCourse } from './providers/mock';
import { anthropicGenerateCourse } from './providers/anthropic';
import { openaiGenerateCourse } from './providers/openai';
import { geminiGenerateCourse } from './providers/gemini-course';
import type { GenerateCourseFn } from './types';

const provider = (
  import.meta.env.VITE_AI_PROVIDER ?? 'mock'
) as 'mock' | 'anthropic' | 'openai' | 'gemini';

const providers: Record<typeof provider, GenerateCourseFn> = {
  mock: mockGenerateCourse,
  anthropic: anthropicGenerateCourse,
  openai: openaiGenerateCourse,
  gemini: geminiGenerateCourse,
};

export const generateCourse: GenerateCourseFn = (input) =>
  (providers[provider] ?? mockGenerateCourse)(input);
