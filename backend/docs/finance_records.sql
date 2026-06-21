-- Finance records per house (run in Supabase SQL editor)

CREATE TABLE IF NOT EXISTS finance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  house_id uuid NOT NULL REFERENCES houses(id) ON DELETE CASCADE,
  period_month date NOT NULL,
  opening_balance numeric(14, 2) NOT NULL DEFAULT 0,
  accrued numeric(14, 2) NOT NULL DEFAULT 0,
  collected numeric(14, 2) NOT NULL DEFAULT 0,
  collection_rate numeric(6, 2) NOT NULL DEFAULT 0,
  expenses numeric(14, 2) NOT NULL DEFAULT 0,
  closing_balance numeric(14, 2) NOT NULL DEFAULT 0,
  reserve_fund numeric(14, 2) NOT NULL DEFAULT 0,
  capital_repair_fund numeric(14, 2) NOT NULL DEFAULT 0,
  debt_total numeric(14, 2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (house_id, period_month)
);

CREATE INDEX IF NOT EXISTS finance_records_house_id_idx
  ON finance_records (house_id);

CREATE INDEX IF NOT EXISTS finance_records_house_period_idx
  ON finance_records (house_id, period_month DESC);
