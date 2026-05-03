import { Pill } from '@/components/primitives/Pill';
import type { Course } from '@/types/course';
import { estimateDays, formatTotalMinutes, totalLessonCount } from '@/lib/format';

export interface StatPillsProps {
  course: Course;
}

export const StatPills = ({ course }: StatPillsProps) => {
  const totalMinutes = formatTotalMinutes(course);
  const days = estimateDays(totalMinutes, course.dailyGoalMinutes);
  return (
    <div className="flex flex-wrap gap-2">
      <Pill>{course.sections.length} sections</Pill>
      <Pill>{totalLessonCount(course)} lessons</Pill>
      <Pill>~{totalMinutes} min total</Pill>
      <Pill>~{days} days at {course.dailyGoalMinutes} min daily goal</Pill>
    </div>
  );
};
