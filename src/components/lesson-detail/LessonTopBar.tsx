import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/primitives/Icon';
import { PaginationDots } from '@/components/lesson-detail/PaginationDots';

export interface LessonTopBarProps {
  totalPages: number;
  currentPage: number;
  onClose?: () => void;
}

export const LessonTopBar = ({
  totalPages,
  currentPage,
  onClose,
}: LessonTopBarProps) => {
  const navigate = useNavigate();
  const handleClose = onClose ?? (() => navigate(-1));
  return (
    <header className="fixed inset-x-0 top-0 z-30 safe-area-top">
      <div className="grid h-[64px] grid-cols-[44px_1fr_44px] items-center px-3 bg-surface/85 backdrop-blur-md border-b border-border/60">
        <button
          type="button"
          onClick={handleClose}
          className="flex size-11 items-center justify-center rounded-full text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
          aria-label="Close lesson"
        >
          <Icon icon={X} className="size-6" />
        </button>
        <div className="flex justify-center">
          <PaginationDots count={totalPages} current={currentPage} />
        </div>
        <div aria-hidden="true" />
      </div>
    </header>
  );
};
