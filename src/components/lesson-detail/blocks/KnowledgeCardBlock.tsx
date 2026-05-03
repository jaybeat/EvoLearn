export interface KnowledgeCardBlockProps {
  emoji: string;
  title: string;
  body: string;
}

export const KnowledgeCardBlock = ({ emoji, title, body }: KnowledgeCardBlockProps) => (
  <div className="w-full max-w-2xl rounded-2xl border border-border bg-surface-secondary p-5">
    <div className="flex items-center gap-3">
      <span className="text-3xl">{emoji}</span>
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
    </div>
    <p className="mt-3 leading-relaxed text-text-secondary">{body}</p>
  </div>
);
