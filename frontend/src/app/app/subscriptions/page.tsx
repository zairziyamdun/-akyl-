"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  formatSubscriptionDate,
  formatSubscriptionDuration,
  formatSubscriptionPrice,
  getMySubscriptionOverview,
  JOURNAL_SUBSCRIBER_STATUS_LABELS,
  type MySubscriptionOverview,
  JournalSubscriptionApiError,
  subscriptionStatusBadgeVariant,
} from "@/entities/journal-subscription";
import { Button } from "@/shared/ui/Button";
import { DataTable, PageHeader, StatusBadge } from "@/widgets/dashboard-shell";

export default function UserSubscriptionsPage() {
  const [overview, setOverview] = useState<MySubscriptionOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMySubscriptionOverview();
      setOverview(data);
    } catch (err) {
      setError(
        err instanceof JournalSubscriptionApiError
          ? err.message
          : "Не удалось загрузить подписку",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const current = overview?.current ?? null;
  const offer = overview?.offer ?? null;
  const hasActiveAccess = overview?.hasActiveAccess ?? false;
  const hasOpenSubscription =
    hasActiveAccess || current?.status === "pending";
  const canStartCheckout = Boolean(offer?.isActive) && !hasOpenSubscription;

  return (
    <>
      <PageHeader
        title="Подписка"
        description="Статус доступа к журналу AKYL и история оформлений"
      />

      {loading ? (
        <p className="text-sm text-slate-500">Загрузка…</p>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
          {error.includes("journal_subscriptions") ? (
            <p className="mt-2 text-red-600/90">
              Откройте Supabase → SQL Editor и выполните файл{" "}
              <code className="rounded bg-red-100 px-1">
                backend/docs/journal_subscriptions.sql
              </code>
            </p>
          ) : null}
          <div className="mt-3">
            <Button type="button" variant="secondary" onClick={() => void load()}>
              Повторить
            </Button>
          </div>
        </div>
      ) : overview && offer ? (
        <div className="space-y-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-wider text-sky-700 uppercase">
                  Текущий статус
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-medium text-slate-900">
                    {offer.title}
                  </h2>
                  {current ? (
                    <StatusBadge
                      status={subscriptionStatusBadgeVariant(current.status)}
                      label={JOURNAL_SUBSCRIBER_STATUS_LABELS[current.status]}
                    />
                  ) : (
                    <StatusBadge status="none" label="Нет подписки" />
                  )}
                </div>
                {offer.description ? (
                  <p className="mt-2 max-w-2xl text-sm text-slate-600">
                    {offer.description}
                  </p>
                ) : null}
              </div>

              {canStartCheckout ? (
                <Button asChild>
                  <Link href="/app/subscriptions/checkout">Оформить подписку</Link>
                </Button>
              ) : current?.status === "pending" ? (
                <Button asChild variant="secondary">
                  <Link href="/app/subscriptions/checkout">
                    Продолжить оформление
                  </Link>
                </Button>
              ) : null}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-500">Цена</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {current
                    ? formatSubscriptionPrice(current.pricePaid, current.currency)
                    : formatSubscriptionPrice(offer.price, offer.currency)}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-500">Срок</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {formatSubscriptionDuration(offer.durationMonths)}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-500">Дата окончания</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {formatSubscriptionDate(current?.expiresAt ?? null)}
                </p>
              </div>
            </div>

            {!offer.isActive && !hasOpenSubscription ? (
              <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Оформление подписки временно недоступно.
              </p>
            ) : null}

            {current?.status === "active" ? (
              <p className="mt-4 text-sm text-slate-500">
                У вас уже есть активная подписка. Новую можно оформить после
                окончания или отмены текущей.
              </p>
            ) : null}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
              История подписок
            </h2>
            {overview.history.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">Записей пока нет</p>
            ) : (
              <div className="mt-4">
                <DataTable
                  data={overview.history}
                  keyExtractor={(row) => row.id}
                  columns={[
                    {
                      key: "createdAt",
                      header: "Создана",
                      render: (row) => formatSubscriptionDate(row.createdAt),
                    },
                    {
                      key: "pricePaid",
                      header: "Оплачено",
                      render: (row) =>
                        formatSubscriptionPrice(row.pricePaid, row.currency),
                    },
                    {
                      key: "startedAt",
                      header: "Начало",
                      render: (row) => formatSubscriptionDate(row.startedAt),
                    },
                    {
                      key: "expiresAt",
                      header: "Окончание",
                      render: (row) => formatSubscriptionDate(row.expiresAt),
                    },
                    {
                      key: "status",
                      header: "Статус",
                      render: (row) => (
                        <StatusBadge
                          status={subscriptionStatusBadgeVariant(row.status)}
                          label={JOURNAL_SUBSCRIBER_STATUS_LABELS[row.status]}
                        />
                      ),
                    },
                  ]}
                />
              </div>
            )}
          </section>
        </div>
      ) : null}
    </>
  );
}
