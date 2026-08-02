import { Link } from "react-router-dom";
import type { Produto } from "../types/product";
import { PlaceholderImage } from "./PlaceholderImage";
import { TipoBadge } from "./TipoBadge";

const formatoPreco = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function ProductCard({ produto }: { produto: Produto }) {
  return (
    <Link
      to={`/catalogo/${produto.slug}`}
      className="group flex flex-col gap-3 rounded-token-lg p-2 transition hover:bg-linen"
    >
      <div className="relative">
        <PlaceholderImage
          src={produto.imagens[0]}
          alt={produto.nome}
          aspect="aspect-[4/5]"
          className="transition duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute left-3 top-3">
          <TipoBadge tipo={produto.tipo} />
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-lg text-ink">{produto.nome}</h3>
        <p className="text-ink">
          {formatoPreco.format(produto.preco)}
          {produto.notaPreco && (
            <span className="ml-1 text-sm text-ink-soft">{produto.notaPreco}</span>
          )}
        </p>
        {produto.tipo === "sob_encomenda" && produto.prazoProducao && (
          <p className="text-sm text-ink-soft">Prazo: {produto.prazoProducao}</p>
        )}
        <span className="mt-2 text-sm font-semibold text-sage-700 group-hover:underline">
          Ver detalhes
        </span>
      </div>
    </Link>
  );
}
