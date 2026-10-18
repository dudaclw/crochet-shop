import { useCallback, useEffect, useState } from "react";
import { produtosRepository } from "./produtosRepository";
import type { Produto } from "../types/product";

/** `produtos` é null enquanto carrega. `recarregar` relê após criar/editar/excluir. */
export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[] | null>(null);
  const recarregar = useCallback(() => produtosRepository.listar().then(setProdutos), []);
  useEffect(() => {
    recarregar();
  }, [recarregar]);
  return { produtos, recarregar };
}
