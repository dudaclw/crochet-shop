import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { useProdutos } from "../lib/useProdutos";
import { Carregando } from "../components/Carregando";
import { config } from "../data/config";
import type { TipoProduto } from "../types/product";

type Filtro = "tudo" | TipoProduto;

const filtros: { valor: Filtro; rotulo: string }[] = [
  { valor: "tudo", rotulo: "Tudo do ateliê" },
  { valor: "pronta_entrega", rotulo: "Pronta entrega" },
  { valor: "sob_encomenda", rotulo: "Sob encomenda / personalização" },
];

export function Catalogo() {
  const { produtos, erro, recarregar } = useProdutos();
  // filtro na URL: sobrevive ao "voltar" depois de abrir uma peça e pode ser compartilhado
  const [params, setParams] = useSearchParams();
  const filtro = filtros.find((f) => f.valor === params.get("tipo"))?.valor ?? "tudo";
  const setFiltro = (valor: Filtro) =>
    setParams(valor === "tudo" ? {} : { tipo: valor }, { replace: true, preventScrollReset: true });

  if (!produtos) return <Carregando erro={erro} tentarDeNovo={recarregar} />;

  const produtosFiltrados = (
    filtro === "tudo" ? produtos : produtos.filter((produto) => produto.tipo === filtro)
  ).toSorted((a, b) => Number(!!a.vendido) - Number(!!b.vendido));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10">
      <title>{`Catálogo — ${config.nomeAtelie}`}</title>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl text-ink">Catálogo</h1>
        <p className="text-ink-soft">Dá uma olhada no que já tenho pronto e no que dá pra combinar.</p>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
        {filtros.map((item) => (
          <button
            key={item.valor}
            type="button"
            onClick={() => setFiltro(item.valor)}
            aria-pressed={filtro === item.valor}
            className={`min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition ${
              filtro === item.valor
                ? "bg-wine-700 text-white"
                : "bg-linen text-ink-soft hover:bg-wine-100"
            }`}
          >
            {item.rotulo}
          </button>
        ))}
      </div>

      {produtosFiltrados.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-6 md:grid-cols-3">
          {produtosFiltrados.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      ) : (
        <p className="rounded-token-md bg-linen px-6 py-10 text-center text-ink-soft">
          Nenhuma peça por aqui ainda — volte em breve ou fale comigo no WhatsApp.
        </p>
      )}
    </div>
  );
}
