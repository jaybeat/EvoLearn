export interface HeroBlockProps {
  title: string;
  subtitle: string;
}

export const HeroBlock = ({ title, subtitle }: HeroBlockProps) => (
  <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
    <h1 className="young-serif-font text-4xl leading-[1.05] tracking-tight text-text-primary md:text-6xl">
      {title}
    </h1>
    <div className="my-6 h-px w-24 bg-border md:my-8" aria-hidden="true" />
    <p className="text-xl font-medium text-text-secondary md:text-2xl">{subtitle}</p>
  </div>
);
