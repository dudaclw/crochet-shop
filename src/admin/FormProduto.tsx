import { useState, type FormEvent, type ReactNode } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { produtosRepository, type DadosProduto } from "../lib/produtosRepository";
import { useProdutos } from "../lib/useProdutos";
import { Carregando } from "../components/Carregando";
import type { Produto, TipoProduto } from "../types/product";
import { campo } from "./estilos";
import { AdicionarFotos } from "./AdicionarFotos";

function Campo({ rotulo, children, className = "" }: { rotulo: string; children: ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1 text-sm font-semibold ${className}`}>
      {rotulo}
      {children}
    </label>
  );
}

function Formulario({ inicial }: { inicial?: Produto }) {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState<TipoProduto>(inicial?.tipo ?? "pronta_entrega");
  const [imagens, setImagens] = useState<string[]>(inicial?.imagens ?? []);
  const [enviando, setEnviando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const sobEncomenda = tipo === "sob_encomenda";

  async function salvar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const txt = (k: string) => String(f.get(k) ?? "").trim();
    const opc = (k: string) => txt(k) || null;
    const lista = (k: string, sep: string) =>
      txt(k).split(sep).map((s) => s.trim()).filter(Boolean);

    if (!imagens.length) return setErro("Adicione ao menos uma imagem.");
    const personalizavelEm = lista("personalizavelEm", ",");

    const dados: DadosProduto = {
      nome: txt("nome"),
      tipo,
      preco: Number(txt("preco")),
      notaPreco: opc("notaPreco"),
      prazoProducao: opc("prazoProducao"),
      personalizavelEm: personalizavelEm.length ? personalizavelEm : null,
      imagens,
      descricaoCurta: txt("descricaoCurta"),
      materiais: txt("materiais"),
      tamanho: opc("tamanho"),
      cuidados: opc("cuidados"),
      vendido: !sobEncomenda && f.get("vendido") === "on",
    };
    setSalvando(true);
    setErro("");
    try {
      await (inicial ? produtosRepository.editar(inicial.id, dados) : produtosRepository.criar(dados));
      navigate("/admin");
    } catch {
      setErro("Não foi possível salvar. Confira a internet ou saia e entre de novo.");
      setSalvando(false);
    }
  }

  // campos fora do tipo atual ficam só escondidos (hidden), então não perdem o valor ao trocar o tipo
  return (
    <form onSubmit={salvar} className="mx-auto flex max-w-2xl flex-col gap-4 px-5 py-8">
      <h1 className="text-2xl">{inicial ? "Editar produto" : "Novo produto"}</h1>

      <Campo rotulo="Nome">
        <input name="nome" required defaultValue={inicial?.nome} className={campo} />
      </Campo>

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo rotulo="Tipo">
          <select value={tipo} onChange={(e) => setTipo(e.target.value as TipoProduto)} className={campo}>
            <option value="pronta_entrega">Pronta entrega</option>
            <option value="sob_encomenda">Sob encomenda</option>
          </select>
        </Campo>
        <Campo rotulo="Preço (R$)">
          <input name="preco" type="number" min="0" step="0.01" required defaultValue={inicial?.preco} className={campo} />
        </Campo>
      </div>

      <Campo rotulo="Nota do preço (opcional, ex: jogo com 4)">
        <input name="notaPreco" defaultValue={inicial?.notaPreco ?? ""} className={campo} />
      </Campo>

      <Campo rotulo="Descrição curta">
        <textarea name="descricaoCurta" required rows={3} defaultValue={inicial?.descricaoCurta} className={campo} />
      </Campo>

      <Campo rotulo="Materiais">
        <input name="materiais" required defaultValue={inicial?.materiais} className={campo} />
      </Campo>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm font-semibold">Imagens (a primeira é a capa)</legend>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {imagens.map((src, i) => (
            <div key={i} className="relative">
              <img src={src} alt="" className="aspect-[4/5] w-full rounded-token-sm object-cover ring-1 ring-line" />
              {i === 0 && (
                <span className="absolute bottom-1 left-1 rounded-full bg-wine-700 px-2 py-0.5 text-[10px] font-semibold text-white">
                  Capa
                </span>
              )}
              <button
                type="button"
                aria-label={`Remover imagem ${i + 1}`}
                onClick={() => setImagens((atuais) => atuais.filter((_, j) => j !== i))}
                className="absolute top-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg text-ink shadow-token-soft hover:text-rose-700"
              >
                ×
              </button>
            </div>
          ))}
          <AdicionarFotos
            enviando={enviando}
            setEnviando={setEnviando}
            setErro={setErro}
            onEnviadas={(urls) => setImagens((atuais) => [...atuais, ...urls])}
            className="aspect-[4/5]"
          />
        </div>
      </fieldset>

      <Campo rotulo="Prazo de produção" className={sobEncomenda ? "" : "hidden"}>
        <input name="prazoProducao" defaultValue={inicial?.prazoProducao ?? ""} className={campo} />
      </Campo>
      <Campo rotulo="Personalizável em (separado por vírgula)" className={sobEncomenda ? "" : "hidden"}>
        <input name="personalizavelEm" defaultValue={inicial?.personalizavelEm?.join(", ") ?? ""} className={campo} />
      </Campo>

      <Campo rotulo="Tamanho" className={sobEncomenda ? "hidden" : ""}>
        <input name="tamanho" defaultValue={inicial?.tamanho ?? ""} className={campo} />
      </Campo>
      <Campo rotulo="Cuidados" className={sobEncomenda ? "hidden" : ""}>
        <textarea name="cuidados" rows={2} defaultValue={inicial?.cuidados ?? ""} className={campo} />
      </Campo>
      <label className={`flex items-center gap-2 text-sm font-semibold ${sobEncomenda ? "hidden" : ""}`}>
        <input name="vendido" type="checkbox" defaultChecked={inicial?.vendido} className="h-4 w-4 accent-wine-700" />
        Já foi vendida (continua no catálogo como "Vendida")
      </label>

      {erro && (
        <p role="alert" className="text-sm text-rose-700">
          {erro}
        </p>
      )}
      <div className="flex gap-3">
        <button
          disabled={enviando || salvando}
          className="flex-1 rounded-token-md bg-wine-700 px-6 py-3 font-semibold text-white hover:bg-wine-900 disabled:opacity-50 sm:flex-none"
        >
          {salvando ? "Salvando…" : "Salvar"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="flex-1 rounded-token-md bg-white px-6 py-3 font-semibold ring-1 ring-line hover:bg-wine-50 sm:flex-none"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export function FormProduto() {
  const { id } = useParams();
  const { produtos, erro, recarregar } = useProdutos();
  if (!id) return <Formulario />;
  if (!produtos) return <Carregando erro={erro} tentarDeNovo={recarregar} />;
  const produto = produtos.find((p) => p.id === id);
  return produto ? <Formulario key={id} inicial={produto} /> : <Navigate to="/admin" replace />;
}
