export interface ReflectionBlockProps {
  prompt: string;
  sampleAnswer?: string;
  value?: string;
  isRevealed?: boolean;
  onChange?: (value: string) => void;
}

export const ReflectionBlock = ({
  prompt,
  sampleAnswer,
  value = '',
  isRevealed,
  onChange,
}: ReflectionBlockProps) => {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <h2 className="text-2xl font-semibold text-text-primary">{prompt}</h2>
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="写下你的想法..."
        className="min-h-[120px] w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand/50"
      />
      {isRevealed && sampleAnswer && (
        <div className="rounded-xl bg-surface-secondary p-4">
          <p className="font-medium text-text-primary">示例答案</p>
          <p className="mt-1 text-text-secondary">{sampleAnswer}</p>
        </div>
      )}
    </div>
  );
};
