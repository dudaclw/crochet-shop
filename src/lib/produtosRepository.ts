import { produtos as seed } from "../data/produtos";
import type { Produto } from "../types/product";

/**
 * Única porta de entrada para os produtos (vitrine e admin). Hoje: seed +
 * localStorage, só neste navegador. Quando houver back-end, trocar só este
 * arquivo por chamadas à API — as telas não mudam (por isso tudo é async).
 */
const CHAVE = "produtos";

export type DadosProduto = Omit<Produto, "id" | "slug">;

function ler(): Produto[] {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo) return JSON.parse(salvo) as Produto[];
  } catch {
    // storage bloqueado ou JSON corrompido: cai no seed
  }
  return seed;
}

function gravar(lista: Produto[]) {
  localStorage.setItem(CHAVE, JSON.stringify(lista));
}

function slugify(nome: string) {
  return nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const produtosRepository = {
  async listar() {
    return ler();
  },

  async criar(dados: DadosProduto) {
    const lista = ler();
    const base = slugify(dados.nome) || "produto";
    let slug = base;
    for (let n = 2; lista.some((p) => p.slug === slug); n++) slug = `${base}-${n}`;
    gravar([...lista, { ...dados, id: crypto.randomUUID(), slug }]);
  },

  // slug não muda na edição para não quebrar links já compartilhados
  async editar(id: string, dados: DadosProduto) {
    gravar(ler().map((p) => (p.id === id ? { ...p, ...dados } : p)));
  },

  async excluir(id: string) {
    gravar(ler().filter((p) => p.id !== id));
  },

  /**
   * Recebe a foto e devolve a URL para salvar em `imagens`. Hoje reduz para
   * no máx. 1200px e devolve um data URL JPEG guardado no localStorage.
   * ponytail: localStorage tem ~5MB (≈20 fotos); com back-end, enviar o arquivo à API e devolver a URL dele.
   */
  async enviarImagem(arquivo: File) {
    const bitmap = await createImageBitmap(arquivo);
    const escala = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * escala);
    canvas.height = Math.round(bitmap.height * escala);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.8);
  },

  /** volta ao catálogo original do código (útil após editar `data/produtos.ts`) */
  async restaurar() {
    localStorage.removeItem(CHAVE);
  },
};
