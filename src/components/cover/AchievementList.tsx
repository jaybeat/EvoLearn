import type { Achievement } from '@/types/course';

export interface AchievementListProps {
  items: Achievement[];
}

export const AchievementList = ({ items }: AchievementListProps) => (
  <ul className="space-y-3">
    {items.map((item) => (
      <li key={item.title} className="flex gap-3">
        <span
          className="mt-2 size-2 shrink-0 rounded-full bg-brand"
          aria-hidden="true"
        />
        <p className="text-sm leading-relaxed text-text-secondary">
          <span className="font-semibold text-text-primary">{item.title}</span>
          {item.body ? (
            <span className="ml-1 text-text-secondary">{item.body}</span>
          ) : null}
        </p>
      </li>
    ))}
  </ul>
);
