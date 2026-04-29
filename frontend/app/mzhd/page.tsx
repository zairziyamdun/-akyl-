"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Building2,
  Building,
  CircleDollarSign,
  Gauge,
  Handshake,
  Landmark,
  Layers,
  Network,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const sectionMotion = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const problemCards = [
  {
    title: "Непрозрачные финансы",
    description:
      "Собственники не видят полную структуру расходов, что подрывает доверие и усложняет бюджетирование.",
  },
  {
    title: "Хаос в процессах",
    description:
      "Работы выполняются реактивно, без единого регламента, SLA и последовательности процессов.",
  },
  {
    title: "Размытая ответственность",
    description:
      "Участники системы не имеют четких зон ответственности, что ведет к конфликтам и потерям времени.",
  },
  {
    title: "Отсутствие KPI и контроля",
    description:
      "Без измеримых метрик невозможно оценивать качество управления и управлять улучшениями.",
  },
];

const methodologyCards = [
  {
    title: "Теория управления МЖД",
    description: "Базовые принципы системного управления жилым домом как активом.",
    href: "/mzhd/theory",
    icon: Landmark,
  },
  {
    title: "Архитектура системы",
    description: "Уровни, связи и логика принятия решений внутри модели управления.",
    href: "/mzhd/architecture",
    icon: Layers,
  },
  {
    title: "Роли участников",
    description: "Ответственность жителей, УК, ОСИ, подрядчиков и регулирующих структур.",
    href: "/mzhd/roles",
    icon: Users,
  },
  {
    title: "Бизнес-процессы",
    description: "Операционные контуры: заявки, обслуживание, коммуникации, контроль качества.",
    href: "/mzhd/processes",
    icon: Workflow,
  },
  {
    title: "Финансовое управление",
    description: "Планирование бюджета, контроль исполнения, прозрачность платежей и отчетность.",
    href: "/mzhd/finance",
    icon: CircleDollarSign,
  },
  {
    title: "KPI и эффективность",
    description: "Система измеримости по финансам, эксплуатации, сервису и управлению.",
    href: "/mzhd/kpi",
    icon: Gauge,
  },
  {
    title: "Принципы и стандарты",
    description: "Единые требования к качеству, регламентам и устойчивости управления МЖД.",
    href: "/mzhd/standards",
    icon: ShieldCheck,
  },
];

const systemBlocks = [
  "Объект управления",
  "Участники",
  "Процессы",
  "Финансы",
  "Данные и обратная связь",
];

const ieuRows = [
  { label: "Финансы", value: 84 },
  { label: "Эксплуатация", value: 79 },
  { label: "Сервис", value: 77 },
  { label: "Подрядчики", value: 80 },
  { label: "Управление", value: 90 },
];

const audienceCards = [
  {
    title: "Для акиматов",
    description:
      "Наглядный стандарт управления жилищным фондом, единые KPI и база для управленческих решений.",
    icon: Building2,
  },
  {
    title: "Для управляющих компаний",
    description:
      "Готовая рамка для процессов, финансов и контроля качества, повышающая эффективность команд.",
    icon: Building,
  },
  {
    title: "Для ОСИ и советов домов",
    description:
      "Понимание структуры управления, прозрачность работы УК и инструменты обоснованного контроля.",
    icon: Handshake,
  },
];

