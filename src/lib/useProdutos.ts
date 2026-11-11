import { useCallback, useEffect, useState } from "react";
import { produtosRepository } from "./produtosRepository";
import type { Produto } from "../types/product";

/** `produtos` é null enquanto carrega ou se deu erro (`erro` = true). `recarregar` relê após criar/editar/excluir. */
export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[] | null>(null);
  const [erro, setErro] = useState(false);
  const recarregar = useCallback(() => {
    setErro(false);
    return produtosRepository.listar().then(setProdutos, () => setErro(true));
  }, []);
  useEffect(() => {
    recarregar();
  }, [recarregar]);
  return { produtos, erro, recarregar };
}
