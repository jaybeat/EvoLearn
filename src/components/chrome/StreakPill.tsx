import { Flame, Star } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface StreakPillProps {
  current: number;
  goal: number;
  className?: string;
}

export const StreakPill = ({ current, goal, className }: StreakPillProps) => (
  <div
    className={cn(
      'inline-flex items-center gap-1 rounded-full border border-streak/30 bg-streak-bg px-2.5 py-1',
      className,
    )}
  >
    <Flame className="size-4 text-streak" strokeWidth={2.4} aria-hidden="true" />
    <Star
      className="size-3.5 text-streak-soft"
      fill="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    />
    <span className="rubik-font text-xs font-semibold text-streak">
      {current} <span className="text-text-tertiary">/ {goal}</span>
    </span>
  </div>
);
