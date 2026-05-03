import { Check, Clock4, Wrench } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Mascot } from '@/components/lessons-map/Mascot';

export type LessonNodeState = 'current' | 'locked' | 'completed' | 'advanced';

export interface LessonNodeProps {
  state: LessonNodeState;
  label: string;
  subline?: string;
  offsetX: number;
  showMascot?: boolean;
  scaleUp?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

const stateRing: Record<LessonNodeState, string> = {
  current: cn(
    'border-2 border-[hsl(var(--color-block-primary-border))] bg-surface text-text-secondary',
    'shadow-[0_4px_0_0_hsl(var(--color-block-primary-shadow)),0_5px_0_0_hsl(var(--color-block-primary-shadow-deep))]',
    'hover:shadow-[0_6px_0_0_hsl(var(--color-block-primary-shadow)),0_7px_0_0_hsl(var(--color-block-primary-shadow-deep))]',
  ),
  locked: cn(
    'border-2 border-[hsl(var(--color-block-neutral-border))] bg-[hsl(var(--color-block-neutral-bg))] text-text-tertiary',
    'shadow-[0_4px_0_0_hsl(var(--color-block-neutral-shadow)),0_5px_0_0_hsl(var(--color-block-neutral-shadow-deep))]',
    'hover:shadow-[0_6px_0_0_hsl(var(--color-block-neutral-shadow)),0_7px_0_0_hsl(var(--color-block-neutral-shadow-deep))]',
  ),
  completed: cn(
    'border-2 border-brand-active bg-brand text-white',
    'shadow-[0_4px_0_0_hsl(var(--color-brand-primary-hover)),0_5px_0_0_hsl(var(--color-brand-primary-active))]',
    'hover:shadow-[0_6px_0_0_hsl(var(--color-brand-primary-hover)),0_7px_0_0_hsl(var(--color-brand-primary-active))]',
  ),
  advanced: cn(
    'border-2 border-[hsl(var(--color-block-neutral-border))] bg-[hsl(var(--color-block-neutral-bg))] text-text-tertiary',
    'shadow-[0_4px_0_0_hsl(var(--color-block-neutral-shadow)),0_5px_0_0_hsl(var(--color-block-neutral-shadow-deep))]',
    'hover:shadow-[0_6px_0_0_hsl(var(--color-block-neutral-shadow)),0_7px_0_0_hsl(var(--color-block-neutral-shadow-deep))]',
  ),
};

const stateIcon = (state: LessonNodeState): ReactNode => {
  switch (state) {
    case 'completed':
      return <Check className="size-5 md:size-6" strokeWidth={3} />;
    case 'advanced':
      return <Wrench className="size-5" strokeWidth={2} />;
    default:
      return <Clock4 className="size-5" strokeWidth={2} />;
  }
};

export const LessonNode = ({
  state,
  label,
  subline,
  offsetX,
  showMascot = false,
  scaleUp = false,
  onClick,
  ariaLabel,
}: LessonNodeProps) => {
  const isCurrent = state === 'current';
  return (
    <div className="relative flex justify-center">
      <div
        className={cn('relative z-10 transition-transform duration-300', scaleUp && 'scale-110')}
        style={{ transform: `translateX(${offsetX}px)${scaleUp ? ' scale(1.1)' : ''}` }}
      >
        <button
          type="button"
          onClick={onClick}
          aria-label={ariaLabel ?? label}
          className={cn(
            'group relative flex items-center justify-center rounded-full',
            'w-14 h-14 md:w-16 md:h-16',
            'transition-all duration-150 ease-out',
            'hover:-translate-y-0.5 active:translate-y-1 active:shadow-none',
            stateRing[state],
          )}
        >
          {isCurrent && showMascot ? (
            <span className="pointer-events-none absolute -inset-3 z-0">
              <Mascot size={88} withHalo />
            </span>
          ) : null}
          <span className="relative z-10">
            {isCurrent ? null : stateIcon(state)}
          </span>
        </button>
        <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2 w-40 sm:w-48 text-left">
          <p className="line-clamp-2 text-base font-medium text-text-primary">{label}</p>
          {subline ? (
            <p className="mt-0.5 text-xs text-text-tertiary">{subline}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
