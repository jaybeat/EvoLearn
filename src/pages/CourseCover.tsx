import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChunkyButton } from '@/components/primitives/ChunkyButton';
import { Icon } from '@/components/primitives/Icon';
import { AchievementList } from '@/components/cover/AchievementList';
import { CoverHeroImage } from '@/components/cover/CoverHeroImage';
import { seedCourse } from '@/data/seed-course';

export const CourseCover = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const course = seedCourse;
  const courseId = id ?? course.id;

  return (
    <div className="theme-v2 inter-font min-h-screen bg-surface">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-surface/85 backdrop-blur-md safe-area-top">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex size-10 items-center justify-center rounded-full text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
            aria-label="Back"
          >
            <Icon icon={ChevronLeft} className="size-6" />
          </button>
          <h1 className="young-serif-font truncate text-2xl text-text-primary">
            {course.title}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 pb-40 space-y-6">
        <p className="text-base leading-relaxed text-text-secondary">
          {course.description}
        </p>

        <CoverHeroImage src={course.coverUrl} alt={course.title} />

        <section className="space-y-3">
          <h2 className="young-serif-font text-2xl text-text-primary">
            What you will achieve
          </h2>
          <AchievementList items={course.achievements} />
        </section>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-border/60 bg-surface/85 backdrop-blur-md safe-area-bottom">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 px-4 py-3 sm:flex-row">
          <ChunkyButton
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => navigate(`/courses/${courseId}/lessons`)}
          >
            View learning map
          </ChunkyButton>
          <ChunkyButton
            variant="brand"
            size="lg"
            fullWidth
            onClick={() => navigate(`/courses/${courseId}/lessons`)}
          >
            Go to your course
          </ChunkyButton>
        </div>
      </footer>
    </div>
  );
};

export default CourseCover;
