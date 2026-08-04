-- Journal subscription settings (singleton row for admin-managed offer).
-- Run manually in Supabase SQL Editor.

create table if not exists journal_subscription_settings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  price integer not null default 0 check (price >= 0),
  currency text not null default 'KZT',
  duration_months integer not null default 12 check (duration_months >= 1),
  benefits jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

-- Keep a single settings row: prevent accidental multi-row product offers.
create unique index if not exists journal_subscription_settings_singleton_uidx
  on journal_subscription_settings ((true));

grant usage on schema public to postgres, anon, authenticated, service_role;

grant all on table journal_subscription_settings to service_role;
grant select on table journal_subscription_settings to anon, authenticated;

alter table journal_subscription_settings enable row level security;

drop policy if exists "service_role_all_journal_subscription_settings"
  on journal_subscription_settings;
create policy "service_role_all_journal_subscription_settings"
  on journal_subscription_settings
  for all
  to service_role
  using (true)
  with check (true);

drop policy if exists "public_read_active_journal_subscription_settings"
  on journal_subscription_settings;
create policy "public_read_active_journal_subscription_settings"
  on journal_subscription_settings
  for select
  to anon, authenticated
  using (is_active = true);

-- Seed one default offer if the table is empty.
insert into journal_subscription_settings (
  title,
  description,
  price,
  currency,
  duration_months,
  benefits,
  is_active
)
select
  'Подписка на журнал AKYL',
  'Годовая подписка на выпуски журнала AKYL: доступ к PDF, архиву и материалам редакции.',
  15000,
  'KZT',
  12,
  jsonb_build_array(
    'Доступ ко всем выпускам журнала',
    'PDF для чтения и скачивания',
    'Архив прошлых номеров',
    'Обновления в течение срока подписки'
  ),
  true
where not exists (select 1 from journal_subscription_settings);
