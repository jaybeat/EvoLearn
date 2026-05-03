import { cn } from '@/lib/cn';

export interface MascotProps {
  size?: number;
  withHalo?: boolean;
  className?: string;
}

export const Mascot = ({ size = 64, withHalo = false, className }: MascotProps) => {
  const px = `${size}px`;
  return (
    <span
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: px, height: px }}
    >
      {withHalo ? (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-brand opacity-20 animate-ping"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-brand animate-pulse-wiggle group-hover:opacity-0 group-active:opacity-0 transition-opacity duration-150"
          />
        </>
      ) : null}
      <img
        src="/star.svg"
        alt=""
        className="relative animate-wiggle"
        style={{ width: '88%', height: '88%' }}
      />
    </span>
  );
};
