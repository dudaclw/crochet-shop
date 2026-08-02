export type TipoProduto = "pronta_entrega" | "sob_encomenda";

export interface Produto {
  id: string;
  slug: string;
  nome: string;
  tipo: TipoProduto;
  preco: number;
  notaPreco: string | null;
  prazoProducao: string | null;
  personalizavelEm: string[] | null;
  /** array porque a estrutura já prevê galeria (RF-25), mesmo com 1 imagem hoje */
  imagens: string[];
  descricaoCurta: string;
  materiais: string;
  tamanho: string | null;
  cuidados: string | null;
}
