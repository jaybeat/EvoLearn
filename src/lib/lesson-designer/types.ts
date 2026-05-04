import type { LessonBlock } from '@/types/lesson-blocks';

// ============================================================================
// Step 1: Narrative Analysis & Pagination
// ============================================================================

export interface PageOutline {
  /** 1-based page number */
  pageNumber: number;
  /** Single-sentence theme for this page */
  theme: string;
  /** Cognitive goal with Bloom's level */
  cognitiveGoal: {
    level: '记忆' | '理解' | '应用' | '分析' | '评估' | '创造';
    description: string;
  };
  /** Emotional arc, e.g. "轻松→烦躁" */
  emotionalArc: string;
  /** The single "aha" insight this page delivers */
  keyInsight: string;
  /** Which source paragraphs this page covers */
  sourceParagraphs: string[];
  /** Estimated reading time in seconds (target: 30–90) */
  estimatedReadSeconds: number;
}

// ============================================================================
// Step 2: Cognitive Step Decomposition
// ============================================================================

export type ComponentType =
  | 'hero'
  | 'text'
  | 'knowledgeCard'
  | 'illustration'
  | 'interaction_placeholder';

export interface CognitiveStep {
  stepOrder: number;
  /** What the user is feeling/thinking at this moment */
  userMentalState: string;
  /** What this step aims to achieve pedagogically */
  contentPurpose: string;
  /** Which existing component (or placeholder) should render this step */
  component: ComponentType;
  /** Proposed content payload (shape depends on component) */
  proposedContent: Record<string, unknown>;
  /** If this step needs an interaction, what type? */
  interactionType?: 'demo' | 'game';
}

export interface PageSteps {
  pageNumber: number;
  steps: CognitiveStep[];
}

// ============================================================================
// Step 3: Final Lesson Page Design
// ============================================================================

export interface LessonPageDesign {
  pageNumber: number;
  totalPages: number;
  blocks: LessonBlock[];
}

// ============================================================================
// Pipeline Meta
// ============================================================================

export interface PipelineOutput {
  sourceTitle: string;
  pages: LessonPageDesign[];
  /** Summary of required but not-yet-implemented interactions */
  futureInteractions: FutureInteraction[];
}

export interface FutureInteraction {
  id: string;
  type: 'demo' | 'game';
  pageNumber: number;
  description: string;
}
