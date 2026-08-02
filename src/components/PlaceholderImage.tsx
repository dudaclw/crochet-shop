interface PlaceholderImageProps {
  src: string;
  alt: string;
  /** classe Tailwind de aspect-ratio, ex: "aspect-[4/5]" — mantém a proporção
   * esperada da foto real e evita "pulo" de layout na troca futura (RF-23) */
  aspect?: string;
  className?: string;
}

export function PlaceholderImage({
  src,
  alt,
  aspect = "aspect-[4/5]",
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      className={`overflow-hidden rounded-token-lg bg-linen ${aspect} ${className}`}
    >
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
    </div>
  );
}
