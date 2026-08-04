"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getPublicSubscriptionSettings,
  type JournalSubscriptionSettings,
  JournalSubscriptionApiError,
} from "@/entities/journal-subscription";
import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";
import { journalReveal } from "../model/journalMotion";

function formatPrice(price: number, currency: string): string {
  const formatted = new Intl.NumberFormat("ru-RU").format(price);
  if (currency === "KZT") return `${formatted} ₸`;
  return `${formatted} ${currency}`;
}

function formatDuration(months: number): string {
  if (months % 12 === 0) {
    const years = months / 12;
    if (years === 1) return "1 год";
    if (years >= 2 && years <= 4) return `${years} года`;
    return `${years} лет`;
  }
  if (months === 1) return "1 месяц";
  if (months >= 2 && months <= 4) return `${months} месяца`;
  return `${months} месяцев`;
}

export function JournalSubscriptionSection() {
  const [settings, setSettings] = useState<JournalSubscriptionSettings | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const data = await getPublicSubscriptionSettings();
        if (!cancelled) setSettings(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof JournalSubscriptionApiError
              ? err.message
              : "Не удалось загрузить условия подписки",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <Section id="subscription" className="scroll-mt-24 bg-white pb-16 sm:pb-24">
        <Container className="px-4 sm:px-6">
          <p className="text-center text-sm text-slate-500">
            Загрузка условий подписки…
          </p>
        </Container>
      </Section>
    );
  }

  if (error || !settings) {
    return null;
  }

  const canSubscribe = settings.isActive;

  return (
    <Section id="subscription" className="scroll-mt-24 bg-white pb-16 sm:pb-24">
      <Container className="px-4 sm:px-6">
        <motion.div
          {...journalReveal}
          className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm sm:p-10"
        >
          <p className="text-xs font-semibold tracking-wider text-sky-700 uppercase">
            Подписка на журнал
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-900 sm:text-3xl">
            {settings.title}
          </h2>
          {settings.description ? (
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {settings.description}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-2">
            <p className="font-[family-name:var(--font-sora)] text-3xl font-semibold text-slate-900 sm:text-4xl">
              {formatPrice(settings.price, settings.currency)}
            </p>
            <p className="pb-1 text-sm text-slate-500">
              на {formatDuration(settings.durationMonths)}
            </p>
          </div>

          {settings.benefits.length > 0 ? (
            <ul className="mt-6 space-y-2">
              {settings.benefits.map((benefit) => (
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

          <div className="mt-8">
            {canSubscribe ? (
              <Button asChild>
                <Link href="/login?returnUrl=/app/subscriptions">
                  Оформить подписку
                </Link>
              </Button>
            ) : (
              <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Оформление подписки временно недоступно.
              </p>
            )}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
