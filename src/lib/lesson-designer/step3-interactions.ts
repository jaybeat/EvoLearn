import { callGemini } from '@/lib/ai/providers/gemini';
import { buildStep3SystemPrompt, buildStep3UserPrompt } from './prompts';
import { Step3OutputSchema } from './types';
import type { CognitiveStep, LessonPageDesign } from './types';

export async function runStep3(
  sourceText: string,
  step2Pages: { pageNumber: number; steps: CognitiveStep[] }[],
): Promise<LessonPageDesign[]> {
  const system = buildStep3SystemPrompt();
  const user = buildStep3UserPrompt(sourceText, step2Pages);
  const raw = await callGemini(system, user, { temperature: 0.35, maxOutputTokens: 8192 });

  const parsed = JSON.parse(raw);
  const validated = Step3OutputSchema.parse(parsed);
  return validated;
}
