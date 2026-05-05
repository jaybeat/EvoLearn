import { callGemini } from '@/lib/ai/providers/gemini';
import { buildStep1bSystemPrompt, buildStep1bUserPrompt } from './prompts';
import { Step1bOutputSchema } from './types';
import type { PageOutline, LessonGroup } from './types';

/**
 * Step 1.5: 分课分析
 *
 * 在 Step 1 分页完成后，分析这些页面应该组成 1 个还是多个 lessons。
 * 判断依据：认知弧线完整性、心智模型跃迁、成就映射、HookingQuestion 独立性、注意力窗口。
 */
export async function runStep1b(
  pageOutlines: PageOutline[],
  sourceText: string,
): Promise<LessonGroup[]> {
  const system = buildStep1bSystemPrompt();
  const user = buildStep1bUserPrompt(pageOutlines, sourceText);
  const raw = await callGemini(system, user, { temperature: 0.3 });

  const parsed = JSON.parse(raw);
  const validated = Step1bOutputSchema.parse(parsed);
  return validated.lessons;
}
