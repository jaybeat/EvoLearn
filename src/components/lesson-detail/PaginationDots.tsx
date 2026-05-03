import { cn } from '@/lib/cn';

export interface PaginationDotsProps {
  count: number;
  current: number;
}

export const PaginationDots = ({ count, current }: PaginationDotsProps) => (
  <div className="flex items-center gap-1.5">
    {Array.from({ length: count }, (_, i) => {
      const isActive = i === current - 1;
      return (
        <span
          key={i}
          className={cn(
            'h-2 rounded-full transition-all duration-300 ease-out',
            isActive ? 'w-8 bg-brand' : 'w-2 bg-border',
          )}
          aria-hidden="true"
        />
      );
    })}
    <span className="sr-only">
      Page {current} of {count}
    </span>
  </div>
);
