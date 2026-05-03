import { create } from 'zustand';

interface UIState {
  scrollY: number;
  setScrollY: (y: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  scrollY: 0,
  setScrollY: (y) => set({ scrollY: y }),
}));
