import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { authService, CREDENCIAL_DEMO } from "../lib/authService";
import { campo } from "./estilos";

export function Login() {
  const navigate = useNavigate();
  const [erro, setErro] = useState(false);
  if (authService.logado()) return <Navigate to="/admin" replace />;

  async function entrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (await authService.login(String(f.get("usuario")), String(f.get("senha")))) {
      navigate("/admin", { replace: true });
    } else {
      setErro(true);
    }
  }

  return (
    <form onSubmit={entrar} className="mx-auto flex max-w-sm flex-col gap-4 px-5 py-16">
      <h1 className="text-2xl">Entrar no admin</h1>
      <label className="flex flex-col gap-1 text-sm font-semibold">
        Usuário
        <input name="usuario" autoComplete="username" required className={campo} />
      </label>
      <label className="flex flex-col gap-1 text-sm font-semibold">
        Senha
        <input name="senha" type="password" autoComplete="current-password" required className={campo} />
      </label>
      {erro && (
        <p role="alert" className="text-sm text-rose-700">
          Usuário ou senha incorretos.
        </p>
      )}
      <button className="rounded-token-md bg-wine-700 px-6 py-3 font-semibold text-white hover:bg-wine-900">
        Entrar
      </button>
      <p className="text-xs text-ink-soft">
        Protótipo local · demo: {CREDENCIAL_DEMO.usuario} / {CREDENCIAL_DEMO.senha}
      </p>
    </form>
  );
}
