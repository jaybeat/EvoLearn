import type { Course } from '@/types/course';

export const formatTotalMinutes = (course: Course): number =>
  course.sections.reduce(
    (sum, s) => sum + s.lessons.reduce((a, l) => a + l.estimatedMinutes, 0),
    0,
  );

export const totalLessonCount = (course: Course): number =>
  course.sections.reduce((sum, s) => sum + s.lessons.length, 0);

export const estimateDays = (
  totalMinutes: number,
  dailyGoalMinutes: number,
): number => Math.max(1, Math.ceil(totalMinutes / Math.max(1, dailyGoalMinutes)));
