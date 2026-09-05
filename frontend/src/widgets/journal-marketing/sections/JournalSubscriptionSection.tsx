"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getPublicSubscriptionSettings,
  type JournalSubscriptionSettings,
  JournalSubscriptionApiError,
} from "@/entities/journal-subscription";
import { useJournalAccess } from "@/features/manage-journal-issue/model/useJournalAccess";
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
  const { loading: accessLoading, hasActiveAccess, current } =
    useJournalAccess();
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

  if (loading || accessLoading) {
    return (
      <Section
        id="subscription"
        className="scroll-mt-24 border-t border-slate-200 bg-slate-950 pb-16 sm:pb-24"
      >
        <Container className="px-4 sm:px-6">
          <p className="text-center text-sm text-white/45">
            Загрузка условий подписки…
          </p>
        </Container>
      </Section>
    );
  }

  if (error || !settings) {
    return null;
  }

  const hasOpenSubscription =
    hasActiveAccess || current?.status === "pending";
  const canSubscribe = settings.isActive && !hasOpenSubscription;

  return (
    <Section
      id="subscription"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-white/10 bg-slate-950 pb-16 text-white sm:pb-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(56,189,248,0.12),transparent_55%)]"
        aria-hidden
      />

      <Container className="relative px-4 sm:px-6">
        <motion.div
          {...journalReveal}
          className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300/90">
              Подписка на журнал
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {settings.title}
            </h2>
            {settings.description ? (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
                {settings.description}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-end gap-x-5 gap-y-2 border-t border-white/10 pt-8">
              <p className="font-[family-name:var(--font-sora)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {formatPrice(settings.price, settings.currency)}
              </p>
              <p className="pb-1.5 text-sm text-white/45">
                на {formatDuration(settings.durationMonths)}
              </p>
            </div>

            <div className="mt-8">
              {hasActiveAccess ? (
                <div className="space-y-4">
                  <p className="border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                    У вас уже есть активная подписка.
                  </p>
                  <Link
                    href="/app/subscriptions"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-sky-50 hover:pr-7"
                  >
                    Моя подписка
                    <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              ) : current?.status === "pending" ? (
                <Link
                  href="/app/subscriptions/checkout"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-sky-50 hover:pr-7"
                >
                  Продолжить оформление
                  <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ) : canSubscribe ? (
                <Link
                  href="/app/subscriptions/checkout"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-sky-50 hover:pr-7"
                >
                  Оформить подписку
                  <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ) : (
                <p className="border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/55">
                  Оформление подписки временно недоступно.
                </p>
              )}
            </div>
          </div>

          {settings.benefits.length > 0 ? (
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {settings.benefits.map((benefit, i) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-start gap-3 py-4"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-400/15 text-sky-300 transition duration-300 group-hover:bg-sky-400/25 group-hover:text-sky-200">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm leading-relaxed text-white/70 transition duration-300 group-hover:text-white/90">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>
          ) : null}
        </motion.div>
      </Container>
    </Section>
  );
}
