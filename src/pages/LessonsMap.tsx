import { CourseHeaderCard } from '@/components/lessons-map/CourseHeaderCard';
import { FindNextDivider } from '@/components/lessons-map/FindNextDivider';
import { SnakePath } from '@/components/lessons-map/SnakePath';
import { DesktopSidebar } from '@/components/chrome/DesktopSidebar';
import { MobileBottomNav } from '@/components/chrome/MobileBottomNav';
import { MobileTopNav } from '@/components/chrome/MobileTopNav';
import { Mascot } from '@/components/lessons-map/Mascot';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { findCourse } from '@/lib/courses';

export const LessonsMap = () => {
  const { id } = useParams<{ id: string }>();
  const course = findCourse(id) ?? findCourse('learning-how-to-learn')!;

  return (
    <div className="theme-v2 inter-font min-h-screen bg-surface">
      <DesktopSidebar />
      <MobileTopNav />

      <main className="md:pl-64">
        <div className="mx-auto max-w-2xl px-4 pt-[80px] pb-32 md:pt-6 md:pb-12">
          <CourseHeaderCard course={course} />
          <SnakePath course={course} />
          <FindNextDivider />
        </div>
      </main>

      <MobileBottomNav />

      <button
        type="button"
        onClick={() => toast.message('AI Chat coming soon')}
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center justify-center size-12 rounded-full bg-surface shadow-lg ring-1 ring-border/50 backdrop-blur-sm hover:scale-105 active:scale-95 transition-transform"
        aria-label="AI Chat"
      >
        <Mascot size={32} />
      </button>
    </div>
  );
};

export default LessonsMap;
