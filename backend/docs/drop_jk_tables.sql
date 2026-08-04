-- Drop ЖК operational tables after removing houses/finance modules from the app.
-- Run in Supabase Dashboard → SQL Editor (service role / postgres).
-- Order: dependents first. CASCADE clears FKs/policies on these tables.

BEGIN;

DROP TABLE IF EXISTS public.finance_records CASCADE;
DROP TABLE IF EXISTS public.house_users CASCADE;
DROP TABLE IF EXISTS public.houses CASCADE;

COMMIT;

-- Optional: remove leftover enums/types if they were created only for ЖК
-- (uncomment after checking they are unused elsewhere)
-- DROP TYPE IF EXISTS public.house_role CASCADE;
-- DROP TYPE IF EXISTS public.house_membership_status CASCADE;
