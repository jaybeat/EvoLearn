import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { ArrayVisualizerState, TreeVisualizerState } from '@/types/lesson-blocks';

export interface DemoStep {
  narration: string;
  state: ArrayVisualizerState | TreeVisualizerState;
}

interface StepPlayerProps {
  title: string;
  steps: DemoStep[];
  visualizer: React.ComponentType<{ state: ArrayVisualizerState | TreeVisualizerState }>;
}

export function StepPlayer({ title, steps, visualizer: Visualizer }: StepPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalSteps = steps.length;
  const currentStep = steps[currentIndex];

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    if (currentIndex >= totalSteps - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= totalSteps - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1400);
    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, totalSteps]);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSteps - 1;

  return (
    <div className="w-full space-y-4 rounded-2xl border border-border bg-surface-secondary p-4">
      <h3 className="text-center text-base font-semibold text-text-primary">{title}</h3>

      <div className="flex min-h-[120px] items-center justify-center">
        <Visualizer state={currentStep.state} />
      </div>

      <p className="min-h-[3rem] text-center text-sm leading-relaxed text-text-secondary">
        {currentStep.narration}
      </p>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={isFirst}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface transition-colors',
            isFirst ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface-hover active:bg-surface-active',
          )}
          aria-label="上一步"
        >
          <ChevronLeft className="size-4 text-text-primary" />
        </button>

        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          disabled={isLast}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface transition-colors',
            isLast ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface-hover active:bg-surface-active',
          )}
          aria-label={isPlaying ? '暂停' : '自动播放'}
        >
          {isPlaying ? (
            <Pause className="size-4 text-text-primary" />
          ) : (
            <Play className="size-4 text-text-primary" />
          )}
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={isLast}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface transition-colors',
            isLast ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface-hover active:bg-surface-active',
          )}
          aria-label="下一步"
        >
          <ChevronRight className="size-4 text-text-primary" />
        </button>

        <button
          type="button"
          onClick={reset}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:bg-surface-hover active:bg-surface-active"
          aria-label="重置"
        >
          <RotateCcw className="size-4 text-text-secondary" />
        </button>
      </div>

      <div className="flex justify-center gap-1">
        {steps.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              idx === currentIndex ? 'w-4 bg-brand' : 'w-1.5 bg-border',
            )}
          />
        ))}
      </div>
    </div>
  );
}
