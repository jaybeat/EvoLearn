import { callGemini } from '@/lib/ai/providers/gemini';
import { buildStep1SystemPrompt, buildStep1UserPrompt } from './prompts';
import { Step1OutputSchema } from './types';
import type { PageOutline } from './types';

export async function runStep1(sourceText: string, lessonTitle?: string): Promise<PageOutline[]> {
  const system = buildStep1SystemPrompt();
  const user = buildStep1UserPrompt(sourceText, lessonTitle);
  const raw = await callGemini(system, user, { temperature: 0.3 });

  const parsed = JSON.parse(raw);
  const validated = Step1OutputSchema.parse(parsed);
  return validated;
}
