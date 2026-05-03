import type { LessonBlock, BlockInteractionState } from '@/types/lesson-blocks';
import { HeroBlock } from './blocks/HeroBlock';
import { TextBlock } from './blocks/TextBlock';
import { MultipleChoiceBlock } from './blocks/MultipleChoiceBlock';
import { ReflectionBlock } from './blocks/ReflectionBlock';
import { KnowledgeCardBlock } from './blocks/KnowledgeCardBlock';
import { IllustrationBlock } from './blocks/IllustrationBlock';

export interface LessonBlockRendererProps {
  block: LessonBlock;
  interactionState?: BlockInteractionState;
  onInteract?: (blockId: string, payload: Partial<BlockInteractionState>) => void;
}

export const LessonBlockRenderer = ({ block, interactionState, onInteract }: LessonBlockRendererProps) => {
  switch (block.type) {
    case 'hero':
      return <HeroBlock title={block.title} subtitle={block.subtitle} />;
    case 'text':
      return <TextBlock body={block.body} variant={block.variant} />;
    case 'multipleChoice':
      return (
        <MultipleChoiceBlock
          question={block.question}
          options={block.options}
          correctIndex={block.correctIndex}
          explanation={block.explanation}
          selectedIndex={interactionState?.selectedIndex}
          isRevealed={interactionState?.isRevealed}
          onSelect={(idx) => onInteract?.(block.id, { selectedIndex: idx })}
        />
      );
    case 'reflection':
      return (
        <ReflectionBlock
          prompt={block.prompt}
          sampleAnswer={block.sampleAnswer}
          value={interactionState?.value}
          isRevealed={interactionState?.isRevealed}
          onChange={(val) => onInteract?.(block.id, { value: val })}
        />
      );
    case 'knowledgeCard':
      return <KnowledgeCardBlock emoji={block.emoji} title={block.title} body={block.body} />;
    case 'illustration':
      return <IllustrationBlock illustrationKey={block.key} />;
    default:
      return null;
  }
};
