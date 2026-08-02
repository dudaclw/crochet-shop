import { config } from "../data/config";
import type { Produto } from "../types/product";

export function linkWhatsappProduto(produto: Produto): string {
  const mensagem =
    produto.tipo === "pronta_entrega"
      ? config.whatsappTemplateProntaEntrega(produto.nome)
      : config.whatsappTemplateSobEncomenda(produto.nome);

  return `https://wa.me/${config.whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
}
