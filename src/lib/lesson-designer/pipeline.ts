import { runStep1 } from './step1-paginate';
import { runStep2 } from './step2-components';
import { runStep3 } from './step3-interactions';
import { formatLessonPages } from './formatter';
import type { GenerateLessonInput } from './types';
import type { LessonPage } from '@/types/course';

export async function generateLessonPages(input: GenerateLessonInput): Promise<LessonPage[]> {
  const { sourceText, lessonTitle } = input;

  const step1Result = await runStep1(sourceText, lessonTitle);
  const step2Result = await runStep2(sourceText, step1Result);
  const step3Result = await runStep3(sourceText, step2Result);

  return formatLessonPages(step3Result);
}

export { runStep1, runStep2, runStep3 };
