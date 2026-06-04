import Link from "next/link";

import { Container } from "@/components/ui/Container";

const cards = [
  {
    title: "База знаний",
    text: "Статьи и материалы о логике KPI: зачем измерять, как связать цели дома с показателями и циклом управления.",
    href: "/library",
  },
  {
    title: "Инструменты",
    text: "Дают шаблоны и практические материалы, в том числе для быстрого старта отчётности и совета.",
    href: "/tools",
  },
  {
    title: "AKYL",
    text: "Помогает внедрить и сопроводить: от настройки набора показателей до регулярного разбора отклонений.",
    href: "/consultation",
  },
] as const;

export function KpiTemplatesEcosystem() {
  return (
    <section
      className="border-t border-black/5 py-16 md:py-20"
      aria-labelledby="kpi-ecosystem-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="kpi-ecosystem-heading"
            className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
          >
            Связь с экосистемой AKYL
          </h2>
          <p className="mt-4 text-slate-600">
            Страница KPI — часть единой платформы, а не отдельный документ без
            контекста.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <li key={card.title}>
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-950 group-hover:text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {card.text}
                </p>
                <span className="mt-4 text-sm font-medium text-slate-900">
                  Перейти →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
