import type { ConfiguracaoGlobal } from "../types/config";

/**
 * Configuração global centralizada (RF-21) — número de WhatsApp e templates
 * de mensagem não devem ser hardcoded em botões individuais.
 */
export const config: ConfiguracaoGlobal = {
  whatsappNumero: "5511999999999",
  whatsappTemplateProntaEntrega: (nomeProduto) =>
    `Oi! Vi a peça "${nomeProduto}" no site e queria saber mais.`,
  whatsappTemplateSobEncomenda: (nomeProduto) =>
    `Oi! Tenho interesse em encomendar a peça "${nomeProduto}" — podemos combinar os detalhes?`,
  instagramHandle: "@ateliefiodeprosa",
  horarioAtendimento: "Segunda a sexta, das 9h às 18h",
  logoPlaceholder: "/placeholders/logo-mia.png",
  nomeAtelie: "Mia's Crochet",
  tagline: "Crochê feito à mão, com tempo e carinho",
};
