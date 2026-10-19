create table if not exists public.keepalive_log (
  id integer primary key default 1 check (id = 1),
  pinged_at timestamptz not null default now(),
  ping_count bigint not null default 0
);

alter table public.keepalive_log enable row level security;

create or replace function public.keepalive()
returns integer
language sql
security definer
set search_path = ''
as $$
  insert into public.keepalive_log (id, pinged_at, ping_count)
  values (1, now(), 1)
  on conflict (id) do update
    set pinged_at = now(),
        ping_count = public.keepalive_log.ping_count + 1
  returning 1;
$$;

revoke all on function public.keepalive() from public;
grant execute on function public.keepalive() to anon, authenticated;
