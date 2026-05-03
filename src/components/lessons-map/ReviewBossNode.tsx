import { Check, Lock } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface ReviewBossNodeProps {
  totalSegments: number;
  completedSegments: number;
  offsetX: number;
  locked?: boolean;
  label?: string;
  onClick?: () => void;
}
const arc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
  const start = polar(cx, cy, r, startAngle);
  const end = polar(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
};

const polar = (cx: number, cy: number, r: number, angleDeg: number) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

export const ReviewBossNode = ({
  totalSegments,
  completedSegments,
  offsetX,
  locked = true,
  label = 'Section Review',
  onClick,
}: ReviewBossNodeProps) => {
  const slices = Array.from({ length: totalSegments }, (_, i) => i);
  const sliceAngle = 360 / totalSegments;

  return (
    <div className="relative flex justify-center">
      <div className="relative z-10" style={{ transform: `translateX(${offsetX}px)` }}>
        <button
          type="button"
          onClick={onClick}
          aria-label={label}
          className={cn(
            'group relative flex items-center justify-center rounded-full',
            'w-14 h-14 md:w-16 md:h-16',
            'transition-all duration-150 ease-out',
            'hover:-translate-y-0.5 active:translate-y-1 active:shadow-none',
            'border-2 border-[hsl(var(--color-block-neutral-border))] bg-surface',
            'shadow-[0_4px_0_0_hsl(var(--color-block-neutral-shadow)),0_5px_0_0_hsl(var(--color-block-neutral-shadow-deep))]',
            'hover:shadow-[0_6px_0_0_hsl(var(--color-block-neutral-shadow)),0_7px_0_0_hsl(var(--color-block-neutral-shadow-deep))]',
          )}
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
            {slices.map((idx) => {
              const startAngle = idx * sliceAngle;
              const endAngle = startAngle + sliceAngle - 4;
              const filled = idx < completedSegments;
              return (
                <path
                  key={idx}
                  d={arc(50, 50, 46, startAngle, endAngle)}
                  fill={
                    filled
                      ? 'hsl(var(--color-brand))'
                      : 'hsl(var(--color-block-neutral-bg))'
                  }
                />
              );
            })}
          </svg>
          <span
            className={cn(
              'relative z-10',
              locked ? 'text-text-disabled' : 'text-brand-active',
            )}
          >
            {locked ? (
              <Lock className="size-5" strokeWidth={2} aria-hidden="true" />
            ) : (
              <Check className="size-5" strokeWidth={2.4} aria-hidden="true" />
            )}
          </span>
        </button>
        <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2 w-40 sm:w-48 text-left">
          <p className="line-clamp-2 text-base font-medium text-text-primary">{label}</p>
          <p className="mt-0.5 text-xs text-text-tertiary">
            {completedSegments}/{totalSegments} sessions
          </p>
        </div>
      </div>
    </div>
  );
};
