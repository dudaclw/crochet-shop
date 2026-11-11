/** Mostrado enquanto `useProdutos` não tem a lista: "carregando" ou erro com botão de tentar de novo. */
export function Carregando({ erro, tentarDeNovo }: { erro: boolean; tentarDeNovo: () => void }) {
  return (
    <div role="status" className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-20 text-center text-ink-soft">
      {erro ? (
        <>
          <p>Não consegui carregar as peças agora. Confere sua internet e tenta de novo?</p>
          <button
            type="button"
            onClick={tentarDeNovo}
            className="rounded-token-md bg-wine-700 px-5 py-2.5 font-semibold text-white hover:bg-wine-900"
          >
            Tentar de novo
          </button>
        </>
      ) : (
        <p>Carregando…</p>
      )}
    </div>
  );
}
