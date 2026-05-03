import type { GenerateCourseFn } from '../types';

export const anthropicGenerateCourse: GenerateCourseFn = async () => {
  throw new Error(
    'Anthropic provider not configured in v1. Set VITE_AI_PROVIDER=mock or wire a server route.',
  );
};
