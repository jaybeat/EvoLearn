import {
  ChevronDown,
  House,
  Library,
  Sparkles,
  User,
  WandSparkles,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/primitives/Icon';
import { StreakPill } from '@/components/chrome/StreakPill';
import { seedUser } from '@/data/seed-user';
import { cn } from '@/lib/cn';

const items = [
  { id: 'home', label: 'Home', icon: House, sub: '首页' },
  { id: 'create', label: 'Create', icon: Sparkles, sub: '创建' },
  { id: 'courses', label: 'Courses', icon: Library, sub: '课程' },
  { id: 'profile', label: 'Profile', icon: User, sub: '我的' },
] as const;

type ItemId = (typeof items)[number]['id'];

export const DesktopSidebar = () => {
  const [active, setActive] = useState<ItemId>('home');

  const handleClick = (id: ItemId) => {
    setActive(id);
    if (id !== 'home') toast.message('Coming soon');
  };

  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 z-30 w-64 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2 px-5 pt-6 pb-4">
        <img src="/star.svg" alt="" className="size-8" />
        <span className="figtree-font text-2xl font-semibold tracking-tight text-text-primary">
          EvoLearn
        </span>
      </div>

      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleClick(item.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-surface-secondary text-text-primary shadow-sm'
                      : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                  )}
                >
                  <Icon icon={item.icon} className="size-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <span className="text-xs text-text-tertiary">{item.sub}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border px-4 py-4 space-y-3">
        <StreakPill
          current={seedUser.streak.current}
          goal={seedUser.streak.goal}
          className="w-full justify-center"
        />
        <button
          type="button"
          onClick={() => toast.message('Upgrade flow coming soon')}
          className="flex w-full items-center gap-2 rounded-xl border border-brand/30 bg-brand-bg px-3 py-2 text-sm font-medium text-brand-text hover:bg-brand-bg/70 transition-colors"
        >
          <Icon icon={WandSparkles} className="size-4" />
          <span className="flex-1 text-left">Upgrade</span>
          <span className="text-xs text-text-tertiary">Early-bird</span>
        </button>
        <button
          type="button"
          onClick={() => toast.message('Profile coming soon')}
          className="flex w-full items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-surface-hover transition-colors"
        >
          <span
            className="flex size-8 items-center justify-center rounded-full text-sm font-semibold text-white"
            style={{ background: 'hsl(150 40% 55%)' }}
          >
            {seedUser.initial}
          </span>
          <span className="flex-1 truncate text-left text-sm font-medium text-text-primary">
            {seedUser.displayName}
          </span>
          <Icon icon={ChevronDown} className="size-4 text-text-tertiary" />
        </button>
      </div>
    </aside>
  );
};
