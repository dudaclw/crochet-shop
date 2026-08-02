import { Link, Navigate, useParams } from "react-router-dom";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { TipoBadge } from "../components/TipoBadge";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { produtos } from "../data/produtos";

const formatoPreco = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function BlocoInfo({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-t border-line py-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">{titulo}</h2>
      <div className="text-ink">{children}</div>
    </div>
  );
}

export function ProdutoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const produto = produtos.find((item) => item.slug === slug);

  if (!produto) {
    return <Navigate to="/catalogo" replace />;
  }

  const ehSobEncomenda = produto.tipo === "sob_encomenda";

  return (
    <div className="min-h-[calc(100svh-73px)] bg-cream md:py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 bg-cream px-5 py-6 md:flex-row md:gap-12 md:rounded-token-lg md:py-8 md:shadow-token-soft">
        <div className="flex flex-col gap-4 md:flex-1">
          <Link
            to="/catalogo"
            className="w-fit text-sm font-semibold text-ink-soft hover:text-wine-700"
          >
            ← Voltar ao catálogo
          </Link>
          <PlaceholderImage
            src={produto.imagens[0]}
            alt={produto.nome}
            aspect="aspect-[4/5]"
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-1">
          <TipoBadge tipo={produto.tipo} />
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
                  <ul className="flex flex-col gap-1">
                    {produto.personalizavelEm.map((item) => (
                      <li key={item}>• {item}</li>
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

          <WhatsAppButton produto={produto} className="mt-2 w-full md:w-fit" />
        </div>
      </div>
    </div>
  );
}
