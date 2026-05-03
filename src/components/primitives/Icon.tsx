import type { LucideIcon, LucideProps } from 'lucide-react';
import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

export interface IconProps extends LucideProps {
  icon: LucideIcon;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComp, className, strokeWidth = 2, ...props }, ref) => (
    <IconComp
      ref={ref}
      strokeWidth={strokeWidth}
      className={cn('size-5 shrink-0', className)}
      aria-hidden="true"
      {...props}
    />
  ),
);
Icon.displayName = 'Icon';
