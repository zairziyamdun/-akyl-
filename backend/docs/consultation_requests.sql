-- Consultation requests table for AKYL backend
-- Run manually in Supabase SQL Editor (do not auto-apply)

create table if not exists consultation_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  organization text,
  role text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

-- Required for Supabase API access
grant usage on schema public to postgres, anon, authenticated, service_role;

grant all on table consultation_requests to service_role;
grant insert on table consultation_requests to anon, authenticated;

alter table consultation_requests enable row level security;

create policy "service_role_all_consultation_requests"
  on consultation_requests
  for all
  to service_role
  using (true)
  with check (true);

create policy "public_insert_consultation_requests"
  on consultation_requests
  for insert
  to anon, authenticated
  with check (true);
