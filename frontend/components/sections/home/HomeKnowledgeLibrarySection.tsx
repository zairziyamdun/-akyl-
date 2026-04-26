"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, LayoutTemplate, Scale, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { homeTransition, homeViewport } from "@/lib/homePageMotion";

const tabs = [
  { id: "books", label: "Книги", icon: BookOpen, href: "/library/books", blurb: "Методология и разбор кейсов в книжном формате." },
  { id: "analytics", label: "Аналитика и статьи", icon: Sparkles, href: "/library", blurb: "Экспертные материалы и обзоры практики." },
  { id: "research", label: "Исследования", icon: FileText, href: "/library", blurb: "Срезы рынка и управленческие исследования." },
  { id: "templates", label: "Шаблоны", icon: LayoutTemplate, href: "/tools/kpi-templates", blurb: "Готовые формы KPI и управленческих отчётов." },
  { id: "legal", label: "Нормативка", icon: Scale, href: "/library", blurb: "Ориентиры и структура документооборота." },
] as const;

export function HomeKnowledgeLibrarySection() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("books");

  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  const Icon = current.icon;

  return (
    <section className="border-b border-slate-200/80 bg-white">
      <Container className="py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={homeViewport}
          transition={homeTransition}
          className="max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            База знаний
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Материалы, с которыми можно работать
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Единая витрина: от книг до шаблонов — без библиотечной скуки.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                active === t.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-10 grid gap-8 rounded-3xl border border-slate-200 bg-slate-50 p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10"
        >
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
              <Icon className="h-7 w-7 text-slate-900" strokeWidth={1.4} />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-slate-900">{current.label}</h3>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-slate-600">{current.blurb}</p>
          </div>
          <Link
            href={current.href}
            className="inline-flex h-fit shrink-0 items-center justify-center self-start rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 lg:self-center"
          >
            Открыть раздел
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
