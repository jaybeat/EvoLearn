export interface LessonHeroProps {
  question: string;
  subtitle: string;
}

export const LessonHero = ({ question, subtitle }: LessonHeroProps) => (
  <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
    <h1 className="young-serif-font text-4xl md:text-6xl leading-[1.05] tracking-tight text-text-primary">
      {question}
    </h1>
    <div className="my-6 h-px w-24 bg-border md:my-8" aria-hidden="true" />
    <p className="text-xl md:text-2xl font-medium text-text-secondary">{subtitle}</p>
  </div>
);
