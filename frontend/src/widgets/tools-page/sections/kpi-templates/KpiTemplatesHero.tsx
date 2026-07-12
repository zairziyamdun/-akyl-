import Link from "next/link";

import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";

function KpiPreviewCard() {
  return (
    <aside
      aria-label="Пример панели KPI"
      className="relative mx-auto w-full max-w-md rounded-2xl border border-black/10 bg-white p-5 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)] ring-1 ring-black/5 transition duration-300 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.2)] lg:mx-0"
    >
      <div className="flex items-center justify-between border-b border-black/5 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          Панель контроля
        </p>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          МЖД · квартал
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        <li className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
          <span className="text-sm text-slate-600">Собираемость</span>
          <span className="text-sm font-semibold tabular-nums text-slate-900">
            92%
          </span>
        </li>
        <li className="flex items-center justify-between rounded-xl border border-black/5 px-3 py-2.5">
          <span className="text-sm text-slate-600">Заявки в срок</span>
          <span className="text-sm font-semibold tabular-nums text-slate-900">
            88%
          </span>
        </li>
        <li className="flex items-center justify-between rounded-xl border border-black/5 px-3 py-2.5">
          <span className="text-sm text-slate-600">Просрочки работ</span>
          <span className="text-sm font-semibold tabular-nums text-amber-800">
            4%
          </span>
        </li>
        <li className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
          <span className="text-sm text-slate-600">Оценка жителей</span>
          <span className="text-sm font-semibold tabular-nums text-slate-900">
            4.2 / 5
          </span>
        </li>
      </ul>
      <p className="mt-4 text-center text-xs text-slate-400">
        Демонстрационный вид · не реальные данные
      </p>
    </aside>
  );
}

export function KpiTemplatesHero() {
  return (
    <header className="border-b border-black/5 bg-gradient-to-b from-slate-50 to-white">
      <Container className="py-14 md:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
          <div>
            <p className="mb-4 inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
              AKYL · KPI
            </p>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-950 md:text-5xl lg:text-[3.25rem]">
              KPI шаблоны для профессионального управления МЖД
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              Готовые показатели, структура контроля и шаблоны для оценки
              финансов, процессов, качества управления и удовлетворенности
              жителей.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild>
                <Link href="/library/templates">Скачать шаблоны</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/consultation">Получить консультацию</Link>
              </Button>
            </div>
          </div>
          <KpiPreviewCard />
        </div>
      </Container>
    </header>
  );
}
