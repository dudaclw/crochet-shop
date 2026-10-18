/**
 * Sessão MOCK só para validar o fluxo do admin. NÃO é segurança: tudo aqui
 * roda no navegador e vai para o bundle. A credencial abaixo é de demonstração
 * e o painel só existe em dev/preview local (ver ADMIN_ATIVO em App.tsx).
 * Com back-end: trocar login/logout/logado por chamadas reais.
 */
const CHAVE = "admin-sessao";
const DURACAO_MS = 2 * 60 * 60 * 1000;
export const CREDENCIAL_DEMO = { usuario: "admin", senha: "demo123" };

export const authService = {
  async login(usuario: string, senha: string) {
    if (usuario !== CREDENCIAL_DEMO.usuario || senha !== CREDENCIAL_DEMO.senha) return false;
    sessionStorage.setItem(CHAVE, String(Date.now() + DURACAO_MS));
    return true;
  },

  logout() {
    sessionStorage.removeItem(CHAVE);
  },

  logado() {
    return Number(sessionStorage.getItem(CHAVE)) > Date.now();
  },
};
