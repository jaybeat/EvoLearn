import { ChunkyButton } from '@/components/primitives/ChunkyButton';
import { cn } from '@/lib/cn';

export type FooterMode = 'submit' | 'continue' | 'next' | 'finish';

const modeLabels: Record<FooterMode, string> = {
  submit: '提交',
  continue: '继续',
  next: '下一页',
  finish: '完成',
};

export interface LessonNavFooterProps {
  page: number;
  onBack: () => void;
  onNext: () => void;
  mode?: FooterMode;
  disabled?: boolean;
}

export const LessonNavFooter = ({
  page,
  onBack,
  onNext,
  mode = 'next',
  disabled = false,
}: LessonNavFooterProps) => {
  const showBack = page > 1;
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
              返回
            </ChunkyButton>
          ) : null}
          <ChunkyButton
            variant="brand"
            size="lg"
            onClick={onNext}
            disabled={disabled}
            fullWidth
          >
            {modeLabels[mode]}
          </ChunkyButton>
        </div>
      </div>
    </footer>
  );
};
