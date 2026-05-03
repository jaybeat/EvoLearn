import type { GenerateCourseFn } from '../types';

export const openaiGenerateCourse: GenerateCourseFn = async () => {
  throw new Error(
    'OpenAI provider not configured in v1. Set VITE_AI_PROVIDER=mock or wire a server route.',
  );
};
