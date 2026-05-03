import { ChevronDown } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/primitives/Icon';

export interface AccordionSectionProps {
  number: number;
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export const AccordionSection = ({
  number,
  title,
  defaultOpen = true,
  children,
}: AccordionSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface-secondary">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-surface-hover"
      >
        <h3 className="text-base font-semibold text-text-primary">
          {number}. {title}
        </h3>
        <Icon
          icon={ChevronDown}
          className={cn(
            'size-5 text-text-secondary transition-transform duration-200',
            open ? 'rotate-180' : 'rotate-0',
          )}
        />
      </button>
      {open ? (
        <div className="px-4 pb-3 pt-1 space-y-2 border-t border-border/60">{children}</div>
      ) : null}
    </section>
  );
};