export default function MzhdPage() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-slate-50 text-slate-900">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2000&q=80"
            alt="Современный жилой район"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/72" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/65" />
        </div>

        <Container className="relative py-18 sm:py-20 lg:py-24">
          <motion.div
            className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12"
            {...sectionMotion}
          >
            <div>
              <span className="inline-flex rounded-full border border-slate-200 bg-white/85 px-4 py-1.5 text-xs font-medium tracking-[0.16em] text-slate-600 uppercase">
                Управление МЖД
              </span>
              <h1 className="mt-6 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Управление МЖД как профессиональная система
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">
                Методология AKYL объединяет архитектуру управления, роли
                участников, бизнес-процессы, финансы, KPI и цифровые инструменты
                в единую систему управления многоквартирным домом.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="#methodology">Изучить методологию</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/tools">Перейти к инструментам</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/90 bg-white/92 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">Индекс управления</p>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Системное управление
                </span>
              </div>
              <p className="mt-3 text-4xl font-semibold tracking-tight">82 / 100</p>
              <div className="mt-6 space-y-4">
                {[
                  ["Финансы", 84],
                  ["Эксплуатация", 79],
                  ["Сервис", 77],
                  ["Прозрачность", 88],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-slate-600">{label}</span>
                      <span className="font-medium text-slate-800">{value}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-slate-900"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-medium text-slate-800">Контур управления</p>
                <p className="mt-2">Жители → УК → Подрядчики → Данные → Контроль</p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <motion.section className="py-16 sm:py-20" {...sectionMotion}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Почему традиционное управление МЖД не работает
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {problemCards.map((card) => (
                  <article
                    key={card.title}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {card.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div className="relative h-[320px] overflow-hidden rounded-3xl border border-slate-200 shadow-lg sm:h-[420px]">
              <Image
                src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80"
                alt="Жилой дом и городская инфраструктура"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </motion.section>

      <motion.section className="py-16 sm:py-20" {...sectionMotion}>
        <Container>
          <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            МЖД - это не просто дом, а управляемая система
          </h2>
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {systemBlocks.map((block) => (
              <div
                key={block}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-sm font-medium shadow-sm"
              >
                {block}
              </div>
            ))}
          </div>
          <div className="mx-auto mt-5 w-fit rounded-2xl border border-slate-900 bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-lg">
            МЖД
          </div>
        </Container>
      </motion.section>

      <motion.section id="methodology" className="py-16 sm:py-20" {...sectionMotion}>
        <Container>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Методология профессионального управления
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {methodologyCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="inline-flex rounded-xl bg-slate-100 p-2.5 text-slate-700">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className="mt-5 inline-flex text-sm font-medium text-slate-900 underline-offset-4 transition group-hover:underline"
                  >
                    Подробнее
                  </Link>
                </article>
              );
            })}
          </div>
        </Container>
      </motion.section>

      <motion.section className="py-16 sm:py-20" {...sectionMotion}>
        <Container>
          <div className="grid gap-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:grid-cols-2 lg:p-10">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Архитектура управления домом
              </h2>
              <p className="mt-4 text-slate-600">
                Профессиональная модель управления выстраивается по уровням,
                где каждый уровень имеет свои роли, решения и цифровой контур контроля.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "стратегический уровень",
                  "операционный уровень",
                  "исполнительский уровень",
                  "цифровой контроль",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-slate-900" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80"
                alt="Управляющая команда и аналитика"
                fill
                className="object-cover opacity-18"
              />
              <div className="relative space-y-3">
                <div className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    Стратегический
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    Политика, стандарты, цели
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    Операционный
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    Регламенты, маршруты работ, контроль SLA
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    Исполнительский + цифровой слой
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    Заявки, подрядчики, дашборды, аудит
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </motion.section>

      <motion.section className="py-16 sm:py-20" {...sectionMotion}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Эффективность должна быть измеримой
              </h2>
              <p className="mt-4 max-w-2xl text-slate-600">
                IEU отражает целостность управления домом: от финансовой устойчивости
                до качества сервисных процессов и прозрачности исполнения.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm">
                <Activity size={16} className="text-emerald-600" />
                Статус: Системное управление
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_56px_rgba(15,23,42,0.1)]">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500">Общий индекс IEU</p>
                  <p className="text-4xl font-semibold tracking-tight">82/100</p>
                </div>
                <Network className="text-slate-400" />
              </div>
              <div className="mt-6 space-y-3">
                {ieuRows.map((row) => (
                  <div key={row.label}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="text-slate-600">{row.label}</span>
                      <span className="font-medium text-slate-800">{row.value}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-slate-900"
                        style={{ width: `${row.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-7">
                <Button asChild className="w-full">
                  <Link href="/tools/index-efficiency">Рассчитать индекс</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </motion.section>

      <motion.section className="py-16 sm:py-20" {...sectionMotion}>
        <Container>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Для кого создан раздел
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {audienceCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="inline-flex rounded-xl bg-slate-100 p-2.5 text-slate-700">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </motion.section>

      <motion.section className="pb-18 pt-14 sm:pb-22 sm:pt-18" {...sectionMotion}>
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] sm:p-10 lg:p-12">
            <div className="absolute -top-20 right-0 h-52 w-52 rounded-full bg-slate-100 blur-3xl" />
            <div className="absolute -bottom-20 left-0 h-52 w-52 rounded-full bg-emerald-100/50 blur-3xl" />
            <div className="relative">
              <h2 className="max-w-3xl text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
                Перейдите от хаотичного администрирования к профессиональному
                управлению
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/tools">Открыть инструменты</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/library">Изучить библиотеку</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </motion.section>
    </main>
  );
}
