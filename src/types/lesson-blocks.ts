import type { IllustrationKey } from './course';

export type BlockType =
  | 'hero'
  | 'text'
  | 'multipleChoice'
  | 'reflection'
  | 'knowledgeCard'
  | 'illustration';

export interface BaseBlock {
  id: string;
}

export interface HeroBlock extends BaseBlock {
  type: 'hero';
  title: string;
  subtitle: string;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  body: string;
  variant?: 'default' | 'callout' | 'tip';
}

export interface MultipleChoiceBlock extends BaseBlock {
  type: 'multipleChoice';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ReflectionBlock extends BaseBlock {
  type: 'reflection';
  prompt: string;
  sampleAnswer?: string;
}

export interface KnowledgeCardBlock extends BaseBlock {
  type: 'knowledgeCard';
  emoji: string;
  title: string;
  body: string;
}

export interface IllustrationBlock extends BaseBlock {
  type: 'illustration';
  key: IllustrationKey;
}

export type LessonBlock =
  | HeroBlock
  | TextBlock
  | MultipleChoiceBlock
  | ReflectionBlock
  | KnowledgeCardBlock
  | IllustrationBlock;

export interface BlockInteractionState {
  selectedIndex?: number;
  isRevealed?: boolean;
  value?: string;
  isCorrect?: boolean;
}

export type PageState = Record<string, BlockInteractionState>;
