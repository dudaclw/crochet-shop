import { useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { TipoBadge } from "../components/TipoBadge";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { useProdutos } from "../lib/useProdutos";
import { Carregando } from "../components/Carregando";
import { config } from "../data/config";
import { formatoPreco } from "../lib/preco";
import type { Produto } from "../types/product";

function BlocoInfo({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-t border-line py-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">{titulo}</h2>
      <div className="text-ink">{children}</div>
    </div>
  );
}

function Galeria({ produto }: { produto: Produto }) {
  const [atual, setAtual] = useState(0);
  const trilho = useRef<HTMLDivElement>(null);
  const imagens = produto.imagens;

  // Fotos lado a lado com scroll-snap: no celular troca deslizando o dedo; as miniaturas rolam até a foto.
  return (
    <div className="flex flex-col gap-3">
      <div
        ref={trilho}
        onScroll={(e) => setAtual(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-token-lg [scrollbar-width:none]"
      >
        {imagens.map((src, i) => (
          <PlaceholderImage
            key={src}
            src={src}
            alt={imagens.length > 1 ? `${produto.nome} — foto ${i + 1} de ${imagens.length}` : produto.nome}
            aspect="aspect-[4/5]"
            loading={i === 0 ? "eager" : "lazy"}
            className="w-full shrink-0 snap-center"
          />
        ))}
      </div>
      {imagens.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {imagens.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() =>
                trilho.current?.scrollTo({ left: i * trilho.current.clientWidth, behavior: "smooth" })
              }
              aria-label={`Ver foto ${i + 1} de ${imagens.length}`}
              aria-current={i === atual}
              className={`h-20 w-16 shrink-0 overflow-hidden rounded-token-sm ring-2 transition ${
                i === atual ? "ring-wine-700" : "ring-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProdutoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const { produtos, erro, recarregar } = useProdutos();

  if (!produtos) return <Carregando erro={erro} tentarDeNovo={recarregar} />;

  const produto = produtos.find((item) => item.slug === slug);

  if (!produto) {
    return <Navigate to="/catalogo" replace />;
  }

  const ehSobEncomenda = produto.tipo === "sob_encomenda";

  return (
    <div className="min-h-[calc(100svh-100px)] bg-cream md:py-10">
      <title>{`${produto.nome} — ${config.nomeAtelie}`}</title>
      <div className="mx-auto flex max-w-5xl flex-col gap-6 bg-cream px-5 py-6 md:flex-row md:gap-12 md:rounded-token-lg md:py-8 md:shadow-token-soft">
        <div className="flex flex-col gap-4 md:flex-1">
          <Link
            to="/catalogo"
            className="w-fit text-sm font-semibold text-ink-soft hover:text-wine-700"
          >
            ← Voltar ao catálogo
          </Link>
          {/* key: volta pra 1ª foto ao trocar de produto */}
          <Galeria key={produto.id} produto={produto} />
        </div>

        <div className="flex flex-col gap-4 md:flex-1">
          <TipoBadge tipo={produto.tipo} vendido={produto.vendido} />
          <h1 className="text-3xl text-ink">{produto.nome}</h1>
          <p className="text-2xl text-ink">
            {formatoPreco.format(produto.preco)}
            {produto.notaPreco && (
              <span className="ml-2 text-base text-ink-soft">{produto.notaPreco}</span>
            )}
          </p>
          <p className="text-ink-soft">{produto.descricaoCurta}</p>

          <BlocoInfo titulo="Materiais">{produto.materiais}</BlocoInfo>

          {ehSobEncomenda ? (
            <>
              {produto.personalizavelEm && (
                <BlocoInfo titulo="Como personalizar">
                  <ul className="flex list-inside list-disc flex-col gap-1">
                    {produto.personalizavelEm.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </BlocoInfo>
              )}
              {produto.prazoProducao && (
                <BlocoInfo titulo="Prazo estimado">{produto.prazoProducao}</BlocoInfo>
              )}
            </>
          ) : (
            <>
              {produto.tamanho && <BlocoInfo titulo="Tamanho">{produto.tamanho}</BlocoInfo>}
              {produto.cuidados && <BlocoInfo titulo="Cuidados">{produto.cuidados}</BlocoInfo>}
            </>
          )}

          {/* no celular o botão de contato fica preso ao pé da tela enquanto se lê a peça */}
          <div className="sticky bottom-0 -mx-5 mt-2 border-t border-line bg-cream/95 px-5 py-3 backdrop-blur md:static md:mx-0 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
            <WhatsAppButton produto={produto} className="w-full md:w-fit" />
          </div>
        </div>
      </div>
    </div>
  );
}
