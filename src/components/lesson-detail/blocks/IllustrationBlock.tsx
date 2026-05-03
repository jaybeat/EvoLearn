import { renderIllustration } from '@/illustrations';
import type { IllustrationKey } from '@/types/course';

export interface IllustrationBlockProps {
  illustrationKey: IllustrationKey;
}

export const IllustrationBlock = ({ illustrationKey }: IllustrationBlockProps) => (
  <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border/60">
    {renderIllustration(illustrationKey)}
  </div>
);
