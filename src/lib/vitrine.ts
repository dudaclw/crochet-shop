import type { Produto } from "../types/product";

/**
 * Leitura pública (produtos e carrossel) com fetch direto na API REST do Supabase.
 * Assim o visitante não baixa o supabase-js (~50 KB gzip): ele fica só no admin,
 * que é carregado sob demanda. Escrita continua em produtosRepository.
 */
const url = import.meta.env.VITE_SUPABASE_URL;
const chave = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!url || !chave) throw new Error("Faltam VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (ver .env.example)");

const COLUNAS =
  'id,slug,nome,tipo,preco,"notaPreco","prazoProducao","personalizavelEm",imagens,"descricaoCurta",materiais,tamanho,cuidados,vendido';

/** `foco`: posição horizontal (0–100%) que fica visível quando a tela corta a foto. */
export interface FotoCarrossel {
  url: string;
  foco: number;
}

async function ler<T>(caminho: string): Promise<T> {
  const resposta = await fetch(`${url}/rest/v1/${caminho}`, {
    headers: { apikey: chave, Authorization: `Bearer ${chave}` },
  });
  if (!resposta.ok) throw new Error(`Falha ao ler ${caminho} (${resposta.status})`);
  return resposta.json();
}

export const listarProdutos = () =>
  ler<Produto[]>(`produtos?select=${encodeURIComponent(COLUNAS)}&order=criadoEm.asc`);

export const lerCarrossel = () =>
  ler<{ fotos: FotoCarrossel[] }[]>("carrossel?select=fotos").then((linhas) => linhas[0]?.fotos ?? []);
