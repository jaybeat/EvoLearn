import { BackdropBlurChrome } from '@/components/primitives/BackdropBlurChrome';
import { StreakPill } from '@/components/chrome/StreakPill';
import { seedUser } from '@/data/seed-user';

export interface MobileTopNavProps {
  brand?: string;
}

export const MobileTopNav = ({ brand = 'EvoLearn' }: MobileTopNavProps) => (
  <header className="md:hidden fixed inset-x-0 top-0 z-40 h-[64px] safe-area-top">
    <BackdropBlurChrome side="top" className="h-[80px]" />
    <div className="relative z-40 flex h-full items-center justify-between px-4 pt-1">
      <span className="figtree-font truncate text-2xl font-semibold text-text-primary">
        {brand}
      </span>
      <StreakPill current={seedUser.streak.current} goal={seedUser.streak.goal} />
    </div>
  </header>
);
