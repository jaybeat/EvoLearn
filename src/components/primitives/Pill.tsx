import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface PillProps extends HTMLAttributes<HTMLDivElement> {
  shape?: 'rounded' | 'full';
  tone?: 'surface' | 'surface-secondary' | 'brand-bg' | 'streak-bg';
  size?: 'sm' | 'md';
}

export const Pill = forwardRef<HTMLDivElement, PillProps>(
  (
    { className, shape = 'full', tone = 'surface-secondary', size = 'md', children, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5 border border-border',
        shape === 'full' ? 'rounded-full' : 'rounded-xl',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        tone === 'surface' && 'bg-surface',
        tone === 'surface-secondary' && 'bg-surface-secondary text-text-secondary',
        tone === 'brand-bg' && 'bg-brand-bg text-brand-text border-brand/30',
        tone === 'streak-bg' && 'bg-streak-bg border-streak/30 text-streak',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
Pill.displayName = 'Pill';
