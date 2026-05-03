import { House, Library, Sparkles, User } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { BackdropBlurChrome } from '@/components/primitives/BackdropBlurChrome';
import { Icon } from '@/components/primitives/Icon';
import { cn } from '@/lib/cn';

const items = [
  { id: 'home', label: '首页', icon: House },
  { id: 'create', label: '创建', icon: Sparkles },
  { id: 'courses', label: '课程', icon: Library },
  { id: 'profile', label: '我的', icon: User },
] as const;

type ItemId = (typeof items)[number]['id'];

export const MobileBottomNav = () => {
  const [active, setActive] = useState<ItemId>('home');
  const activeIndex = useMemo(
    () => items.findIndex((i) => i.id === active),
    [active],
  );

  const handleClick = (id: ItemId) => {
    setActive(id);
    if (id !== 'home') toast.message('Coming soon');
  };

  const handleMascot = () => {
    toast.message('AI Chat coming soon');
  };

  return (
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-40 h-[88px] safe-area-bottom">
      <BackdropBlurChrome side="bottom" className="h-[100px]" />
      <div className="relative z-40 flex h-[64px] items-stretch gap-3 px-4">
        <div className="relative flex flex-1 items-stretch rounded-full border border-surface-tertiary bg-surface/90 p-1.5 backdrop-blur-sm">
          <div
            className="absolute inset-y-1.5 rounded-full bg-surface-secondary transition-transform duration-300 ease-out"
            style={{
              width: `calc((100% - 12px) / ${items.length})`,
              transform: `translateX(calc(${activeIndex} * 100%))`,
              left: '6px',
            }}
            aria-hidden="true"
          />
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleClick(item.id)}
                className={cn(
                  'relative z-10 flex flex-1 items-center justify-center rounded-full transition-colors',
                  isActive ? 'text-text-primary' : 'text-text-tertiary',
                )}
                aria-label={item.label}
              >
                <Icon icon={item.icon} className="size-5" />
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={handleMascot}
          className="flex size-14 items-center justify-center rounded-full border border-surface-tertiary bg-surface/90 backdrop-blur-sm shadow-sm transition-transform hover:scale-105 active:scale-95"
          aria-label="AI Chat"
        >
          <img src="/star.svg" alt="" className="size-8" />
        </button>
      </div>
    </nav>
  );
};
