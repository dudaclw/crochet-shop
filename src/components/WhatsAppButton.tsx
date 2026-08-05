import type { Produto } from "../types/product";
import { linkWhatsappProduto } from "../lib/whatsapp";

/** RF-18: o texto do botão varia conforme pronta_entrega ou sob_encomenda */
const rotulos: Record<Produto["tipo"], string> = {
  pronta_entrega: "Quero esse, chamar no Whatsapp!",
  sob_encomenda: "Quero esse! Vamos combinar",
};

export function WhatsAppButton({
  produto,
  className = "",
}: {
  produto: Produto;
  className?: string;
}) {
  return (
    <a
      href={linkWhatsappProduto(produto)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-token-md bg-wine-700 px-6 py-3 text-center font-semibold text-white shadow-token-soft transition hover:bg-wine-900 ${className}`}
    >
      {rotulos[produto.tipo]}
    </a>
  );
}
