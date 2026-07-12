"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCheck,
  FileSpreadsheet,
  FileText,
  Gauge,
  Landmark,
  ListChecks,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { cn } from "@/shared/lib";

type ToolItem = {
  id: string;
  name: string;
  headline: string;
  description: string;
  cta: string;
  tag: string;
  icon: LucideIcon;
  href: "/tools/index-efficiency" | "/tools/budget-analysis" | "/tools/checklists" | "/tools/management-report";
  accent: string;
};

const TOOLS: ToolItem[] = [
  {
    id: "ieu",
    name: "Индекс эффективности",
    headline: "Оцените эффективность управления домом",
    description:
      "Комплексный индекс 0–100 на основе KPI управления, финансов, сервиса и эксплуатации.",
    cta: "Рассчитать индекс",
    tag: "KPI & Performance",
    icon: Gauge,
    href: "/tools/index-efficiency",
    accent: "from-indigo-500/25 to-sky-500/10",
  },
  {
    id: "budget",
    name: "Анализ бюджета",
    headline: "Поймите, где теряются деньги",
    description:
      "План-факт анализ бюджета, отклонения, финансовые риски и зоны оптимизации.",
    cta: "Анализировать бюджет",
    tag: "Finance & Plan-Fact",
    icon: Wallet,
    href: "/tools/budget-analysis",
    accent: "from-emerald-500/25 to-teal-500/10",
  },
  {
    id: "checklists",
    name: "Чек-листы",
    headline: "Проверьте процессы управления",
    description:
      "Интерактивные чек-листы для аудита эксплуатации, сервиса, документов и контроля качества.",
    cta: "Открыть чек-листы",
    tag: "Process Audit",
    icon: ListChecks,
    href: "/tools/checklists",
    accent: "from-amber-500/25 to-orange-500/10",
  },
  {
    id: "report",
    name: "Управленческий отчет",
    headline: "Соберите прозрачный отчет по дому",
    description:
      "Единый управленческий отчет с выводами, показателями и рекомендациями для принятия решений.",
    cta: "Сформировать отчет",
    tag: "Executive Reporting",
    icon: FileText,
    href: "/tools/management-report",
    accent: "from-violet-500/25 to-fuchsia-500/10",
  },
];

const PROCESS_FLOW = [
  { title: "Чек-листы", text: "собирают факты" },
  { title: "Анализ бюджета", text: "показывает финансовые отклонения" },
  { title: "Индекс эффективности", text: "переводит состояние управления в оценку 0–100" },
  { title: "Управленческий отчет", text: "собирает выводы" },
  { title: "Решения", text: "запускают улучшения" },
] as const;

const HERO_INTERVAL = 4500;

