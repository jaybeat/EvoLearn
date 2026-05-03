import { Notebook } from 'lucide-react';
import { Icon } from '@/components/primitives/Icon';

export interface SectionHeaderPillProps {
  number: number;
  title: string;
  completed: number;
  total: number;
  onSavedClick?: () => void;
}

export const SectionHeaderPill = ({
  number,
  title,
  completed,
  total,
  onSavedClick,
}: SectionHeaderPillProps) => (
  <div className="sticky top-0 z-20 flex items-stretch justify-between overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
    <div className="flex-1 px-5 py-3">
      <h2 className="text-base font-semibold text-text-primary">
        {number}. {title}
      </h2>
      <p className="mt-0.5 text-sm font-normal text-text-secondary">
        {completed}/{total} lessons
      </p>
    </div>
    <button
      type="button"
      onClick={onSavedClick}
      className="flex items-center justify-center border-l border-border px-5 text-text-secondary hover:text-text-primary transition-colors"
      aria-label="Saved items"
    >
      <Icon icon={Notebook} />
    </button>
  </div>
);
