import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ChunkyButton } from '@/components/primitives/ChunkyButton';
import { Icon } from '@/components/primitives/Icon';
import { AccordionSection } from '@/components/outline/AccordionSection';
import { LessonAccordionItem } from '@/components/outline/LessonAccordionItem';
import { SourceCard } from '@/components/outline/SourceCard';
import { StatPills } from '@/components/outline/StatPills';
import { findCourse } from '@/lib/courses';

export const CourseOutline = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const course = findCourse(id) ?? findCourse('learning-how-to-learn')!;
  const isDraft = !id;

  const handleCreate = () => {
    toast.success('Course created');
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className="theme-v2 inter-font min-h-screen bg-surface">
      <header className="sticky top-0 z-30 border-b border-border bg-surface/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex size-10 items-center justify-center rounded-full text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
            aria-label="Back"
          >
            <Icon icon={ChevronLeft} className="size-6" />
          </button>
          <h1 className="text-base font-semibold text-text-primary">Course outline</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-5 pb-32 space-y-6">
        <SourceCard source={course.source} />

        <div>
          <h2 className="young-serif-font text-3xl md:text-4xl text-text-primary">
            {course.title}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">{course.subtitle}</p>
        </div>

        <StatPills course={course} />

        <div className="space-y-3">
          {course.sections.map((section, idx) => (
            <AccordionSection
              key={section.id}
              number={section.number}
              title={section.title}
              defaultOpen={idx === 0 || idx === course.sections.length - 1}
            >
              {section.lessons.map((lesson) => (
                <LessonAccordionItem
                  key={lesson.id}
                  lesson={lesson}
                  showHookingQuestion={idx === 0}
                />
              ))}
            </AccordionSection>
          ))}
        </div>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/85 backdrop-blur-md safe-area-bottom">
        <div className="mx-auto flex max-w-3xl gap-3 px-4 py-3">
          <ChunkyButton
            variant="tertiary"
            size="lg"
            fullWidth
            onClick={() => toast.message('Request changes flow coming soon')}
          >
            Request Changes
          </ChunkyButton>
          <ChunkyButton variant="brand" size="lg" fullWidth onClick={handleCreate}>
            {isDraft ? 'Create Course' : 'Save Course'}
          </ChunkyButton>
        </div>
      </footer>
    </div>
  );
};

export default CourseOutline;
