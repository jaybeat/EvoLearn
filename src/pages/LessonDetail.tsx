import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LessonBlockRenderer } from '@/components/lesson-detail/LessonBlockRenderer';
import { LessonNavFooter } from '@/components/lesson-detail/LessonNavFooter';
import { LessonTopBar } from '@/components/lesson-detail/LessonTopBar';
import { useLessonPageState } from '@/hooks/useLessonPageState';
import { isPageComplete, hasInteractiveBlocks, canAdvance } from '@/lib/lesson/blocks';
import { seedCourse } from '@/data/seed-course';
import type { Lesson } from '@/types/course';
import type { FooterMode } from '@/components/lesson-detail/LessonNavFooter';

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

  const { state: pageState, setState: setPageState, update: updateBlockState, reset: resetPageState } =
    useLessonPageState();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  useEffect(() => {
    resetPageState();
    setSubmitted(false);
  }, [page, resetPageState]);

  if (!lesson) {
    return (
      <div className="theme-v2 inter-font flex min-h-screen items-center justify-center bg-surface">
        <p className="text-text-secondary">课程未找到</p>
      </div>
    );
  }

  const content = lesson.content[page - 1];

  const setPage = (next: number) => {
    setParams({ page: String(next) });
  };

  const onBack = () => setPage(Math.max(1, page - 1));

  const pageComplete = isPageComplete(content.blocks, pageState);
  const interactive = hasInteractiveBlocks(content.blocks);
  const advance = canAdvance(content.blocks, submitted);

  const getMode = (): FooterMode => {
    if (!advance) return 'submit';
    if (!pageComplete) return 'continue';
    if (page >= totalPages) return 'finish';
    return 'next';
  };

  const handlePrimaryAction = () => {
    if (!advance && interactive) {
      // 首次提交：验证所有交互块
      const next: typeof pageState = { ...pageState };
      content.blocks.forEach((block) => {
        if (block.type === 'multipleChoice') {
          const s = next[block.id] ?? {};
          const correct = s.selectedIndex === block.correctIndex;
          next[block.id] = { ...s, isRevealed: true, isCorrect: correct };
        } else if (block.type === 'reflection') {
          const s = next[block.id] ?? {};
          if (!s.value || s.value.trim().length === 0) {
            toast('请先写下你的想法');
            return;
          }
          next[block.id] = { ...s, isRevealed: true };
        }
      });
      setPageState(next);
      setSubmitted(true);
      return;
    }

    // 已提交或无非交互块，执行翻页
    if (page < totalPages) setPage(page + 1);
    else navigate(`/courses/${seedCourse.id}/lessons`);
  };

  return (
    <div className="theme-v2 inter-font flex min-h-screen flex-col bg-surface">
      <LessonTopBar
        totalPages={totalPages}
        currentPage={page}
        onClose={() => navigate(`/courses/${seedCourse.id}/lessons`)}
      />

      <main className="flex-1 px-4 pb-[120px] pt-[88px]">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 py-6">
          {content.blocks.map((block) => (
            <LessonBlockRenderer
              key={block.id}
              block={block}
              interactionState={pageState[block.id]}
              onInteract={(blockId, payload) => updateBlockState(blockId, payload)}
            />
          ))}
        </div>
      </main>

      <LessonNavFooter
        page={page}
        onBack={onBack}
        onNext={handlePrimaryAction}
        mode={getMode()}
        disabled={false}
      />
    </div>
  );
};

export default LessonDetail;
