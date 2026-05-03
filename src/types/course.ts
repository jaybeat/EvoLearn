export type LessonState =
  | 'current'
  | 'locked'
  | 'completed'
  | 'advanced';

export type IllustrationKey =
  | 'focusedDiffuseMode'
  | 'brainModes'
  | 'deepLearningCycle';

/** @deprecated Use LessonPage with blocks instead */
export interface LessonContent {
  page: number;
  totalPages: number;
  question: string;
  subtitle: string;
  illustrationKey?: IllustrationKey;
}

export interface LessonPage {
  page: number;
  totalPages: number;
  blocks: import('@/types/lesson-blocks').LessonBlock[];
}

export interface Lesson {
  id: string;
  number: string; // '1.1'
  title: string;
  hookingQuestion: string;
  estimatedMinutes: number;
  state: LessonState;
  isAdvanced?: boolean;
  content: LessonPage[];
}

export interface ReviewSession {
  totalSegments: number;
  completedSegments: number;
}

export interface Section {
  id: string;
  number: number;
  title: string;
  lessons: Lesson[];
  review: ReviewSession;
}

export interface Achievement {
  title: string;
  body: string;
}

export interface SourceMaterial {
  title: string;
  author: string;
  coverUrl: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverUrl: string;
  source: SourceMaterial;
  sections: Section[];
  achievements: Achievement[];
  dailyGoalMinutes: number;
}
