import { useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { LessonHero } from '@/components/lesson-detail/LessonHero';
import { LessonNavFooter } from '@/components/lesson-detail/LessonNavFooter';
import { LessonTopBar } from '@/components/lesson-detail/LessonTopBar';
import { renderIllustration } from '@/illustrations';
import { seedCourse } from '@/data/seed-course';
import type { Lesson } from '@/types/course';

const findLesson = (lessonId: string | undefined): Lesson | undefined => {
  if (!lessonId) return undefined;
  for (const section of seedCourse.sections) {
    const found = section.lessons.find((l) => l.id === lessonId);
    if (found) return found;
  }
  return undefined;
};

export const LessonDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [params, setParams] = useSearchParams();

  const lesson = useMemo(() => findLesson(id), [id]);
  const totalPages = lesson?.content.length ?? 1;
  const pageParam = Number(params.get('page')) || 1;
  const page = Math.min(Math.max(pageParam, 1), totalPages);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  if (!lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p className="text-text-secondary">Lesson not found</p>
      </div>
    );
  }

  const content = lesson.content[page - 1];

  const setPage = (next: number) => {
    setParams({ page: String(next) });
  };

  const onBack = () => setPage(Math.max(1, page - 1));
  const onNext = () => {
    if (page < totalPages) setPage(page + 1);
    else navigate(`/courses/${seedCourse.id}/lessons`);
  };

  return (
    <div
      className="theme-v2 inter-font min-h-screen flex flex-col"
      style={{ backgroundColor: '#FFFCF0' }}
    >
      <LessonTopBar totalPages={totalPages} currentPage={page} />

      <main className="flex-1 px-4 pt-[88px] pb-[120px]">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 py-6">
          <LessonHero question={content.question} subtitle={content.subtitle} />
          {content.illustrationKey ? (
            <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border/60">
              {renderIllustration(content.illustrationKey)}
            </div>
          ) : null}
        </div>
      </main>

      <LessonNavFooter
        page={page}
        totalPages={totalPages}
        onBack={onBack}
        onNext={onNext}
      />
    </div>
  );
};

export default LessonDetail;
