import type { SourceMaterial } from '@/types/course';

export interface SourceCardProps {
  source: SourceMaterial;
}

export const SourceCard = ({ source }: SourceCardProps) => (
  <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface-secondary px-3 py-3">
    <img
      src={source.coverUrl}
      alt=""
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = 'none';
      }}
      className="size-16 shrink-0 rounded-xl border border-border bg-surface object-cover shadow-sm"
    />
    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
        Source
      </p>
      <p className="truncate text-sm font-semibold text-text-primary">{source.title}</p>
      <p className="truncate text-xs text-text-tertiary">by {source.author}</p>
    </div>
  </div>
);
