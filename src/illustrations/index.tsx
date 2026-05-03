import type { IllustrationKey } from '@/types/course';
import { FocusedDiffuseMode } from './FocusedDiffuseMode';
import { BrainModes } from './BrainModes';
import { DeepLearningCycle } from './DeepLearningCycle';

export const illustrations: Record<IllustrationKey, () => JSX.Element> = {
  focusedDiffuseMode: FocusedDiffuseMode,
  brainModes: BrainModes,
  deepLearningCycle: DeepLearningCycle,
};

export const renderIllustration = (key: IllustrationKey | undefined) => {
  if (!key) return null;
  const Comp = illustrations[key];
  return Comp ? <Comp /> : null;
};
