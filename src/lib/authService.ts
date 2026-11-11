import { supabase } from "./supabase";

/**
 * Login real via Supabase Auth. Checar isso no navegador é só para a tela:
 * quem bloqueia escrita de verdade é a RLS (`public.is_admin()` no schema).
 */
export const authService = {
  /** "ok" | "invalido" (e-mail/senha errados) | "rede" | "sem-permissao" (conta existe mas não é admin) */
  async login(email: string, senha: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) return error.status === 400 ? ("invalido" as const) : ("rede" as const);
    if (await this.ehAdmin()) return "ok" as const;
    await supabase.auth.signOut();
    return "sem-permissao" as const;
  },

  logout() {
    return supabase.auth.signOut();
  },

  async ehAdmin() {
    const { data: sessao } = await supabase.auth.getSession();
    if (!sessao.session) return false;
    const { data } = await supabase.rpc("is_admin");
    return data === true;
  },

  /** chama `aoSair` quando a sessão acaba (logout em outra aba, token revogado) */
  aoSair(aoSair: () => void) {
    const { data } = supabase.auth.onAuthStateChange((evento) => {
      if (evento === "SIGNED_OUT") aoSair();
    });
    return () => data.subscription.unsubscribe();
  },
};
