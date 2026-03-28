"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Header64() {
  return (
    <section className="px-[5%] py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        
        <div className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
          AKYL Tools
        </div>

        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
          Инструменты управления
        </h1>

        <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
          Набор цифровых инструментов для анализа, контроля и повышения
          эффективности управления многоквартирными домами. От расчёта индекса
          до комплексной аналитики.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          
          <Link href="/efficiency-index">
            <Button>Индекс эффективности</Button>
          </Link>

          <Link href="/methodology">
            <Button variant="secondary">Методология</Button>
          </Link>

        </div>

        <p className="mt-4 text-xs text-slate-400">
          Выберите инструмент и начните анализ
        </p>

      </div>
    </section>
  );
}