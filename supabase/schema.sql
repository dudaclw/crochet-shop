-- Rodar uma vez no SQL Editor do Supabase. Idempotente: pode rodar de novo.
-- Colunas em camelCase (entre aspas) para a linha virar `Produto` sem mapeamento no front.

-- Quem pode escrever: só usuários listados aqui, não "qualquer logado".
-- Assim, mesmo se o cadastro público ficar ligado por engano, ninguém edita a loja.
-- RLS sem policy (aviso "RLS Enabled No Policy" é intencional): a tabela não é acessível pela API.
create table if not exists public.admins (
  user_id uuid primary key references auth.users on delete cascade
);
alter table public.admins enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
-- Visitante anônimo não precisa (nem deve) chamar; o admin logado usa via rpc no login.
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

create table if not exists public.produtos (
  id text primary key default gen_random_uuid()::text,
  slug text not null unique,
  nome text not null check (length(trim(nome)) > 0),
  tipo text not null check (tipo in ('pronta_entrega', 'sob_encomenda')),
  preco numeric(10, 2) not null check (preco >= 0),
  "notaPreco" text,
  "prazoProducao" text,
  "personalizavelEm" text[],
  imagens text[] not null check (cardinality(imagens) > 0),
  "descricaoCurta" text not null,
  materiais text not null,
  tamanho text,
  cuidados text,
  vendido boolean not null default false,
  "criadoEm" timestamptz not null default now()
);
alter table public.produtos enable row level security;

drop policy if exists "vitrine le" on public.produtos;
create policy "vitrine le" on public.produtos for select using (true);

-- Escrita separada por ação e só para logados: a leitura da vitrine não roda is_admin().
drop policy if exists "admin escreve" on public.produtos;
drop policy if exists "admin cria" on public.produtos;
create policy "admin cria" on public.produtos for insert to authenticated
  with check (public.is_admin());
drop policy if exists "admin edita" on public.produtos;
create policy "admin edita" on public.produtos for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin exclui" on public.produtos;
create policy "admin exclui" on public.produtos for delete to authenticated
  using (public.is_admin());

-- Carrossel do topo da Home: uma linha só (id = 1), editada em /admin/carrossel.
-- fotos = [{ "url": "...", "foco": 0–100 }]; foco é a posição horizontal que fica visível
-- quando a tela do celular corta as laterais da foto (50 = centro).
-- A linha já nasce aqui, então o admin só precisa de UPDATE (sem insert/delete pela API).
create table if not exists public.carrossel (
  id int primary key default 1 check (id = 1),
  fotos jsonb not null default '[]' check (jsonb_typeof(fotos) = 'array')
);
alter table public.carrossel enable row level security;

drop policy if exists "vitrine le carrossel" on public.carrossel;
create policy "vitrine le carrossel" on public.carrossel for select using (true);
drop policy if exists "admin edita carrossel" on public.carrossel;
create policy "admin edita carrossel" on public.carrossel for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

insert into public.carrossel (id, fotos) values (1, '[
  { "url": "/produtos/amigurumi-coelho-laco-preto.webp", "foco": 50 },
  { "url": "/produtos/buque-de-tulipas-croche.webp", "foco": 15 },
  { "url": "/produtos/kit-panos-de-prato-xadrez.webp", "foco": 50 }
]') on conflict (id) do nothing;

-- Fotos: bucket público para leitura por URL; upload/remoção só admin.
-- Limite de 5 MB e só imagens, mesmo para admin (conta invadida não vira hospedagem de arquivo).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('imagens', 'imagens', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Remover arquivo exige também SELECT no Storage. Só admin: visitante não lista o bucket.
drop policy if exists "admin lista imagens" on storage.objects;
create policy "admin lista imagens" on storage.objects for select to authenticated
  using (bucket_id = 'imagens' and public.is_admin());

drop policy if exists "admin envia imagens" on storage.objects;
create policy "admin envia imagens" on storage.objects for insert to authenticated
  with check (bucket_id = 'imagens' and public.is_admin());

drop policy if exists "admin remove imagens" on storage.objects;
create policy "admin remove imagens" on storage.objects for delete to authenticated
  using (bucket_id = 'imagens' and public.is_admin());

-- Antes de publicar: Authentication > Sign In / Providers > desligar "Allow new users to sign up".
-- Depois de criar a usuária em Authentication > Users (senha forte), rodar com o e-mail dela:
-- insert into public.admins (user_id) select id from auth.users where email = 'EMAIL_DA_CLIENTE';
