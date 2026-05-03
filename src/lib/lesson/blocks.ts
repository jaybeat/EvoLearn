import type { LessonBlock, PageState } from '@/types/lesson-blocks';

export const isPageComplete = (blocks: LessonBlock[], pageState: PageState): boolean => {
  return blocks.every((block) => {
    switch (block.type) {
      case 'multipleChoice':
        return pageState[block.id]?.isCorrect === true;
      case 'reflection':
        return pageState[block.id]?.isRevealed === true;
      default:
        return true;
    }
  });
};

export const hasInteractiveBlocks = (blocks: LessonBlock[]): boolean => {
  return blocks.some((b) => b.type === 'multipleChoice' || b.type === 'reflection');
};

export const canAdvance = (blocks: LessonBlock[], submitted: boolean): boolean => {
  if (!hasInteractiveBlocks(blocks)) return true;
  return submitted;
};
