-- Journal subscriptions (real subscriber records).
-- Run manually in Supabase SQL Editor after journal_subscription_settings.sql.
-- price_paid is a snapshot: changing current offer price does not rewrite history.

create table if not exists journal_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  settings_id uuid not null references public.journal_subscription_settings (id) on delete restrict,
  price_paid integer not null check (price_paid >= 0),
  currency text not null default 'KZT',
  started_at timestamptz,
  expires_at timestamptz,
  status text not null default 'pending'
    check (status in ('pending', 'active', 'expired', 'cancelled')),
  payment_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists journal_subscriptions_user_id_idx
  on journal_subscriptions (user_id);

create index if not exists journal_subscriptions_status_idx
  on journal_subscriptions (status);

create index if not exists journal_subscriptions_expires_at_idx
  on journal_subscriptions (expires_at);

grant usage on schema public to postgres, anon, authenticated, service_role;

grant all on table journal_subscriptions to service_role;

alter table journal_subscriptions enable row level security;

drop policy if exists "service_role_all_journal_subscriptions"
  on journal_subscriptions;
create policy "service_role_all_journal_subscriptions"
  on journal_subscriptions
  for all
  to service_role
  using (true)
  with check (true);

-- Authenticated users may read only their own subscriptions (cabinet later).
drop policy if exists "users_read_own_journal_subscriptions"
  on journal_subscriptions;
create policy "users_read_own_journal_subscriptions"
  on journal_subscriptions
  for select
  to authenticated
  using (auth.uid() = user_id);
