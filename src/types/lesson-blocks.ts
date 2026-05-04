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

export interface ArrayVisualizerState {
  items: Array<{
    value: number | string;
    status: 'normal' | 'highlighted' | 'excluded' | 'inserting' | 'removing';
    label?: string;
  }>;
  counter?: { label: string; value: number };
}

export interface TreeNodeState {
  id: string;
  value: number | string;
  x: number;
  y: number;
  status: 'normal' | 'highlighted' | 'new';
}

export interface TreeEdgeState {
  from: string;
  to: string;
  status: 'normal' | 'highlighted';
}

export interface TreeVisualizerState {
  nodes: TreeNodeState[];
  edges: TreeEdgeState[];
}

export interface SteppedDemoBlock extends BaseBlock {
  type: 'steppedDemo';
  title: string;
  visualizerType: 'array' | 'tree';
  steps: Array<{
    narration: string;
    state: ArrayVisualizerState | TreeVisualizerState;
  }>;
}

export type LessonBlock =
  | HeroBlock
  | TextBlock
  | MultipleChoiceBlock
  | ReflectionBlock
  | KnowledgeCardBlock
  | IllustrationBlock
  | SteppedDemoBlock;

export interface BlockInteractionState {
  selectedIndex?: number;
  isRevealed?: boolean;
  value?: string;
  isCorrect?: boolean;
}

export type PageState = Record<string, BlockInteractionState>;
