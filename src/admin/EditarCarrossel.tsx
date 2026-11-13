import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carregando } from "../components/Carregando";
import { produtosRepository } from "../lib/produtosRepository";
import { lerCarrossel, type FotoCarrossel } from "../lib/vitrine";
import { AdicionarFotos } from "./AdicionarFotos";
import { campo } from "./estilos";

const focos = [
  { valor: 15, rotulo: "Esquerda" },
  { valor: 50, rotulo: "Centro" },
  { valor: 85, rotulo: "Direita" },
];

// Miniaturas na proporção de um celular em pé: mostram o mesmo corte que o visitante vê no topo da Home.
export function EditarCarrossel() {
  const navigate = useNavigate();
  const [fotos, setFotos] = useState<FotoCarrossel[] | null>(null);
  const [erroCarga, setErroCarga] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const carregar = () => {
    setErroCarga(false);
    lerCarrossel().then(setFotos, () => setErroCarga(true));
  };
  useEffect(carregar, []);

  if (!fotos) return <Carregando erro={erroCarga} tentarDeNovo={carregar} />;

  const alterar = (i: number, mudanca: Partial<FotoCarrossel>) =>
    setFotos(fotos.map((f, j) => (j === i ? { ...f, ...mudanca } : f)));
  const mover = (i: number, passo: -1 | 1) => {
    const nova = [...fotos];
    [nova[i], nova[i + passo]] = [nova[i + passo], nova[i]];
    setFotos(nova);
  };

  async function salvar() {
    if (!fotos?.length) return setErro("Adicione ao menos uma foto.");
    setSalvando(true);
    setErro("");
    try {
      await produtosRepository.salvarCarrossel(fotos);
      navigate("/admin");
    } catch {
      setErro("Não foi possível salvar. Confira a internet ou saia e entre de novo.");
      setSalvando(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 px-5 py-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl">Carrossel da página inicial</h1>
        <p className="text-sm text-ink-soft">
          As fotos passam sozinhas, nesta ordem, a cada 5 segundos. Fotos em pé ficam melhores no
          celular; nas deitadas, escolha qual parte deve aparecer.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {fotos.map((foto, i) => (
          <li key={foto.url} className="flex flex-col gap-2">
            <div className="relative">
              <img
                src={foto.url}
                alt=""
                style={{ objectPosition: `${foto.foco}% 50%` }}
                className="aspect-[9/16] w-full rounded-token-sm object-cover ring-1 ring-line"
              />
              <span className="absolute bottom-1 left-1 rounded-full bg-wine-700 px-2 py-0.5 text-xs font-semibold text-white">
                {i + 1}ª
              </span>
              <button
                type="button"
                aria-label={`Remover foto ${i + 1}`}
                onClick={() => setFotos(fotos.filter((_, j) => j !== i))}
                className="absolute top-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg text-ink shadow-token-soft hover:text-rose-700 active:text-rose-700 toque"
              >
                ×
              </button>
            </div>

            <label className="flex flex-col gap-1 text-xs font-semibold">
              Parte visível no celular
              <select
                value={foto.foco}
                onChange={(e) => alterar(i, { foco: Number(e.target.value) })}
                className={campo}
              >
                {/* valor antigo fora das 3 opções continua selecionável */}
                {!focos.some((f) => f.valor === foto.foco) && <option value={foto.foco}>Personalizado</option>}
                {focos.map((f) => (
                  <option key={f.valor} value={f.valor}>
                    {f.rotulo}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex gap-2 text-sm font-semibold">
              <button
                type="button"
                disabled={i === 0}
                onClick={() => mover(i, -1)}
                aria-label={`Mover foto ${i + 1} para antes`}
                className="flex-1 rounded-token-sm bg-white py-2 ring-1 ring-line hover:bg-wine-50 disabled:opacity-40 active:bg-wine-50 toque"
              >
                ←
              </button>
              <button
                type="button"
                disabled={i === fotos.length - 1}
                onClick={() => mover(i, 1)}
                aria-label={`Mover foto ${i + 1} para depois`}
                className="flex-1 rounded-token-sm bg-white py-2 ring-1 ring-line hover:bg-wine-50 disabled:opacity-40 active:bg-wine-50 toque"
              >
                →
              </button>
            </div>
          </li>
        ))}
        <li>
          <AdicionarFotos
            enviando={enviando}
            setEnviando={setEnviando}
            setErro={setErro}
            onEnviadas={(urls) => setFotos((atuais) => [...(atuais ?? []), ...urls.map((url) => ({ url, foco: 50 }))])}
            className="aspect-[9/16]"
          />
        </li>
      </ul>

      {erro && (
        <p role="alert" className="text-sm text-rose-700">
          {erro}
        </p>
      )}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={salvar}
          disabled={enviando || salvando}
          className="flex-1 rounded-token-md bg-wine-700 px-6 py-3 font-semibold text-white hover:bg-wine-900 disabled:opacity-50 sm:flex-none active:bg-wine-900 toque"
        >
          {salvando ? "Salvando…" : "Salvar"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="flex-1 rounded-token-md bg-white px-6 py-3 font-semibold ring-1 ring-line hover:bg-wine-50 sm:flex-none active:bg-wine-50 toque"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
