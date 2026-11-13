interface PlaceholderImageProps {
  src: string;
  alt: string;
  /** classe Tailwind de aspect-ratio, ex: "aspect-[4/5]" — mantém a proporção
   * esperada da foto real e evita "pulo" de layout na troca futura (RF-23) */
  aspect?: string;
  className?: string;
  /** "eager" para a imagem principal da tela (a maior acima da dobra) */
  loading?: "lazy" | "eager";
}

export function PlaceholderImage({
  src,
  alt,
  aspect = "aspect-[4/5]",
  className = "",
  loading = "lazy",
}: PlaceholderImageProps) {
  return (
    <div
      className={`overflow-hidden rounded-token-lg bg-linen ${aspect} ${className}`}
    >
      <img src={src} alt={alt} loading={loading} decoding="async" className="h-full w-full object-cover" />
    </div>
  );
}
