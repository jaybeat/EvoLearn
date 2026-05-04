import type { LessonPageDesign } from './types';
import type { LessonPage } from '@/types/course';
import type { LessonBlock } from '@/types/lesson-blocks';

export function formatLessonPages(designs: LessonPageDesign[]): LessonPage[] {
  const totalPages = designs.length;

  return designs.map((design, index) => {
    const pageNumber = index + 1;

    const blocks: LessonBlock[] = design.blocks.map((block, blockIndex) => {
      const baseId = `p${pageNumber}-${block.type}-${blockIndex}`;

      switch (block.type) {
        case 'hero':
          return {
            id: baseId,
            type: 'hero',
            title: block.title,
            subtitle: block.subtitle,
          };
        case 'text':
          return {
            id: baseId,
            type: 'text',
            body: block.body,
            variant: block.variant ?? 'default',
          };
        case 'knowledgeCard':
          return {
            id: baseId,
            type: 'knowledgeCard',
            emoji: block.emoji,
            title: block.title,
            body: block.body,
          };
        case 'illustration':
          return {
            id: baseId,
            type: 'illustration',
            key: block.key as import('@/types/course').IllustrationKey,
          };
        case 'multipleChoice':
          return {
            id: baseId,
            type: 'multipleChoice',
            question: block.question,
            options: block.options,
            correctIndex: block.correctIndex,
            explanation: block.explanation,
          };
        case 'reflection':
          return {
            id: baseId,
            type: 'reflection',
            prompt: block.prompt,
            sampleAnswer: block.sampleAnswer,
          };
        case 'steppedDemo':
          return {
            id: baseId,
            type: 'steppedDemo',
            title: block.title,
            visualizerType: block.visualizerType,
            steps: block.steps as unknown as Array<{
              narration: string;
              state: import('@/types/lesson-blocks').ArrayVisualizerState | import('@/types/lesson-blocks').TreeVisualizerState;
            }>,
          };
        default:
          throw new Error(`Unknown block type: ${(block as Record<string, unknown>).type}`);
      }
    });

    return {
      page: pageNumber,
      totalPages,
      blocks,
    };
  });
}
