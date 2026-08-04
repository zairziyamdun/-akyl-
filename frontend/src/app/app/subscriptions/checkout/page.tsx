"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  createMySubscription,
  formatSubscriptionDate,
  formatSubscriptionDuration,
  formatSubscriptionPrice,
  getMySubscriptionOverview,
  JOURNAL_SUBSCRIBER_STATUS_LABELS,
  type JournalSubscriber,
  type MySubscriptionOverview,
  JournalSubscriptionApiError,
  subscriptionStatusBadgeVariant,
} from "@/entities/journal-subscription";
import { Button } from "@/shared/ui/Button";
import { PageHeader, StatusBadge } from "@/widgets/dashboard-shell";
import { useToast } from "@/shared/ui/toast";

export default function SubscriptionCheckoutPage() {
  const { success: toastSuccess, error: toastError } = useToast();
  const [overview, setOverview] = useState<MySubscriptionOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<JournalSubscriber | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMySubscriptionOverview();
      setOverview(data);
      if (data.current?.status === "pending") {
        setCreated(data.current);
      }
    } catch (err) {
      setError(
        err instanceof JournalSubscriptionApiError
          ? err.message
          : "Не удалось загрузить условия подписки",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const offer = overview?.offer ?? null;
  const current = overview?.current ?? null;
  const blockedByActive = current?.status === "active";
  const alreadyPending = Boolean(created ?? current?.status === "pending");
  const canConfirm =
    Boolean(offer?.isActive) && !blockedByActive && !alreadyPending && !submitting;

  const handleConfirm = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const subscription = await createMySubscription();
      setCreated(subscription);
      setOverview((prev) =>
        prev
          ? {
              ...prev,
              current: subscription,
              history: [subscription, ...prev.history],
            }
          : prev,
      );
      toastSuccess("Оформление подписки начато");
    } catch (err) {
      const message =
        err instanceof JournalSubscriptionApiError
          ? err.message
          : "Не удалось оформить подписку";
      setError(message);
      toastError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Оформление подписки"
        description="Проверьте условия и подтвердите начало оформления"
      />

      <div className="mb-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/app/subscriptions">← К подписке</Link>
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Загрузка…</p>
      ) : error && !overview ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
          <div className="mt-3">
            <Button type="button" variant="secondary" onClick={() => void load()}>
              Повторить
            </Button>
          </div>
        </div>
      ) : offer ? (
        <section className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold tracking-wider text-sky-700 uppercase">
            Тариф
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-900">
            {offer.title}
          </h2>
          {offer.description ? (
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {offer.description}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-2">
            <p className="font-[family-name:var(--font-sora)] text-3xl font-semibold text-slate-900">
              {formatSubscriptionPrice(offer.price, offer.currency)}
            </p>
            <p className="pb-1 text-sm text-slate-500">
              на {formatSubscriptionDuration(offer.durationMonths)}
            </p>
          </div>

          {offer.benefits.length > 0 ? (
            <ul className="mt-6 space-y-2">
              {offer.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2 text-sm text-slate-700"
                >
                  <span
                    className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-semibold text-emerald-700"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          ) : null}

          {created || current?.status === "pending" ? (
            <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-emerald-900">
                  Заявка на оформление создана
                </p>
                <StatusBadge
                  status={subscriptionStatusBadgeVariant("pending")}
                  label={JOURNAL_SUBSCRIBER_STATUS_LABELS.pending}
                />
              </div>
              <p className="mt-2 text-sm text-emerald-800">
                Цена зафиксирована:{" "}
                {formatSubscriptionPrice(
                  (created ?? current)!.pricePaid,
                  (created ?? current)!.currency,
                )}
                . Оплата будет подключена позже — статус останется «Ожидает»,
                пока подписка не активирована.
              </p>
              <p className="mt-2 text-xs text-emerald-700/80">
                Создана:{" "}
                {formatSubscriptionDate((created ?? current)!.createdAt)}
              </p>
              <div className="mt-4">
                <Button asChild variant="secondary">
                  <Link href="/app/subscriptions">Вернуться к подписке</Link>
                </Button>
              </div>
            </div>
          ) : blockedByActive ? (
            <p className="mt-8 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              У вас уже есть активная подписка до{" "}
              {formatSubscriptionDate(current.expiresAt)}. Новую оформить нельзя.
            </p>
          ) : !offer.isActive ? (
            <p className="mt-8 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Оформление подписки временно недоступно.
            </p>
          ) : (
            <div className="mt-8 space-y-3">
              {error ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              ) : null}
              <p className="text-sm text-slate-500">
                Нажимая кнопку, вы создаёте заявку на оформление. Платёжный шлюз
                пока не подключён.
              </p>
              <Button
                type="button"
                disabled={!canConfirm}
                onClick={() => void handleConfirm()}
              >
                {submitting ? "Оформление…" : "Подтвердить оформление"}
              </Button>
            </div>
          )}
        </section>
      ) : null}
    </>
  );
}
