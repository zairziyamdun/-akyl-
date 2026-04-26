import Link from "next/link";
import { BarChart3, Layers, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const benefits = [
  {
    icon: Layers,
    title: "Финансы и план-факт",
    line: "Покажем отклонения и бюджетные риски без лишней сложности.",
  },
  {
    icon: ShieldCheck,
    title: "Контроль процессов",
    line: "Эксплуатация, заявки, подрядчики: видно, где система сбоит.",
  },
  {
    icon: BarChart3,
    title: "KPI и проблемные зоны",
    line: "Свяжем KPI с практическими выводами и следующими шагами.",
  },
] as const;

export function ManagementReportHero() {
  return (
    <header className="border-b border-black/5 bg-gradient-to-b from-slate-50 to-white">
      <Container className="py-14 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
              AKYL · инструменты управления
            </p>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-950 md:text-5xl lg:text-[3.1rem]">
              Управленческий отчет МЖД
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
              Инструмент для структурированного контроля, анализа и принятия
              решений по управлению многоквартирным домом.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild>
                <Link href="#report-constructor">Сформировать отчет</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/tools">К инструментам</Link>
              </Button>
            </div>
          </div>

          <aside aria-label="Преимущества инструмента" className="grid gap-3 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, line }) => (
              <div
                key={title}
                className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm ring-1 ring-black/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Icon className="size-5" aria-hidden />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{line}</p>
              </div>
            ))}
          </aside>
        </div>
      </Container>
    </header>
  );
}

