export interface ConfiguracaoGlobal {
  whatsappNumero: string;
  whatsappTemplateProntaEntrega: (nomeProduto: string) => string;
  whatsappTemplateSobEncomenda: (nomeProduto: string) => string;
  instagramHandle: string;
  horarioAtendimento: string;
  logoPlaceholder: string;
  nomeAtelie: string;
  tagline: string;
}
