import { useNavigate } from 'react-router-dom';
import { LessonNode } from '@/components/lessons-map/LessonNode';
import { ReviewBossNode } from '@/components/lessons-map/ReviewBossNode';
import { SectionHeaderPill } from '@/components/lessons-map/SectionHeaderPill';
import type { Course, Lesson, Section } from '@/types/course';

const SNAKE_OFFSETS = [-80, -50, -20, -50] as const;

const getOffset = (index: number) => SNAKE_OFFSETS[index % SNAKE_OFFSETS.length];

const completedCount = (section: Section) =>
  section.lessons.filter((l) => l.state === 'completed').length;

const totalNodeCount = (section: Section) => section.lessons.length + 1;

export interface SnakePathProps {
  course: Course;
}

export const SnakePath = ({ course }: SnakePathProps) => {
  const navigate = useNavigate();
  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.state === 'locked') return;
    navigate(`/lessons/${lesson.id}?page=1`);
  };

  return (
    <div className="relative mt-4">
      <div className="relative mx-auto max-w-xl">
        {course.sections.map((section) => {
          const lessonsCount = section.lessons.length;
          return (
            <div key={section.id} className="section-container mb-8">
              <SectionHeaderPill
                number={section.number}
                title={section.title}
                completed={completedCount(section)}
                total={totalNodeCount(section)}
              />
              <div className="relative py-8 space-y-5">
                {section.lessons.map((lesson, idx) => (
                  <LessonNode
                    key={lesson.id}
                    state={lesson.isAdvanced && lesson.state === 'locked' ? 'advanced' : lesson.state}
                    label={lesson.title}
                    subline={lesson.isAdvanced ? 'Advanced Lesson' : undefined}
                    offsetX={getOffset(idx)}
                    showMascot={lesson.state === 'current'}
                    scaleUp={lesson.state === 'current'}
                    onClick={() => handleLessonClick(lesson)}
                  />
                ))}
                <ReviewBossNode
                  totalSegments={section.review.totalSegments}
                  completedSegments={section.review.completedSegments}
                  offsetX={getOffset(lessonsCount)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
