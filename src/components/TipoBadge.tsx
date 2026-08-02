import type { TipoProduto } from "../types/product";

const rotulos: Record<TipoProduto, string> = {
  pronta_entrega: "Pronta entrega",
  sob_encomenda: "Sob encomenda",
};

const estilos: Record<TipoProduto, string> = {
  pronta_entrega: "bg-sage-100 text-sage-700",
  sob_encomenda: "bg-rose-100 text-rose-700",
};

export function TipoBadge({ tipo }: { tipo: TipoProduto }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${estilos[tipo]}`}
    >
      {rotulos[tipo]}
    </span>
  );
}
