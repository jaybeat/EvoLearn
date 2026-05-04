import { callGemini } from '@/lib/ai/providers/gemini';
import { buildStep2SystemPrompt, buildStep2UserPrompt } from './prompts';
import { Step2OutputSchema } from './types';
import type { PageOutline, CognitiveStep } from './types';

export async function runStep2(
  sourceText: string,
  pageOutlines: PageOutline[],
): Promise<{ pageNumber: number; steps: CognitiveStep[] }[]> {
  const system = buildStep2SystemPrompt();
  const user = buildStep2UserPrompt(sourceText, pageOutlines);
  const raw = await callGemini(system, user, { temperature: 0.4 });

  const parsed = JSON.parse(raw);
  const validated = Step2OutputSchema.parse(parsed);
  return validated;
}
