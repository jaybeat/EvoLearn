import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  lessonProgress: Record<string, number>;
  setLessonPage: (lessonId: string, page: number) => void;
  reset: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      lessonProgress: {},
      setLessonPage: (lessonId, page) =>
        set((s) => ({ lessonProgress: { ...s.lessonProgress, [lessonId]: page } })),
      reset: () => set({ lessonProgress: {} }),
    }),
    { name: 'evolearn:progress' },
  ),
);
