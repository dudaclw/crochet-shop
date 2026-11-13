import { useCallback, useEffect, useState } from "react";
import { listarProdutos } from "./vitrine";
import type { Produto } from "../types/product";

// Última lista lida nesta aba: troca de página e "voltar" no celular mostram as peças na hora,
// sem piscar "Carregando…", enquanto a lista é relida em segundo plano.
let ultimaLista: Produto[] | null = null;

/** `produtos` é null enquanto carrega ou se deu erro (`erro` = true). `recarregar` relê após criar/editar/excluir. */
export function useProdutos() {
  const [produtos, setProdutos] = useState(ultimaLista);
  const [erro, setErro] = useState(false);
  const recarregar = useCallback(() => {
    setErro(false);
    return listarProdutos().then((lista) => {
      ultimaLista = lista;
      setProdutos(lista);
    }, () => setErro(true));
  }, []);
  useEffect(() => {
    recarregar();
  }, [recarregar]);
  return { produtos, erro, recarregar };
}
