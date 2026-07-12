"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  type CreateFinanceRecordPayload,
  createFinanceRecord,
  deleteFinanceRecord,
  EMPTY_FINANCE_FORM,
  FINANCE_FIELD_LABELS,
  FinanceApiError,
  type FinanceRecord,
  fetchFinanceRecords,
  formatMoney,
  formatPeriodMonth,
  periodMonthToInput,
  updateFinanceRecord,
} from "@/entities/finance-record";
import type { House } from "@/entities/house";
import { fetchHouse, HousesApiError } from "@/entities/house";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { DataTable, EmptyState, PageHeader } from "@/widgets/dashboard-shell";

type HouseFinanceManagerProps = {
  houseId: string;
};

type FormMode = "create" | "edit";

const NUMERIC_FIELDS = [
  "opening_balance",
  "accrued",
  "collected",
  "expenses",
  "closing_balance",
  "reserve_fund",
  "capital_repair_fund",
  "debt_total",
] as const satisfies ReadonlyArray<keyof CreateFinanceRecordPayload>;

function recordToForm(record: FinanceRecord): CreateFinanceRecordPayload {
  return {
    period_month: periodMonthToInput(record.period_month),
    opening_balance: record.opening_balance,
    accrued: record.accrued,
    collected: record.collected,
    expenses: record.expenses,
    closing_balance: record.closing_balance,
    reserve_fund: record.reserve_fund,
    capital_repair_fund: record.capital_repair_fund,
    debt_total: record.debt_total,
  };
}

