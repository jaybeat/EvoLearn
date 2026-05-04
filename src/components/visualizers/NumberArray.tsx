import { cn } from '@/lib/cn';
import type { ArrayVisualizerState, TreeVisualizerState } from '@/types/lesson-blocks';

interface NumberArrayProps {
  state: ArrayVisualizerState | TreeVisualizerState;
}

function isArrayState(state: ArrayVisualizerState | TreeVisualizerState): state is ArrayVisualizerState {
  return 'items' in state;
}

export function NumberArray({ state }: NumberArrayProps) {
  if (!isArrayState(state)) return null;
  const { items, counter } = state;

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              'relative flex h-12 w-12 items-center justify-center rounded-xl border-2 text-lg font-bold transition-all duration-500 ease-out',
              item.status === 'normal' && 'border-border bg-surface text-text-primary',
              item.status === 'highlighted' && 'border-brand bg-brand text-white shadow-lg scale-110',
              item.status === 'excluded' && 'border-border/30 bg-surface/50 text-text-tertiary opacity-40 grayscale scale-95',
              item.status === 'inserting' && 'border-green-500 bg-green-500 text-white shadow-lg scale-110',
              item.status === 'removing' && 'border-red-400 bg-red-400 text-white opacity-60 scale-90',
            )}
          >
            {item.value}
            {item.label ? (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded bg-text-secondary px-1.5 py-0.5 text-[10px] font-medium text-white">
                {item.label}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      {counter ? (
        <div className="text-center text-sm font-medium text-text-secondary">
          {counter.label}: <span className="text-brand font-bold">{counter.value}</span>
        </div>
      ) : null}
    </div>
  );
}
