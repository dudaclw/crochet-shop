import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { useProdutos } from "../lib/useProdutos";
import { Carregando } from "../components/Carregando";
import { config } from "../data/config";
import { lerCarrossel, type FotoCarrossel } from "../lib/vitrine";

// Última leitura nesta aba: voltar pra Home mostra as fotos na hora.
let ultimasFotos: FotoCarrossel[] | null = null;
const INTERVALO_MS = 5000;

/**
 * Fotos do topo, editadas em /admin/carrossel. Trocam sozinhas com fade;
 * para quem prefere menos movimento, só pelos pontinhos.
 */
function CarrosselHero() {
  const [fotos, setFotos] = useState(ultimasFotos ?? []);
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    // sem fotos (erro de rede) fica só o fundo vinho, com o texto legível
    lerCarrossel().then((lidas) => {
      ultimasFotos = lidas;
      setFotos(lidas);
    }, () => {});
  }, []);

  useEffect(() => {
    if (pausado || fotos.length < 2) return;
    const id = setInterval(() => setAtual((i) => (i + 1) % fotos.length), INTERVALO_MS);
    return () => clearInterval(id);
  }, [pausado, atual, fotos.length]); // atual: clicar num pontinho reinicia a contagem

  // a lista pode encolher (leitura nova após o cache): mantém o índice dentro dela
  const visivel = atual % Math.max(fotos.length, 1);

  return (
    <>
      {/* fotos ilustrativas atrás do título: decorativas (alt vazio) */}
      {fotos.map(({ url, foco }, i) => (
        <img
          key={url}
          src={url}
          alt=""
          fetchPriority={i === 0 ? "high" : "low"}
          decoding="async"
          style={{ objectPosition: `${foco}% 50%` }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === visivel ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* escurece só embaixo, onde fica o texto, pra foto continuar aparecendo */}
      <div className="absolute inset-0 bg-gradient-to-t from-wine-900/90 via-wine-900/40 to-wine-900/10" />

      {fotos.length > 1 && (
        <div className="absolute top-3 right-3 z-10 flex items-center rounded-full bg-black/25 backdrop-blur">
          {fotos.map((foto, i) => (
            <button
              key={foto.url}
              type="button"
              onClick={() => setAtual(i)}
              aria-label={`Mostrar foto ${i + 1} de ${fotos.length}`}
              aria-current={i === visivel}
              className="flex h-9 w-7 items-center justify-center"
            >
              <span
                className={`h-2 rounded-full bg-white transition-all ${i === visivel ? "w-5" : "w-2 opacity-60"}`}
              />
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPausado((p) => !p)}
            aria-label={pausado ? "Retomar troca automática das fotos" : "Pausar troca automática das fotos"}
            className="flex h-9 w-9 items-center justify-center text-white"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
              {pausado ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h3v14H7zM14 5h3v14h-3z" />}
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

export function Home() {
  const { produtos, erro, recarregar } = useProdutos();
  const destaques = (produtos ?? []).filter((p) => !p.vendido).slice(0, 4);

  return (
    <div className="flex flex-col gap-14 pb-14 md:gap-20 md:pb-20">
      <title>{`${config.nomeAtelie} — crochê feito à mão`}</title>
      {/*
        Ocupa quase a tela inteira pra dar a sensação de que tem mais
        conteúdo abaixo — reforçado pela seta de scroll. A altura desconta a
        altura do header (sticky, fora do fluxo desta seção) mais uma folga
        pra sempre sobrar uma tirinha da seção seguinte visível, e a seta
        cabendo sem precisar rolar a página no celular.
      */}
      <section className="relative flex min-h-[calc(100svh-170px)] flex-col overflow-hidden bg-wine-900">
        <CarrosselHero />

        <div className="relative mx-auto flex max-w-6xl flex-1 flex-col items-start justify-end gap-4 px-5 pt-10 pb-14 text-left md:gap-5 md:pt-16 md:pb-20">
          <h1 className="text-3xl text-white md:text-5xl">
            Cada peça nasce com tempo, ponto a ponto
          </h1>
          <p className="text-base text-white/90 md:text-lg">
            Faço crochê pensando em quem vai usar — mantas pra esquentar o inverno, bolsas
            pro dia a dia, amigurumis pra presentear. Aqui você encontra o que já está
            pronto e também combina comigo peças feitas especialmente pra você.
          </p>
          <Link
            to="/catalogo"
            className="inline-flex items-center justify-center rounded-token-md bg-wine-700 px-7 py-3.5 font-semibold text-white shadow-token-soft transition hover:bg-wine-900"
          >
            Ver o que tem no ateliê
          </Link>
        </div>

        <a
          href="#destaques"
          aria-label="Rolar para ver mais"
          onClick={(e) => {
            e.preventDefault();
            const suave = !matchMedia("(prefers-reduced-motion: reduce)").matches;
            document.getElementById("destaques")?.scrollIntoView({ behavior: suave ? "smooth" : "auto" });
          }}
          className="relative mx-auto mb-8 flex h-11 w-11 motion-safe:animate-bounce items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>

      <section id="destaques" className="mx-auto flex w-full max-w-6xl scroll-mt-24 flex-col gap-6 px-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl text-ink">Um pouquinho do que eu faço</h2>
          <p className="text-ink-soft">
            Peças prontas pra levar já e peças sob encomenda, combinadas com calma.
          </p>
        </div>
        {!produtos ? (
          <Carregando erro={erro} tentarDeNovo={recarregar} />
        ) : destaques.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-6 md:grid-cols-4">
            {destaques.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        ) : (
          <p className="rounded-token-md bg-linen px-6 py-10 text-center text-ink-soft">
            As peças de pronta entrega saíram todas! Dá uma olhada no catálogo ou me chama pra encomendar.
          </p>
        )}
        <Link to="/catalogo" className="w-fit py-2 font-semibold text-wine-700 hover:underline">
          Ver catálogo completo →
        </Link>
      </section>
    </div>
  );
}
