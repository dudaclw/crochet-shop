import type { ChangeEvent } from "react";
import { produtosRepository } from "../lib/produtosRepository";

/** Quadrado "+ Adicionar foto": escolhe arquivos (no celular abre câmera/galeria), reduz e envia ao Storage. */
export function AdicionarFotos({
  enviando,
  setEnviando,
  setErro,
  onEnviadas,
  className = "",
}: {
  enviando: boolean;
  setEnviando: (v: boolean) => void;
  setErro: (msg: string) => void;
  onEnviadas: (urls: string[]) => void;
  className?: string;
}) {
  async function aoEscolher(e: ChangeEvent<HTMLInputElement>) {
    const arquivos = [...(e.target.files ?? [])];
    e.target.value = ""; // permite escolher o mesmo arquivo de novo
    setEnviando(true);
    setErro("");
    try {
      onEnviadas(await Promise.all(arquivos.map((a) => produtosRepository.enviarImagem(a))));
    } catch {
      setErro("Não consegui enviar essa imagem. Tente uma foto em JPG ou PNG de até 5 MB, ou confira a internet.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <label
      className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-token-sm border-2 border-dashed border-line bg-white text-sm text-ink-soft hover:border-wine-300 focus-within:border-wine-500 ${className}`}
    >
      <span className="text-2xl leading-none">+</span>
      {enviando ? "Enviando…" : "Adicionar foto"}
      <input type="file" accept="image/*" multiple onChange={aoEscolher} disabled={enviando} className="sr-only" />
    </label>
  );
}
