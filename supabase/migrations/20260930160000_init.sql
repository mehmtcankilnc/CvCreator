create table public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  file_name text not null,
  template text not null,
  form_values jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cover_letters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  file_name text not null,
  form_values jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index resumes_user_updated_idx on public.resumes (user_id, updated_at desc);
create index cover_letters_user_updated_idx on public.cover_letters (user_id, updated_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger resumes_set_updated_at
before update on public.resumes
for each row execute function public.set_updated_at();

create trigger cover_letters_set_updated_at
before update on public.cover_letters
for each row execute function public.set_updated_at();

alter table public.resumes enable row level security;
alter table public.cover_letters enable row level security;

create policy "resumes_select_own" on public.resumes
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "resumes_insert_own" on public.resumes
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "resumes_update_own" on public.resumes
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "resumes_delete_own" on public.resumes
  for delete to authenticated using ((select auth.uid()) = user_id);

create policy "cover_letters_select_own" on public.cover_letters
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "cover_letters_insert_own" on public.cover_letters
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "cover_letters_update_own" on public.cover_letters
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "cover_letters_delete_own" on public.cover_letters
  for delete to authenticated using ((select auth.uid()) = user_id);

create or replace function public.delete_my_account()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from auth.users where id = (select auth.uid());
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

create or replace function public.keepalive()
returns integer
language sql
stable
set search_path = ''
as $$
  select 1;
$$;

grant execute on function public.keepalive() to anon, authenticated;
