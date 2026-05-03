import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  lessonProgress: Record<string, number>;
  completedPages: Record<string, number[]>;
  setLessonPage: (lessonId: string, page: number) => void;
  markPageCompleted: (lessonId: string, page: number) => void;
  reset: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      lessonProgress: {},
      completedPages: {},
      setLessonPage: (lessonId, page) =>
        set((s) => ({ lessonProgress: { ...s.lessonProgress, [lessonId]: page } })),
      markPageCompleted: (lessonId, page) =>
        set((s) => {
          const existing = s.completedPages[lessonId] ?? [];
          if (existing.includes(page)) return s;
          return {
            completedPages: {
              ...s.completedPages,
              [lessonId]: [...existing, page],
            },
          };
        }),
      reset: () => set({ lessonProgress: {}, completedPages: {} }),
    }),
    { name: 'evolearn:progress' },
  ),
);
