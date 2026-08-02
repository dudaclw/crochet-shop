import { Link } from "react-router-dom";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { ProductCard } from "../components/ProductCard";
import { produtos } from "../data/produtos";

export function Home() {
  const destaques = produtos.slice(0, 3);

  return (
    <div className="flex flex-col gap-20 pb-20">
      <section className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-5 pt-10 md:flex-row md:pt-16">
        <div className="flex flex-1 flex-col items-start gap-5 text-left">
          <h1 className="text-4xl text-ink md:text-5xl">
            Cada peça nasce com tempo, ponto a ponto
          </h1>
          <p className="text-lg text-ink-soft">
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

        <div className="relative w-full flex-1">
          <PlaceholderImage src="/placeholders/hero.svg" alt="Peças de crochê do ateliê" aspect="aspect-[4/3]" />
          <span className="absolute bottom-4 left-4 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-ink shadow-token-soft">
            feito à mão, com tempo
          </span>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5">
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
