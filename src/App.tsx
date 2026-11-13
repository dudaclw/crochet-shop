import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet, RouterProvider, ScrollRestoration } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { ProdutoDetalhe } from "./pages/ProdutoDetalhe";
import { Sobre } from "./pages/Sobre";

// Carregado só ao abrir /admin: visitante da loja não baixa o código do painel.
const Admin = lazy(() => import("./admin/Admin"));

function Layout() {
  return (
    <div className="flex min-h-svh flex-col font-body">
      {/* abrir uma peça começa no topo; "voltar" devolve à mesma altura da lista */}
      <ScrollRestoration />
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-token-sm bg-wine-700 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/catalogo", element: <Catalogo /> },
      { path: "/catalogo/:slug", element: <ProdutoDetalhe /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
  {
    path: "/admin/*",
    element: (
      <Suspense fallback={null}>
        <Admin />
      </Suspense>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
