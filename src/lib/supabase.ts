import { createClient } from "@supabase/supabase-js";

// A chave anon é pública por design: quem protege os dados são as policies em supabase/schema.sql.
const url = import.meta.env.VITE_SUPABASE_URL;
const chave = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!url || !chave) throw new Error("Faltam VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (ver .env.example)");

export const supabase = createClient(url, chave);
