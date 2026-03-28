"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Header64() {
  return (
    <section className="px-[5%] py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        
        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
          IEU System
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
          Индекс эффективности управления
        </h1>

        {/* Description */}
        <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
          Оцените качество управления вашим домом в цифрах — от эксплуатации и
          финансов до сервиса и прозрачности. Получите объективную картину и
          понимание, где требуются улучшения.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          
          <Link href="#calculator">
            <Button>Рассчитать индекс</Button>
          </Link>

          <Link href="/methodology">
            <Button variant="secondary">Как это работает</Button>
          </Link>

        </div>

        {/* Extra hint */}
        <p className="mt-4 text-xs text-slate-400">
          Расчёт занимает менее 1 минуты
        </p>

      </div>
    </section>
  );
}