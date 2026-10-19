-- Rodar uma vez no SQL Editor do Supabase. Idempotente: pode rodar de novo.
-- Colunas em camelCase (entre aspas) para a linha virar `Produto` sem mapeamento no front.

-- Quem pode escrever: só usuários listados aqui, não "qualquer logado".
-- Assim, mesmo se o cadastro público ficar ligado por engano, ninguém edita a loja.
create table if not exists public.admins (
  user_id uuid primary key references auth.users on delete cascade
);
alter table public.admins enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

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

drop policy if exists "admin escreve" on public.produtos;
create policy "admin escreve" on public.produtos for all
  using (public.is_admin()) with check (public.is_admin());

-- Fotos: bucket público para leitura; upload/remoção só admin.
insert into storage.buckets (id, name, public)
values ('imagens', 'imagens', true)
on conflict (id) do nothing;

drop policy if exists "admin envia imagens" on storage.objects;
create policy "admin envia imagens" on storage.objects for insert
  with check (bucket_id = 'imagens' and public.is_admin());

drop policy if exists "admin remove imagens" on storage.objects;
create policy "admin remove imagens" on storage.objects for delete
  using (bucket_id = 'imagens' and public.is_admin());

-- Depois de criar a usuária em Authentication > Users, rodar com o e-mail dela:
-- insert into public.admins (user_id) select id from auth.users where email = 'EMAIL_DA_CLIENTE';
