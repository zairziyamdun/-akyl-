-- Houses and house_users (run in Supabase SQL editor)

CREATE TABLE IF NOT EXISTS houses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  apartments_count integer,
  total_area numeric(12, 2),
  build_year integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS house_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  house_id uuid NOT NULL REFERENCES houses(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  house_role text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (house_id, user_id, house_role)
);

CREATE INDEX IF NOT EXISTS house_users_house_id_idx ON house_users (house_id);
CREATE INDEX IF NOT EXISTS house_users_user_id_idx ON house_users (user_id);
