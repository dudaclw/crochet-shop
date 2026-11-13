import type { TipoProduto } from "../types/product";

const rotulos: Record<TipoProduto, string> = {
  pronta_entrega: "Pronta entrega",
  sob_encomenda: "Sob encomenda",
};

const estilos: Record<TipoProduto, string> = {
  pronta_entrega: "bg-pistachio-100 text-pistachio-900",
  sob_encomenda: "bg-rose-100 text-wine-700",
};

export function TipoBadge({ tipo, vendido }: { tipo: TipoProduto; vendido?: boolean }) {
  if (vendido) {
    return (
      <span className="inline-flex w-fit items-center rounded-full bg-ink px-3 py-1 text-xs font-semibold tracking-wide text-white">
        Vendida
      </span>
    );
  }
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${estilos[tipo]}`}
    >
      {rotulos[tipo]}
    </span>
  );
}
