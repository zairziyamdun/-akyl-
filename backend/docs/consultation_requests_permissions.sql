-- Fix: permission denied for table consultation_requests
-- Supabase → SQL Editor → New query → Run

grant usage on schema public to service_role;

grant select, insert, update, delete
  on table public.consultation_requests
  to service_role;

-- Optional: allow public form inserts through anon key later
-- grant insert on table public.consultation_requests to anon, authenticated;
