import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { ProdutoDetalhe } from "./pages/ProdutoDetalhe";
import { Sobre } from "./pages/Sobre";

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
