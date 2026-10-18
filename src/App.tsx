import { lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { ProdutoDetalhe } from "./pages/ProdutoDetalhe";
import { Sobre } from "./pages/Sobre";

// Admin só existe em dev e em `npm run preview:admin`. Nas demais builds a
// condição é constante e o chunk do painel nem chega a ser gerado.
const Admin =
  import.meta.env.DEV || import.meta.env.VITE_ADMIN === "true"
    ? lazy(() => import("./admin/Admin"))
    : null;

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col font-body">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/catalogo"
          element={
            <Layout>
              <Catalogo />
            </Layout>
          }
        />
        <Route
          path="/catalogo/:slug"
          element={
            <Layout>
              <ProdutoDetalhe />
            </Layout>
          }
        />
        <Route
          path="/sobre"
          element={
            <Layout>
              <Sobre />
            </Layout>
          }
        />
        {Admin && (
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={null}>
                <Admin />
              </Suspense>
            }
          />
        )}
        <Route
          path="*"
          element={
            <Layout>
              <Navigate to="/" replace />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
