import { cn } from '@/lib/cn';

export interface TextBlockProps {
  body: string;
  variant?: 'default' | 'callout' | 'tip';
}

const variantStyles = {
  default: 'text-text-secondary',
  callout: 'border-l-4 border-brand bg-brand/10 px-4 py-3 text-text-primary rounded-r-xl',
  tip: 'border border-border bg-surface-secondary px-4 py-3 text-text-secondary rounded-xl',
};

export const TextBlock = ({ body, variant = 'default' }: TextBlockProps) => (
  <p className={cn('w-full max-w-2xl text-lg leading-relaxed', variantStyles[variant])}>{body}</p>
);
