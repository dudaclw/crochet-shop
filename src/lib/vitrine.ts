import type { Produto } from "../types/product";

/**
 * Leitura pública dos produtos com fetch direto na API REST do Supabase.
 * Assim o visitante não baixa o supabase-js (~50 KB gzip): ele fica só no admin,
 * que é carregado sob demanda. Escrita continua em produtosRepository.
 */
const url = import.meta.env.VITE_SUPABASE_URL;
const chave = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!url || !chave) throw new Error("Faltam VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (ver .env.example)");

const COLUNAS =
  'id,slug,nome,tipo,preco,"notaPreco","prazoProducao","personalizavelEm",imagens,"descricaoCurta",materiais,tamanho,cuidados,vendido';

export async function listarProdutos(): Promise<Produto[]> {
  const resposta = await fetch(`${url}/rest/v1/produtos?select=${encodeURIComponent(COLUNAS)}&order=criadoEm.asc`, {
    headers: { apikey: chave, Authorization: `Bearer ${chave}` },
  });
  if (!resposta.ok) throw new Error(`Falha ao listar produtos (${resposta.status})`);
  return resposta.json();
}