export function HouseFinanceManager({ houseId }: HouseFinanceManagerProps) {
  const [house, setHouse] = useState<House | null>(null);
  const [records, setRecords] = useState<FinanceRecord[]>([]);
  const [form, setForm] =
    useState<CreateFinanceRecordPayload>(EMPTY_FINANCE_FORM);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [forbidden, setForbidden] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    setForbidden(false);

    try {
      const [houseData, financeData] = await Promise.all([
        fetchHouse(houseId),
        fetchFinanceRecords(houseId),
      ]);
      setHouse(houseData);
      setRecords(financeData);
    } catch (err) {
      if (err instanceof FinanceApiError && err.status === 403) {
        setForbidden(true);
        return;
      }
      if (err instanceof HousesApiError && err.status === 403) {
        setForbidden(true);
        return;
      }
      const message =
        err instanceof FinanceApiError || err instanceof HousesApiError
          ? err.message
          : "Не удалось загрузить финансовые данные";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [houseId]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const resetForm = () => {
    setForm(EMPTY_FINANCE_FORM);
    setFormMode("create");
    setEditingId(null);
  };

  const handleNumericChange = (
    field: (typeof NUMERIC_FIELDS)[number],
    value: string,
  ) => {
    const parsed = value === "" ? 0 : Number(value);
    setForm((prev) => ({
      ...prev,
      [field]: Number.isFinite(parsed) ? parsed : 0,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (formMode === "create") {
        const created = await createFinanceRecord(houseId, form);
        setRecords((prev) =>
          [created, ...prev].sort(
            (a, b) =>
              new Date(b.period_month).getTime() -
              new Date(a.period_month).getTime(),
          ),
        );
        resetForm();
      } else if (editingId) {
        const updated = await updateFinanceRecord(houseId, editingId, form);
        setRecords((prev) =>
          prev
            .map((record) => (record.id === editingId ? updated : record))
            .sort(
              (a, b) =>
                new Date(b.period_month).getTime() -
                new Date(a.period_month).getTime(),
            ),
        );
        resetForm();
      }
    } catch (err) {
      setError(
        err instanceof FinanceApiError
          ? err.message
          : "Не удалось сохранить запись",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (record: FinanceRecord) => {
    setForm(recordToForm(record));
    setFormMode("edit");
    setEditingId(record.id);
  };

  const handleDelete = async (recordId: string) => {
    if (!window.confirm("Удалить финансовую запись?")) return;

    setSaving(true);
    setError("");

    try {
      await deleteFinanceRecord(houseId, recordId);
      setRecords((prev) => prev.filter((record) => record.id !== recordId));
      if (editingId === recordId) {
        resetForm();
      }
    } catch (err) {
      setError(
        err instanceof FinanceApiError
          ? err.message
          : "Не удалось удалить запись",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-sky-600" />
      </div>
    );
  }

  if (forbidden) {
    return (
      <EmptyState
        title="403 — нет доступа"
        description="У вас нет прав для просмотра финансов этого ЖК."
        action={
          <Button asChild variant="secondary">
            <Link href="/admin/houses">← К списку ЖК</Link>
          </Button>
        }
      />
    );
  }

  if (error && !house) {
    return (
      <EmptyState
        title="Ошибка"
        description={error}
        action={
          <Button variant="secondary" onClick={() => void loadData()}>
            Повторить
          </Button>
        }
      />
    );
  }

  return (
    <>
      <PageHeader
        title={house ? `Финансы — ${house.name}` : "Финансы ЖК"}
        description={house ? (house.address ?? undefined) : undefined}
        actions={
          <Button asChild variant="ghost" size="sm">
            <Link href={`/admin/houses/${houseId}`}>← К ЖК</Link>
          </Button>
        }
      />

      {error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="mb-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <h2 className="text-sm font-semibold text-slate-900">
          {formMode === "create" ? "Новая запись" : "Редактирование записи"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              {FINANCE_FIELD_LABELS.period_month}
            </label>
            <Input
              type="month"
              value={form.period_month}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  period_month: event.target.value,
                }))
              }
              required
            />
          </div>

          {NUMERIC_FIELDS.map((field) => (
            <div key={field}>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                {FINANCE_FIELD_LABELS[field]}
              </label>
              <Input
                type="number"
                step="0.01"
                value={form[field]}
                onChange={(event) =>
                  handleNumericChange(field, event.target.value)
                }
                required
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={saving}>
            {saving
              ? "Сохранение…"
              : formMode === "create"
                ? "Добавить запись"
                : "Сохранить изменения"}
          </Button>
          {formMode === "edit" ? (
            <Button
              type="button"
              variant="secondary"
              disabled={saving}
              onClick={resetForm}
            >
              Отмена
            </Button>
          ) : null}
        </div>
      </form>

      {records.length === 0 ? (
        <EmptyState
          title="Записей пока нет"
          description="Добавьте первую финансовую запись за месяц."
        />
      ) : (
        <DataTable
          data={records}
          keyExtractor={(record) => record.id}
          columns={[
            {
              key: "period",
              header: "Период",
              render: (record) => formatPeriodMonth(record.period_month),
            },
            {
              key: "opening_balance",
              header: "Входящий",
              render: (record) => formatMoney(record.opening_balance),
            },
            {
              key: "accrued",
              header: "Начислено",
              render: (record) => formatMoney(record.accrued),
            },
            {
              key: "collected",
              header: "Собрано",
              render: (record) => formatMoney(record.collected),
            },
            {
              key: "collection_rate",
              header: "Собираемость",
              render: (record) => `${record.collection_rate}%`,
            },
            {
              key: "expenses",
              header: "Расходы",
              render: (record) => formatMoney(record.expenses),
            },
            {
              key: "closing_balance",
              header: "Исходящий",
              render: (record) => formatMoney(record.closing_balance),
            },
            {
              key: "debt_total",
              header: "Долг",
              render: (record) => formatMoney(record.debt_total),
            },
            {
              key: "actions",
              header: "",
              className: "text-right",
              render: (record) => (
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={saving}
                    onClick={() => handleEdit(record)}
                  >
                    Изменить
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={saving}
                    onClick={() => void handleDelete(record.id)}
                  >
                    Удалить
                  </Button>
                </div>
              ),
            },
          ]}
        />
      )}
    </>
  );
}
