import type { AICourseDraft } from '@/types/ai';
import type { GenerateCourseFn } from '../types';
import { seedCourse } from '@/data/seed-course';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const fromSeed = (): AICourseDraft => ({
  title: seedCourse.title,
  subtitle: seedCourse.subtitle,
  description: seedCourse.description,
  dailyGoalMinutes: seedCourse.dailyGoalMinutes,
  achievements: seedCourse.achievements,
  sections: seedCourse.sections.map((section) => ({
    number: section.number,
    title: section.title,
    lessons: section.lessons.map((l) => ({
      number: l.number,
      title: l.title,
      hookingQuestion: l.hookingQuestion,
      estimatedMinutes: l.estimatedMinutes,
      isAdvanced: l.isAdvanced,
    })),
  })) as AICourseDraft['sections'],
});

export const mockGenerateCourse: GenerateCourseFn = async (_input) => {
  await sleep(800);
  return fromSeed();
};