function HeroSection() {
  const [active, setActive] = useState(0);
  const activeTool = TOOLS[active];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TOOLS.length);
    }, HERO_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const ordered = useMemo(
    () => TOOLS.map((_, i) => TOOLS[(active + i) % TOOLS.length]),
    [active],
  );

  return (
    <section className="overflow-hidden border-b border-black/5 bg-[radial-gradient(ellipse_80%_60%_at_15%_0%,rgba(15,23,42,0.06),transparent_60%),radial-gradient(ellipse_60%_45%_at_85%_10%,rgba(99,102,241,0.10),transparent_62%),#fff] py-14 md:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Цифровая витрина AKYL
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Инструменты профессионального управления МЖД
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
              Практические цифровые решения для оценки эффективности, анализа бюджета, контроля
              процессов и формирования управленческой отчетности.
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTool.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className={cn(
                  "mt-8 rounded-2xl border border-black/10 bg-gradient-to-br p-5",
                  activeTool.accent,
                )}
              >
                <p className="text-sm font-medium text-slate-500">{activeTool.name}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  {activeTool.headline}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-700 md:text-base">
                  {activeTool.description}
                </p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href={activeTool.href}>
                      {activeTool.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative">
            <div className="hidden h-[470px] items-center justify-center lg:flex">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(15,23,42,0.08),transparent_75%)]" />
              <div className="relative h-[400px] w-[520px]">
                {ordered.map((tool, index) => {
                  const Icon = tool.icon;
                  const isActive = index === 0;
                  const offset = index - 1;
                  return (
                    <motion.button
                      key={`${tool.id}-${index}`}
                      type="button"
                      onClick={() => setActive(TOOLS.findIndex((item) => item.id === tool.id))}
                      className={cn(
                        "absolute left-1/2 top-1/2 h-[250px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border text-left",
                        "bg-gradient-to-br p-7 shadow-[0_24px_80px_-35px_rgba(15,23,42,0.55)] transition",
                        tool.accent,
                        isActive ? "border-slate-900/40" : "border-black/10",
                      )}
                      animate={{
                        x: offset * 118,
                        y: Math.abs(offset) * 10,
                        scale: isActive ? 1 : 0.86 - Math.min(Math.abs(offset), 2) * 0.04,
                        opacity: isActive ? 1 : 0.42,
                        rotate: isActive ? 0 : offset * 7,
                        zIndex: isActive ? 30 : 20 - Math.abs(offset),
                      }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
                          isActive ? "bg-slate-900 text-white" : "bg-white/85 text-slate-700",
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {tool.tag}
                      </div>
                      <p className="mt-7 text-xl font-semibold tracking-tight text-slate-950">
                        {tool.name}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">
                        {tool.headline}
                      </p>
                      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Нажмите, чтобы выбрать
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex gap-3 overflow-x-auto pb-2 lg:hidden">
              {ordered.map((tool, index) => {
                const Icon = tool.icon;
                const isActive = index === 0;
                return (
                  <motion.button
                    key={`${tool.id}-mobile-${index}`}
                    type="button"
                    onClick={() => setActive(TOOLS.findIndex((item) => item.id === tool.id))}
                    className={cn(
                      "min-w-[240px] rounded-2xl border bg-gradient-to-br p-5 text-left",
                      tool.accent,
                      isActive ? "border-slate-900/35" : "border-black/10",
                    )}
                    animate={{ scale: isActive ? 1 : 0.95, opacity: isActive ? 1 : 0.72 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-700">
                      <Icon className="h-3.5 w-3.5" />
                      {tool.tag}
                    </div>
                    <p className="mt-4 text-lg font-semibold tracking-tight text-slate-950">{tool.name}</p>
                    <p className="mt-2 text-sm text-slate-700">{tool.headline}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProblemsSection() {
  const cards = [
    "данные разбросаны по файлам и чатам",
    "бюджет сложно проверить",
    "нет единого показателя эффективности",
    "отчеты собираются вручную",
    "решения принимаются без аналитики",
  ];

  return (
    <section className="border-b border-black/5 bg-white py-16 md:py-20">
      <Container>
        <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
          Почему без инструментов управление остается непрозрачным
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((card, i) => (
            <motion.article
              key={card}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-2xl border border-black/10 bg-slate-50 p-5"
            >
              <p className="text-sm leading-relaxed text-slate-700">{card}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ToolsSystemSection() {
  return (
    <section className="border-b border-black/5 bg-slate-50 py-16 md:py-20">
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
          Инструменты AKYL работают как единая система
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {PROCESS_FLOW.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="relative rounded-2xl border border-black/10 bg-white p-5"
            >
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              {i < PROCESS_FLOW.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-400 md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ToolsGridSection() {
  const cards = [
    {
      title: "Индекс эффективности",
      description: "Диагностический продукт для быстрой оценки качества управления по ключевым блокам.",
      features: ["Интегральный балл 0–100", "Сравнение по блокам KPI", "Сигналы проблемных зон"],
      audience: "Для УК, акимата и консультантов",
      href: "/tools/index-efficiency" as const,
    },
    {
      title: "Анализ бюджета",
      description: "Финансовый модуль, который показывает отклонения, риски и точки для оптимизации затрат.",
      features: ["План-факт по статьям", "Оценка дефицита и риска", "Подсветка неэффективных расходов"],
      audience: "Для финблоков УК и советов домов",
      href: "/tools/budget-analysis" as const,
    },
    {
      title: "Чек-листы",
      description: "Операционный аудит процессов эксплуатации и сервиса с быстрым выявлением нарушений.",
      features: ["Шаблоны проверок", "Статусы выполнения", "Фиксация замечаний и приоритетов"],
      audience: "Для операционных команд и инспекции",
      href: "/tools/checklists" as const,
    },
    {
      title: "Управленческий отчет",
      description: "Конструктор сводной управленческой картины по дому для руководства и собственников.",
      features: ["Единая структура отчета", "Выводы и рекомендации", "Готовность к презентации решений"],
      audience: "Для руководителей УК и ОСИ",
      href: "/tools/management-report" as const,
    },
  ];

  return (
    <section className="border-b border-black/5 bg-white py-16 md:py-20">
      <Container>
        <div className="grid gap-5 md:grid-cols-2">
          {cards.map((card, i) => (
            <motion.article
              key={card.href}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-3xl border border-black/10 bg-gradient-to-b from-white to-slate-50 p-6 md:p-7"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{card.description}</p>

              <ul className="mt-5 space-y-2">
                {card.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-sm font-medium text-slate-800">{card.audience}</p>
              <div className="mt-5">
                <Button asChild variant="secondary">
                  <Link href={card.href}>Перейти к инструменту</Link>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function WorkflowSection() {
  const steps = [
    "Собрать данные",
    "Проверить процессы",
    "Посчитать показатели",
    "Сформировать отчет",
    "Принять решение",
  ];
  return (
    <section className="border-b border-black/5 bg-slate-950 py-16 text-white md:py-20">
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Один цикл профессионального управления
        </h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {steps.map((step, i) => (
            <li key={step} className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Шаг {i + 1}
              </p>
              <p className="mt-2 text-sm font-medium text-white">{step}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function AudiencesSection() {
  const items = [
    {
      title: "Акимат",
      text: "мониторинг качества управления домами",
      icon: Landmark,
    },
    {
      title: "Управляющая компания",
      text: "контроль KPI, бюджета и процессов",
      icon: Building2,
    },
    {
      title: "ОСИ / Совет дома",
      text: "прозрачность расходов и отчетности",
      icon: Users,
    },
    {
      title: "Эксперт / консультант",
      text: "аудит и внедрение методологии",
      icon: ShieldCheck,
    },
  ];
  return (
    <section className="border-b border-black/5 bg-white py-16 md:py-20">
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
          Для кого эти инструменты
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-black/10 bg-slate-50 p-5">
                <Icon className="h-5 w-5 text-slate-900" />
                <h3 className="mt-3 text-base font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function ToolsCtaSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <div className="rounded-3xl border border-black/10 bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-12 text-white md:px-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            Переход к системному управлению
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            Начните управлять домом на основе данных, а не ощущений
          </h2>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/tools/index-efficiency">
                Рассчитать индекс
                <BarChart3 className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/tools/budget-analysis">
                Перейти к анализу бюджета
                <FileSpreadsheet className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-slate-300">
            <CheckCheck className="h-4 w-4" />
            <span>Без тяжёлых библиотек. Только быстрые и понятные интерфейсы.</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ToolsLandingPage() {
  return (
    <main className="bg-white text-slate-900">
      <HeroSection />
      <ProblemsSection />
      <ToolsSystemSection />
      <ToolsGridSection />
      <WorkflowSection />
      <AudiencesSection />
      <ToolsCtaSection />
    </main>
  );
}
