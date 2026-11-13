import { Link } from "react-router-dom";
import type { Produto } from "../types/product";
import { PlaceholderImage } from "./PlaceholderImage";
import { TipoBadge } from "./TipoBadge";
import { formatoPreco } from "../lib/preco";

export function ProductCard({ produto }: { produto: Produto }) {
  return (
    <Link
      to={`/catalogo/${produto.slug}`}
      className="group flex flex-col gap-3 rounded-token-lg p-1 transition hover:bg-linen sm:p-2"
    >
      <div className="relative">
        <PlaceholderImage
          src={produto.imagens[0]}
          alt={produto.nome}
          aspect="aspect-[4/5]"
          className={`transition duration-300 group-hover:scale-[1.02] ${produto.vendido ? "opacity-60 grayscale" : ""}`}
        />
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
          <TipoBadge tipo={produto.tipo} vendido={produto.vendido} />
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-base text-ink sm:text-lg">{produto.nome}</h3>
        <p className="text-ink">
          {formatoPreco.format(produto.preco)}
          {produto.notaPreco && (
            <span className="ml-1 text-sm text-ink-soft">{produto.notaPreco}</span>
          )}
        </p>
        {produto.tipo === "sob_encomenda" && produto.prazoProducao && (
          <p className="text-sm text-ink-soft">Prazo: {produto.prazoProducao}</p>
        )}
        <span className="mt-2 text-sm font-semibold text-wine-700 group-hover:underline">
          Ver detalhes
        </span>
      </div>
    </Link>
  );
}
