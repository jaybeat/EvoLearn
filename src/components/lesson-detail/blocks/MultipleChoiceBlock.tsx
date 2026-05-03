import { Check, X } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface MultipleChoiceBlockProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  selectedIndex?: number;
  isRevealed?: boolean;
  onSelect?: (index: number) => void;
}

export const MultipleChoiceBlock = ({
  question,
  options,
  correctIndex,
  explanation,
  selectedIndex,
  isRevealed,
  onSelect,
}: MultipleChoiceBlockProps) => {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <h2 className="text-2xl font-semibold text-text-primary">{question}</h2>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const isSelected = selectedIndex === i;
          const isCorrect = i === correctIndex;
          const showCorrect = isRevealed && isCorrect;
          const showIncorrect = isRevealed && isSelected && !isCorrect;

          return (
            <button
              key={i}
              type="button"
              onClick={() => !isRevealed && onSelect?.(i)}
              disabled={isRevealed}
              className={cn(
                'flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors',
                showCorrect && 'border-green-500 bg-green-50 text-green-900',
                showIncorrect && 'border-red-500 bg-red-50 text-red-900',
                !isRevealed && isSelected && 'border-brand bg-brand/10 text-text-primary',
                !isRevealed &&
                  !isSelected &&
                  'border-border bg-surface text-text-primary hover:bg-surface-hover',
              )}
            >
              <span
                className={cn(
                  'flex size-6 shrink-0 items-center justify-center rounded-full border text-sm font-medium',
                  showCorrect && 'border-green-500 bg-green-500 text-white',
                  showIncorrect && 'border-red-500 bg-red-500 text-white',
                  !isRevealed && isSelected && 'border-brand bg-brand text-white',
                  !isRevealed && !isSelected && 'border-border text-text-secondary',
                )}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {showCorrect && <Check className="size-5 shrink-0 text-green-600" />}
              {showIncorrect && <X className="size-5 shrink-0 text-red-600" />}
            </button>
          );
        })}
      </div>
      {isRevealed && (
        <div className="rounded-xl bg-surface-secondary p-4">
          <p className="font-medium text-text-primary">解析</p>
          <p className="mt-1 text-text-secondary">{explanation}</p>
        </div>
      )}
    </div>
  );
};
