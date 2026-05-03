import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { ChunkyButton } from '@/components/primitives/ChunkyButton';
import { Icon } from '@/components/primitives/Icon';

export const FindNextDivider = () => (
  <div className="mx-auto max-w-xl px-4 pb-8">
    <div className="my-3 flex items-center justify-center gap-2">
      <div className="h-px flex-1 bg-border" />
      <span className="text-[10px] font-medium uppercase tracking-wider text-text-tertiary">
        Recommendation
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
    <ChunkyButton
      variant="tertiary"
      size="md"
      fullWidth
      leftIcon={<Icon icon={Sparkles} className="size-4" />}
      onClick={() => toast.message('Recommendation engine coming soon')}
    >
      Find what to learn next
    </ChunkyButton>
  </div>
);
