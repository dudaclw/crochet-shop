import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../lib/authService";
import { campo } from "./estilos";

const mensagens = {
  invalido: "E-mail ou senha incorretos.",
  "sem-permissao": "Essa conta não tem acesso ao painel.",
  rede: "Não consegui falar com o servidor. Confira a internet e tente de novo.",
};

export function Login() {
  const navigate = useNavigate();
  const [erro, setErro] = useState<keyof typeof mensagens | null>(null);
  const [entrando, setEntrando] = useState(false);

  useEffect(() => {
    authService.ehAdmin().then((admin) => admin && navigate("/admin", { replace: true }));
  }, [navigate]);

  async function entrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setEntrando(true);
    const resultado = await authService.login(String(f.get("email")), String(f.get("senha")));
    if (resultado === "ok") return navigate("/admin", { replace: true });
    setErro(resultado);
    setEntrando(false);
  }

  return (
    <form onSubmit={entrar} className="mx-auto flex max-w-sm flex-col gap-4 px-5 py-16">
      <h1 className="text-2xl">Entrar no admin</h1>
      <label className="flex flex-col gap-1 text-sm font-semibold">
        E-mail
        <input name="email" type="email" autoComplete="username" required className={campo} />
      </label>
      <label className="flex flex-col gap-1 text-sm font-semibold">
        Senha
        <input name="senha" type="password" autoComplete="current-password" required className={campo} />
      </label>
      {erro && (
        <p role="alert" className="text-sm text-rose-700">
          {mensagens[erro]}
        </p>
      )}
      <button
        disabled={entrando}
        className="rounded-token-md bg-wine-700 px-6 py-3 font-semibold text-white hover:bg-wine-900 disabled:opacity-50 active:bg-wine-900 toque"
      >
        {entrando ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
