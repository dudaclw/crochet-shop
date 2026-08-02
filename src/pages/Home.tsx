import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { produtos } from "../data/produtos";

export function Home() {
  const destaques = produtos.slice(0, 3);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/*
        Ocupa quase a tela inteira pra dar a sensação de que tem mais
        conteúdo abaixo — reforçado pela seta de scroll. A altura desconta a
        altura do header (sticky, fora do fluxo desta seção) mais uma folga
        pra sempre sobrar uma tirinha da seção seguinte visível, e a seta
        cabendo sem precisar rolar a página no celular. O <img> aqui é só o
        placeholder atual; a ideia futura é essa área virar uma foto em alta
        resolução ou um vídeo curto em loop no lugar da imagem estática.
      */}
      <section className="relative flex min-h-[calc(100vh-170px)] flex-col overflow-hidden">
        <img
          src="/placeholders/hero.svg"
          alt="Peças de crochê do ateliê"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-wine-900/55" />

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
          className="relative mx-auto mb-8 flex h-11 w-11 animate-bounce items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {destaques.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
        <Link to="/catalogo" className="font-semibold text-wine-700 hover:underline">
          Ver catálogo completo →
        </Link>
      </section>
    </div>
  );
}
