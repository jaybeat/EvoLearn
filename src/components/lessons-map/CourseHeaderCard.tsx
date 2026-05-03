import {
  BookOpen,
  ChevronsUpDown,
  Ellipsis,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/primitives/Icon';
import type { Course } from '@/types/course';
import { cn } from '@/lib/cn';

export interface CourseHeaderCardProps {
  course: Course;
}

export const CourseHeaderCard = ({ course }: CourseHeaderCardProps) => {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        'relative overflow-hidden border border-border bg-surface shadow-sm',
        'transition-[height,border-radius,box-shadow,background-color,border-color] duration-300 ease-out',
        compact ? 'h-[64px] rounded-2xl' : 'h-[108px] rounded-28',
      )}
    >
      <div className="absolute inset-0 flex items-center gap-3 px-3">
        <img
          src={course.coverUrl}
          alt=""
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
          className={cn(
            'shrink-0 rounded-2xl border border-border bg-surface-secondary object-cover shadow-sm transition-all duration-300',
            compact ? 'size-10 rounded-xl' : 'size-16',
          )}
        />
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={() => toast.message('Course switcher coming soon')}
            className="group flex max-w-full items-center gap-1 text-left"
          >
            <span
              className={cn(
                'truncate font-semibold text-text-primary transition-all',
                compact ? 'text-sm' : 'text-base',
              )}
            >
              {course.title}
            </span>
            <Icon icon={ChevronsUpDown} className="size-4 text-text-tertiary" />
          </button>
          {!compact ? (
            <p className="mt-0.5 truncate text-xs text-text-tertiary">{course.subtitle}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-1.5">
          <CardActionButton compact={compact} icon={BookOpen} label="Map" />
          <CardActionButton
            compact={compact}
            icon={Zap}
            label="Exercise"
            disabled
          />
          <CardActionButton compact={compact} icon={Ellipsis} label="More" iconOnly />
        </div>
      </div>
    </div>
  );
};

interface CardActionButtonProps {
  icon: typeof BookOpen;
  label: string;
  compact: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
}

const CardActionButton = ({
  icon,
  label,
  compact,
  disabled,
  iconOnly,
}: CardActionButtonProps) => (
  <button
    type="button"
    disabled={disabled}
    onClick={() => !disabled && toast.message(`${label} coming soon`)}
    className={cn(
      'flex h-9 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary',
      'gap-1.5',
      compact || iconOnly ? 'w-9 px-0' : 'px-3',
      disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
    )}
    aria-label={label}
  >
    <Icon icon={icon} />
    {!compact && !iconOnly ? (
      <span className="text-sm font-medium hidden lg:inline">{label}</span>
    ) : null}
  </button>
);
