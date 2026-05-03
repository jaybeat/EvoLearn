import { ChunkyButton } from '@/components/primitives/ChunkyButton';
import { cn } from '@/lib/cn';

export interface LessonNavFooterProps {
  page: number;
  totalPages: number;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
}

export const LessonNavFooter = ({
  page,
  totalPages,
  onBack,
  onNext,
  nextLabel,
}: LessonNavFooterProps) => {
  const showBack = page > 1;
  const isLast = page >= totalPages;
  return (
    <footer className="fixed inset-x-0 bottom-0 z-30 safe-area-bottom border-t border-border/60 bg-surface/85 backdrop-blur-md">
      <div className="mx-auto max-w-2xl px-4 py-3">
        <div
          className={cn(
            'grid gap-3 transition-[grid-template-columns] duration-300 ease-out',
            showBack ? 'grid-cols-2' : 'grid-cols-1',
          )}
        >
          {showBack ? (
            <ChunkyButton variant="secondary" size="lg" onClick={onBack}>
              Back
            </ChunkyButton>
          ) : null}
          <ChunkyButton variant="brand" size="lg" onClick={onNext}>
            {nextLabel ?? (isLast ? 'Finish' : 'Next')}
          </ChunkyButton>
        </div>
      </div>
    </footer>
  );
};
