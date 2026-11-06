-- Library materials (статьи базы знаний) + Storage bucket for article photos.
-- Apply once in Supabase SQL Editor.

create table if not exists public.library_materials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null default 'article'
    check (type in ('article', 'research', 'regulation', 'template', 'video')),
  topic text not null,
  description text not null default '',
  content text not null default '',
  cover_url text,
  read_time text,
  format text,
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  published_at timestamptz,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists library_materials_status_published_idx
  on public.library_materials (status, published_at desc);

create or replace function public.library_materials_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists library_materials_updated_at on public.library_materials;
create trigger library_materials_updated_at
  before update on public.library_materials
  for each row execute function public.library_materials_set_updated_at();

alter table public.library_materials enable row level security;

drop policy if exists "service_role_all_library_materials" on public.library_materials;
create policy "service_role_all_library_materials"
  on public.library_materials
  for all
  to service_role
  using (true)
  with check (true);

drop policy if exists "public_read_published_library_materials" on public.library_materials;
create policy "public_read_published_library_materials"
  on public.library_materials
  for select
  to anon, authenticated
  using (status = 'published');

-- Public bucket for article cover and inline photos (uploads go through backend).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'library-images',
  'library-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;
