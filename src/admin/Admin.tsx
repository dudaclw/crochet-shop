import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { authService } from "../lib/authService";
import { FormProduto } from "./FormProduto";
import { ListaProdutos } from "./ListaProdutos";
import { Login } from "./Login";

function RequireAdmin() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<boolean | null>(null);
  useEffect(() => {
    authService.ehAdmin().then(setAdmin, () => setAdmin(false));
    return authService.aoSair(() => setAdmin(false));
  }, []);
  if (admin === null) return null;
  if (!admin) return <Navigate to="/admin/login" replace />;

  return (
    <>
      <header className="border-b border-line bg-wine-900 text-cream">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-3 text-sm">
          <Link to="/admin" className="font-display text-lg">
            Admin
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/" className="hover:underline">
              Ver loja
            </Link>
            <button
              type="button"
              onClick={async () => {
                await authService.logout();
                navigate("/admin/login");
              }}
              className="font-semibold hover:underline"
            >
              Sair
            </button>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

function Shell() {
  return (
    <div className="min-h-svh bg-cream font-body text-ink">
      <meta name="robots" content="noindex" />
      <Outlet />
    </div>
  );
}

export default function Admin() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="login" element={<Login />} />
        <Route element={<RequireAdmin />}>
          <Route index element={<ListaProdutos />} />
          <Route path="novo" element={<FormProduto />} />
          <Route path=":id" element={<FormProduto />} />
        </Route>
      </Route>
    </Routes>
  );
}
