import { Link } from "react-router-dom";
import { TipoBadge } from "../components/TipoBadge";
import { produtosRepository } from "../lib/produtosRepository";
import { useProdutos } from "../lib/useProdutos";

const formatoPreco = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function ListaProdutos() {
  const { produtos, recarregar } = useProdutos();

  async function excluir(id: string, nome: string) {
    if (!confirm(`Excluir "${nome}"?`)) return;
    await produtosRepository.excluir(id);
    recarregar();
  }

  async function restaurar() {
    if (!confirm("Descartar todas as edições e voltar ao catálogo original?")) return;
    await produtosRepository.restaurar();
    recarregar();
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-5 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl">Produtos</h1>
        <Link
          to="/admin/novo"
          className="rounded-token-md bg-wine-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-wine-900"
        >
          + Novo produto
        </Link>
      </div>

      <ul className="flex flex-col gap-3">
        {produtos?.map((p) => (
          <li
            key={p.id}
            className="flex flex-col gap-3 rounded-token-md border border-line bg-linen p-3 sm:flex-row sm:items-center"
          >
            <div className="flex flex-1 items-center gap-3">
              <img src={p.imagens[0]} alt="" className="h-16 w-16 rounded-token-sm object-cover" />
              <div className="flex flex-col gap-1">
                <span className="font-semibold">{p.nome}</span>
                <span className="flex items-center gap-2 text-sm text-ink-soft">
                  <TipoBadge tipo={p.tipo} vendido={p.vendido} /> {formatoPreco.format(p.preco)}
                </span>
              </div>
            </div>
            <div className="flex gap-2 text-sm font-semibold">
              <Link
                to={`/admin/${p.id}`}
                className="flex-1 rounded-token-sm bg-white px-4 py-2 text-center ring-1 ring-line hover:bg-wine-50 sm:flex-none"
              >
                Editar
              </Link>
              <button
                type="button"
                onClick={() => excluir(p.id, p.nome)}
                className="flex-1 rounded-token-sm bg-white px-4 py-2 text-rose-700 ring-1 ring-line hover:bg-rose-50 sm:flex-none"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
        {produtos?.length === 0 && <li className="text-ink-soft">Nenhum produto cadastrado.</li>}
      </ul>

      <button
        type="button"
        onClick={restaurar}
        className="w-fit text-xs text-ink-soft underline hover:text-wine-700"
      >
        Restaurar catálogo original
      </button>
    </div>
  );
}
