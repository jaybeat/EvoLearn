import { seedCourse } from '@/data/seed-course';
import { binaryTreeCourse } from '@/data/binary-tree-course';
import type { Course, Lesson } from '@/types/course';

export const allCourses: Course[] = [seedCourse, binaryTreeCourse];

export const findCourse = (id: string | undefined): Course | undefined =>
  id ? allCourses.find((c) => c.id === id) : undefined;

export const findLesson = (lessonId: string): Lesson | undefined => {
  for (const course of allCourses) {
    for (const section of course.sections) {
      const found = section.lessons.find((l) => l.id === lessonId);
      if (found) return found;
    }
  }
  return undefined;
};

export const findCourseByLessonId = (lessonId: string | undefined): Course | undefined => {
  if (!lessonId) return undefined;
  for (const course of allCourses) {
    for (const section of course.sections) {
      if (section.lessons.some((l) => l.id === lessonId)) return course;
    }
  }
  return undefined;
};
