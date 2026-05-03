import type { Lesson } from '@/types/course';
import { cn } from '@/lib/cn';

export interface LessonAccordionItemProps {
  lesson: Lesson;
  showHookingQuestion?: boolean;
}

export const LessonAccordionItem = ({
  lesson,
  showHookingQuestion = true,
}: LessonAccordionItemProps) => (
  <div className="rounded-xl border border-border bg-surface px-3 py-2.5">
    <div className="flex items-baseline gap-2">
      <span className="rubik-font text-xs font-semibold text-text-tertiary">
        {lesson.number}
      </span>
      <span className="flex-1 text-sm font-semibold text-text-primary">
        {lesson.title}
      </span>
      {lesson.isAdvanced ? (
        <span className="rounded-md bg-brand-bg px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-brand-text">
          Advanced
        </span>
      ) : null}
    </div>
    {showHookingQuestion && lesson.hookingQuestion ? (
      <p className={cn('mt-1 text-xs leading-relaxed text-text-secondary')}>
        {lesson.hookingQuestion}
      </p>
    ) : null}
  </div>
);
