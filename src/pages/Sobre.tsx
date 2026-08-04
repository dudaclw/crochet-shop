import { PlaceholderImage } from "../components/PlaceholderImage";

export function Sobre() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-5 py-10 md:flex-row md:items-start md:py-16">
      <div className="flex flex-1 flex-col gap-4 text-left">
        <h1 className="text-3xl text-ink">Sobre o ateliê</h1>
        <p className="text-ink-soft">
          Comecei a fazer crochê ainda observando minha avó, sentada na varanda com um
          novelo no colo. Hoje é meu trabalho e meu jeito de desacelerar — escolho os fios
          com calma, combino as cores e boto a mão na massa em cada peça.
        </p>
        <p className="text-ink-soft">
          Gosto de pensar no crochê como uma conversa: você me conta o que precisa, eu
          conto o que dá pra fazer, e a gente vai combinando até chegar numa peça que faz
          sentido pra você. Por isso boa parte do que faço é sob encomenda — dá tempo de
          pensar em cada detalhe junto.
        </p>
        <p className="text-ink-soft">
          As peças de pronta entrega nascem nos intervalos, quando um fio ou uma cor me dá
          vontade de testar algo novo. Elas ficam no catálogo até encontrarem uma casa.
        </p>
      </div>

      <div className="w-full max-w-[220px] md:max-w-[260px]">
        <PlaceholderImage src="/placeholders/logo2.png" alt="Mia's Crochet" aspect="aspect-square" />
      </div>
    </div>
  );
}
