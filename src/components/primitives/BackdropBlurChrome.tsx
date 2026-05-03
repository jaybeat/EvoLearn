import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface BackdropBlurChromeProps {
  side: 'top' | 'bottom';
  className?: string;
  children?: ReactNode;
}

/**
 * Layered 4-step backdrop blur stack with mask-image gradients,
 * topped with a solid surface gradient — matches the source app's
 * fixed top/bottom mobile chrome.
 */
export const BackdropBlurChrome = ({ side, className, children }: BackdropBlurChromeProps) => {
  const isTop = side === 'top';
  const direction = isTop ? 'to bottom' : 'to top';

  const layers: { blur: string; mask: string }[] = [
    {
      blur: 'backdrop-blur-[1px]',
      mask: `linear-gradient(${direction}, hsl(0 0% 0% / 1) 0%, hsl(0 0% 0% / 1) 16%, hsl(0 0% 0% / 0) 32%)`,
    },
    {
      blur: 'backdrop-blur-[2px]',
      mask: `linear-gradient(${direction}, hsl(0 0% 0% / 0) 8%, hsl(0 0% 0% / 1) 24%, hsl(0 0% 0% / 1) 40%, hsl(0 0% 0% / 0) 56%)`,
    },
    {
      blur: 'backdrop-blur-sm',
      mask: `linear-gradient(${direction}, hsl(0 0% 0% / 0) 24%, hsl(0 0% 0% / 1) 42%, hsl(0 0% 0% / 1) 58%, hsl(0 0% 0% / 0) 76%)`,
    },
    {
      blur: 'backdrop-blur',
      mask: `linear-gradient(${direction}, hsl(0 0% 0% / 0) 42%, hsl(0 0% 0% / 1) 64%, hsl(0 0% 0% / 1) 100%)`,
    },
  ];

  const overlayGradient = `linear-gradient(${direction}, hsl(var(--color-surface) / 0.95) 0%, hsl(var(--color-surface) / 0.6) 50%, hsl(var(--color-surface) / 0) 100%)`;

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 z-30',
        isTop ? 'top-0' : 'bottom-0',
        className,
      )}
      aria-hidden="true"
    >
      {layers.map((layer, idx) => (
        <div
          key={idx}
          className={cn('absolute inset-0', layer.blur)}
          style={{
            WebkitMaskImage: layer.mask,
            maskImage: layer.mask,
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: overlayGradient }}
      />
      {children ? (
        <div className="pointer-events-auto relative">{children}</div>
      ) : null}
    </div>
  );
};
