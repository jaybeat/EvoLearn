export interface CoverHeroImageProps {
  src: string;
  alt?: string;
}

export const CoverHeroImage = ({ src, alt = '' }: CoverHeroImageProps) => (
  <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary shadow-sm">
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      onError={(e) => {
        const t = e.currentTarget as HTMLImageElement;
        t.style.display = 'none';
        const parent = t.parentElement;
        if (parent && !parent.querySelector('.cover-fallback')) {
          const fb = document.createElement('div');
          fb.className =
            'cover-fallback flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/30 to-streak-soft/30 text-text-tertiary text-sm';
          fb.textContent = 'Course cover';
          parent.appendChild(fb);
        }
      }}
    />
  </div>
);
