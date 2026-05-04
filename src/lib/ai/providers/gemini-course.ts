import { callGemini } from './gemini';
import { AICourseDraftSchema } from '@/types/ai';
import { buildSystemPrompt, buildUserPrompt } from '../prompt';
import type { GenerateCourseFn } from '../types';

export const geminiGenerateCourse: GenerateCourseFn = async (input) => {
  const systemPrompt = buildSystemPrompt(input.language ?? 'zh');
  const userPrompt = buildUserPrompt(input.text);

  const raw = await callGemini(systemPrompt, userPrompt, {
    temperature: 0.3,
    maxOutputTokens: 4096,
  });

  const parsed = JSON.parse(raw);
  const validated = AICourseDraftSchema.parse(parsed);
  return validated;
};
