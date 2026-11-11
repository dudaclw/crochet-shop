import { supabase } from "./supabase";
import type { Produto } from "../types/product";

/**
 * Única porta de entrada para os produtos (vitrine e admin). Leitura é pública;
 * escrita só passa para quem está em `public.admins` (RLS em supabase/schema.sql).
 */
const BUCKET = "imagens";
const COLUNAS =
  'id, slug, nome, tipo, preco, "notaPreco", "prazoProducao", "personalizavelEm", imagens, "descricaoCurta", materiais, tamanho, cuidados, vendido';

export type DadosProduto = Omit<Produto, "id" | "slug">;

function slugify(nome: string) {
  return nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Só apaga arquivos do nosso bucket; fotos em /public (ex.: /produtos/...) ficam. */
async function removerArquivos(urls: string[]) {
  const marca = `/storage/v1/object/public/${BUCKET}/`;
  const caminhos = urls.filter((u) => u.includes(marca)).map((u) => u.split(marca)[1]);
  // falha aqui só deixa arquivo órfão no Storage; não deve impedir a operação principal
  if (caminhos.length) await supabase.storage.from(BUCKET).remove(caminhos);
}

export const produtosRepository = {
  async listar(): Promise<Produto[]> {
    const { data, error } = await supabase.from("produtos").select(COLUNAS).order("criadoEm");
    if (error) throw error;
    return data as Produto[];
  },

  async criar(dados: DadosProduto) {
    const base = slugify(dados.nome) || "produto";
    const { data, error } = await supabase.from("produtos").select("slug").like("slug", `${base}%`);
    if (error) throw error;
    const usados = new Set(data.map((p) => p.slug));
    let slug = base;
    for (let n = 2; usados.has(slug); n++) slug = `${base}-${n}`;
    const { error: erroInsert } = await supabase.from("produtos").insert({ ...dados, slug });
    if (erroInsert) throw erroInsert;
  },

  // slug não muda na edição para não quebrar links já compartilhados
  async editar(id: string, dados: DadosProduto) {
    const { data: antes } = await supabase.from("produtos").select("imagens").eq("id", id).single();
    const { data, error } = await supabase.from("produtos").update(dados).eq("id", id).select("id");
    if (error) throw error;
    if (!data.length) throw new Error("Nada foi salvo (sessão expirada?)");
    if (antes) await removerArquivos(antes.imagens.filter((u: string) => !dados.imagens.includes(u)));
  },

  async excluir(id: string) {
    const { data, error } = await supabase.from("produtos").delete().eq("id", id).select("imagens");
    if (error) throw error;
    if (!data.length) throw new Error("Nada foi excluído (sessão expirada?)");
    await removerArquivos(data[0].imagens);
  },

  /**
   * Reduz a foto para no máx. 1600px, envia ao Storage e devolve a URL pública.
   * ponytail: foto enviada e formulário cancelado vira arquivo órfão; limpar pelo painel se pesar.
   */
  async enviarImagem(arquivo: File) {
    const bitmap = await createImageBitmap(arquivo);
    const escala = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * escala);
    canvas.height = Math.round(bitmap.height * escala);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((ok) => canvas.toBlob(ok, "image/jpeg", 0.85));
    if (!blob) throw new Error("Falha ao converter a imagem");

    const caminho = `${crypto.randomUUID()}.jpg`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(caminho, blob, { contentType: "image/jpeg", cacheControl: "31536000" });
    if (error) throw error;
    return supabase.storage.from(BUCKET).getPublicUrl(caminho).data.publicUrl;
  },
};
