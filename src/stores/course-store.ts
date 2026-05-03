import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Course } from '@/types/course';
import { seedCourse } from '@/data/seed-course';

interface CourseState {
  courses: Course[];
  activeCourseId: string;
  setActiveCourse: (id: string) => void;
  addCourse: (course: Course) => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      courses: [seedCourse],
      activeCourseId: seedCourse.id,
      setActiveCourse: (id) => set({ activeCourseId: id }),
      addCourse: (course) =>
        set((s) => ({
          courses: s.courses.find((c) => c.id === course.id)
            ? s.courses
            : [...s.courses, course],
        })),
    }),
    { name: 'evolearn:courses' },
  ),
);
