import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ChunkyVariant = 'brand' | 'secondary' | 'tertiary';

export interface ChunkyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChunkyVariant;
  size?: 'sm' | 'md' | 'lg';
  uppercase?: boolean;
  asChild?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-xl border font-medium transition-all duration-150 ease-out hover:-translate-y-0.5 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:active:translate-y-0';

const variantStyles: Record<ChunkyVariant, string> = {
  brand: cn(
    'bg-brand text-white border-brand-active',
    'shadow-[0_4px_0_0_hsl(var(--color-brand-primary-hover)),0_5px_0_0_hsl(var(--color-brand-primary-active))]',
    'hover:shadow-[0_6px_0_0_hsl(var(--color-brand-primary-hover)),0_7px_0_0_hsl(var(--color-brand-primary-active))]',
  ),
  secondary: cn(
    'bg-button-secondary text-button-secondary-foreground border-button-secondary-border',
    'shadow-[0_4px_0_0_hsl(var(--color-button-secondary-hover)),0_5px_0_0_hsl(var(--color-button-secondary-active))]',
    'hover:shadow-[0_6px_0_0_hsl(var(--color-button-secondary-hover)),0_7px_0_0_hsl(var(--color-button-secondary-active))]',
  ),
  tertiary: cn(
    'bg-button-tertiary text-button-tertiary-foreground border-button-tertiary-border',
    'shadow-[0_4px_0_0_hsl(var(--color-button-tertiary-shadow)),0_5px_0_0_hsl(var(--color-button-tertiary-shadow-active))]',
    'hover:shadow-[0_6px_0_0_hsl(var(--color-button-tertiary-shadow)),0_7px_0_0_hsl(var(--color-button-tertiary-shadow-active))]',
  ),
};

const sizeStyles: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-11 px-4 text-sm',
  lg: 'h-14 px-6 text-base',
};

export const ChunkyButton = forwardRef<HTMLButtonElement, ChunkyButtonProps>(
  (
    {
      className,
      variant = 'brand',
      size = 'md',
      uppercase = true,
      asChild = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      type,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref as never}
        type={asChild ? undefined : type ?? 'button'}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          uppercase && 'share-tech-mono-font uppercase tracking-wider',
          !uppercase && 'figtree-font',
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {leftIcon ? <span className="inline-flex shrink-0">{leftIcon}</span> : null}
        <span className="truncate">{children}</span>
        {rightIcon ? <span className="inline-flex shrink-0">{rightIcon}</span> : null}
      </Comp>
    );
  },
);
ChunkyButton.displayName = 'ChunkyButton';
