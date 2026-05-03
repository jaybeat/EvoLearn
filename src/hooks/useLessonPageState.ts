import { useState, useCallback } from 'react';
import type { BlockInteractionState, PageState } from '@/types/lesson-blocks';

export const useLessonPageState = () => {
  const [state, setState] = useState<PageState>({});

  const update = useCallback((blockId: string, patch: Partial<BlockInteractionState>) => {
    setState((s) => ({
      ...s,
      [blockId]: { ...s[blockId], ...patch },
    }));
  }, []);

  const reset = useCallback(() => {
    setState({});
  }, []);

  return { state, setState, update, reset };
};
