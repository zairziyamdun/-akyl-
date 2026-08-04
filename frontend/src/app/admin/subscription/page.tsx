"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getAdminSubscriptionSettings,
  type JournalSubscriptionSettings,
  JournalSubscriptionApiError,
  MOCK_JOURNAL_SUBSCRIBERS,
  type MockSubscriberStatus,
  MOCK_SUBSCRIBER_STATUS_LABELS,
  MOCK_SUBSCRIBER_STATUSES,
  updateAdminSubscriptionSettings,
} from "@/entities/journal-subscription";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useToast } from "@/shared/ui/toast";
import { DataTable, PageHeader, StatusBadge } from "@/widgets/dashboard-shell";

type FormState = {
  title: string;
  description: string;
  price: string;
  currency: string;
  durationMonths: string;
  benefits: string[];
  isActive: boolean;
};

type StatusFilter = MockSubscriberStatus | "all";

function toFormState(settings: JournalSubscriptionSettings): FormState {
  return {
    title: settings.title,
    description: settings.description,
    price: String(settings.price),
    currency: settings.currency,
    durationMonths: String(settings.durationMonths),
    benefits: settings.benefits.length > 0 ? [...settings.benefits] : [""],
    isActive: settings.isActive,
  };
}

export default function AdminSubscriptionPage() {
  const { success: toastSuccess, error: toastError } = useToast();
  const [form, setForm] = useState<FormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const loadSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const settings = await getAdminSubscriptionSettings();
      setForm(toFormState(settings));
    } catch (err) {
      const message =
        err instanceof JournalSubscriptionApiError
          ? err.message
          : "Не удалось загрузить настройки подписки";
      setError(message);
      toastError(message);
    } finally {
      setLoading(false);
    }
  }, [toastError]);

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  const filteredSubscribers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return MOCK_JOURNAL_SUBSCRIBERS.filter((subscriber) => {
      if (statusFilter !== "all" && subscriber.status !== statusFilter) {
        return false;
      }
      if (!query) return true;
      return (
        subscriber.name.toLowerCase().includes(query) ||
        subscriber.email.toLowerCase().includes(query)
      );
    });
  }, [search, statusFilter]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const updateBenefit = (index: number, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const benefits = [...prev.benefits];
      benefits[index] = value;
      return { ...prev, benefits };
    });
  };

  const addBenefit = () => {
    setForm((prev) =>
      prev ? { ...prev, benefits: [...prev.benefits, ""] } : prev,
    );
  };

  const removeBenefit = (index: number) => {
    setForm((prev) => {
      if (!prev) return prev;
      const benefits = prev.benefits.filter((_, i) => i !== index);
      return { ...prev, benefits: benefits.length > 0 ? benefits : [""] };
    });
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form) return;

    const price = Number(form.price);
    const durationMonths = Number(form.durationMonths);
    const benefits = form.benefits.map((item) => item.trim()).filter(Boolean);

    if (!form.title.trim()) {
      const message = "Укажите название подписки";
      setError(message);
      toastError(message);
      return;
    }
    if (!Number.isInteger(price) || price < 0) {
      const message = "Цена должна быть целым числом ≥ 0";
      setError(message);
      toastError(message);
      return;
    }
    if (!Number.isInteger(durationMonths) || durationMonths < 1) {
      const message = "Срок должен быть целым числом ≥ 1 месяц";
      setError(message);
      toastError(message);
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = await updateAdminSubscriptionSettings({
        title: form.title.trim(),
        description: form.description.trim(),
        price,
        currency: form.currency.trim() || "KZT",
        durationMonths,
        benefits,
        isActive: form.isActive,
      });
      setForm(toFormState(updated));
      const message = "Настройки подписки сохранены";
      setSuccess(message);
      toastSuccess(message);
    } catch (err) {
      const message =
        err instanceof JournalSubscriptionApiError
          ? err.message
          : "Не удалось сохранить настройки";
      setError(message);
      toastError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Подписка"
        description="Управление ценой и условиями подписки на журнал AKYL"
      />

      {loading ? (
        <p className="text-sm text-slate-500">Загрузка настроек…</p>
      ) : !form ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error ?? "Настройки не найдены. Примените SQL из backend/docs/journal_subscription_settings.sql"}
          <div className="mt-3">
            <Button type="button" variant="secondary" onClick={() => void loadSettings()}>
              Повторить
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(event) => void handleSave(event)}
          className="mb-10 space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Название подписки
              </label>
              <Input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                disabled={saving}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Описание
              </label>
              <textarea
                className="min-h-24 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-sky-200 focus:ring-2"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                disabled={saving}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Цена (₸)
              </label>
              <Input
                type="number"
                min={0}
                step={1}
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                disabled={saving}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Срок (месяцев)
              </label>
              <Input
                type="number"
                min={1}
                step={1}
                value={form.durationMonths}
                onChange={(e) => updateField("durationMonths", e.target.value)}
                disabled={saving}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Валюта
              </label>
              <Input
                value={form.currency}
                onChange={(e) => updateField("currency", e.target.value)}
                disabled={saving}
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300"
                  checked={form.isActive}
                  onChange={(e) => updateField("isActive", e.target.checked)}
                  disabled={saving}
                />
                Подписка активна
              </label>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700">Преимущества</p>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={addBenefit}
                disabled={saving}
              >
                Добавить
              </Button>
            </div>
            <div className="space-y-2">
              {form.benefits.map((benefit, index) => (
                <div key={`benefit-${index}`} className="flex gap-2">
                  <Input
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    placeholder={`Пункт ${index + 1}`}
                    disabled={saving}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeBenefit(index)}
                    disabled={saving || form.benefits.length <= 1}
                  >
                    Удалить
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}
          {success ? (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {success}
            </p>
          ) : null}

          <Button type="submit" disabled={saving}>
            {saving ? "Сохранение…" : "Сохранить"}
          </Button>
        </form>
      )}

      <section className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
        <div className="mb-4">
          <h2 className="font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
            Подписчики
          </h2>
          <p className="mt-1 text-sm text-amber-800">
            Пока mock-данные для макета. Не из базы и не через API.
          </p>
        </div>

        <div className="mb-4 flex flex-wrap gap-3">
          <Input
            className="max-w-xs"
            placeholder="Поиск по имени или email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          >
            <option value="all">Все статусы</option>
            {MOCK_SUBSCRIBER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {MOCK_SUBSCRIBER_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>

        {filteredSubscribers.length === 0 ? (
          <p className="text-sm text-slate-500">Нет mock-записей по фильтру</p>
        ) : (
          <DataTable
            data={filteredSubscribers}
            keyExtractor={(row) => row.id}
            columns={[
              { key: "name", header: "Имя", render: (row) => row.name },
              { key: "email", header: "Email", render: (row) => row.email },
              {
                key: "startedAt",
                header: "Начало",
                render: (row) => row.startedAt,
              },
              {
                key: "endsAt",
                header: "Окончание",
                render: (row) => row.endsAt,
              },
              {
                key: "status",
                header: "Статус",
                render: (row) => (
                  <StatusBadge
                    status={
                      row.status === "active"
                        ? "active"
                        : row.status === "expired"
                          ? "suspended"
                          : "blocked"
                    }
                    label={MOCK_SUBSCRIBER_STATUS_LABELS[row.status]}
                  />
                ),
              },
            ]}
          />
        )}
      </section>
    </>
  );
}
