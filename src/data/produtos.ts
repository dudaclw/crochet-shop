import type { Produto } from "../types/product";

/**
 * Dados de exemplo — imagens apontam para placeholders em /public/placeholders.
 * Trocar por fotos reais é só substituir o(s) caminho(s) em `imagens` (RF-24).
 */
export const produtos: Produto[] = [
  {
    id: "1",
    slug: "jogo-de-porta-copos-folhas",
    nome: "Jogo de porta-copos Folhas",
    tipo: "pronta_entrega",
    preco: 68,
    notaPreco: "jogo com 4",
    prazoProducao: null,
    personalizavelEm: null,
    imagens: ["/placeholders/card-1.svg"],
    descricaoCurta:
      "Um jogo de porta-copos em formato de folha, feito em ponto baixo bem firme — protege a mesa e ainda fica bonito exposto.",
    materiais: "Fio de algodão 100%, cor verde-sálvia",
    tamanho: "10cm de diâmetro cada peça",
    cuidados: "Lavar à mão com água fria e sabão neutro. Não usar alvejante.",
  },
  {
    id: "2",
    slug: "manta-ponto-favo-de-mel",
    nome: "Manta Ponto Favo de Mel",
    tipo: "pronta_entrega",
    preco: 320,
    notaPreco: null,
    prazoProducao: null,
    personalizavelEm: null,
    imagens: ["/placeholders/card-2.svg"],
    descricaoCurta:
      "Manta grande e macia, ideal pra um cantinho de leitura ou pro sofá da sala. Textura em favo de mel, bem aconchegante.",
    materiais: "Fio misto algodão e acrílico, tons terrosos",
    tamanho: "1,40m x 1,00m",
    cuidados: "Lavar à máquina em ciclo delicado, secar na horizontal.",
  },
  {
    id: "3",
    slug: "amigurumi-coelhinho",
    nome: "Amigurumi Coelhinho",
    tipo: "sob_encomenda",
    preco: 95,
    notaPreco: null,
    prazoProducao: "10 a 15 dias úteis",
    personalizavelEm: ["cor do corpo", "tamanho", "roupinha", "nome bordado"],
    imagens: ["/placeholders/card-3.svg"],
    descricaoCurta:
      "Um coelhinho amigurumi feito à mão, todo personalizável — combinamos juntas a cor, o tamanho e os detalhes.",
    materiais: "Fio de algodão siliconado, enchimento antialérgico",
    tamanho: null,
    cuidados: null,
  },
  {
    id: "4",
    slug: "bolsa-de-croche-vera",
    nome: "Bolsa de crochê Vera",
    tipo: "sob_encomenda",
    preco: 180,
    notaPreco: "a partir de",
    prazoProducao: "15 a 20 dias úteis",
    personalizavelEm: ["cor", "tamanho da alça", "forro interno"],
    imagens: ["/placeholders/card-1.svg"],
    descricaoCurta:
      "Bolsa estruturada em ponto alto duplo, com forro de tecido e alça ajustável — feita sob medida pro seu dia a dia.",
    materiais: "Fio de algodão encerado, forro de tecido 100% algodão",
    tamanho: null,
    cuidados: null,
  },
  {
    id: "5",
    slug: "tapete-oval-trancado",
    nome: "Tapete oval Trançado",
    tipo: "pronta_entrega",
    preco: 145,
    notaPreco: null,
    prazoProducao: null,
    personalizavelEm: null,
    imagens: ["/placeholders/card-2.svg"],
    descricaoCurta:
      "Tapete oval trançado à mão, com fio grosso que dá volume e conforto — combina com quarto, sala ou área externa coberta.",
    materiais: "Fio de malha (fitilho) reciclado",
    tamanho: "0,60m x 0,90m",
    cuidados: "Aspirar regularmente. Lavar à mão se necessário, secar na sombra.",
  },
  {
    id: "6",
    slug: "conjunto-cha-de-bebe",
    nome: "Conjunto Chá de Bebê",
    tipo: "sob_encomenda",
    preco: 210,
    notaPreco: "conjunto completo",
    prazoProducao: "20 a 25 dias úteis",
    personalizavelEm: ["cor", "tamanho (RN a 6 meses)", "nome bordado"],
    imagens: ["/placeholders/card-3.svg"],
    descricaoCurta:
      "Sapatinho, touca e casaquinho combinando, feitos com fio bem macio pra pele sensível do bebê. Um presente cheio de carinho.",
    materiais: "Fio de algodão premium, hipoalergênico",
    tamanho: null,
    cuidados: null,
  },
];
