create table public.reflections (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 passage_id text not null check (passage_id = 'psalm-23'),
 draw_near text not null default '' check (char_length(draw_near)<=10000),
 write_it text not null default '' check (char_length(write_it)<=10000),
 examine_it text not null default '' check (char_length(examine_it)<=10000),
 look_at_him text not null default '' check (char_length(look_at_him)<=10000),
 listen_live_it text not null default '' check (char_length(listen_live_it)<=10000),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 constraint reflection_not_empty check (length(btrim(draw_near||write_it||examine_it||look_at_him||listen_live_it))>0)
);
create index reflections_owner_created on public.reflections(user_id,created_at desc);
alter table public.reflections enable row level security;
revoke all on public.reflections from anon, authenticated;
grant select, insert, delete on public.reflections to authenticated;
grant update (draw_near,write_it,examine_it,look_at_him,listen_live_it) on public.reflections to authenticated;
create policy owner_read on public.reflections for select to authenticated using ((select auth.uid())=user_id);
create policy owner_insert on public.reflections for insert to authenticated with check ((select auth.uid())=user_id);
create policy owner_update on public.reflections for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy owner_delete on public.reflections for delete to authenticated using ((select auth.uid())=user_id);
create function public.touch_reflection() returns trigger language plpgsql security invoker set search_path='' as $$
begin new.updated_at=now(); return new; end;
$$;
revoke all on function public.touch_reflection() from public;
create trigger reflection_updated before update on public.reflections for each row execute function public.touch_reflection();
