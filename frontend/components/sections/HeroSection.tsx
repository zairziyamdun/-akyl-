"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

export function HeroSection() {
  return (
    <section className="relative py-[19px]">
      <Container className="!px-0">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950 shadow-[0_25px_80px_-20px_rgba(15,23,42,0.45)]">
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src={HOME_IMAGE_URL}
              alt="Система управления многоквартирными домами"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/75 to-slate-950/70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_30%)]" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex min-h-[34rem] flex-col justify-center px-6 py-14 text-center sm:px-8 md:min-h-[42rem] md:px-12 md:py-20 lg:px-16">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm md:mb-8">
                AKYL Platform
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Система управления многоквартирными жилыми домами
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80 md:mt-6 md:text-lg md:leading-8">
                Методология и платформа, объединяющая процессы, финансы,
                участников и данные в единую управляемую систему. AKYL
                превращает хаос в порядок и делает управление прозрачным,
                измеримым и устойчивым.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:mt-10">
                <Link href="/methodology">
                  <Button>Методология</Button>
                </Link>

                <Link href="/consulting">
                  <Button variant="secondary">Консультация</Button>
                </Link>
              </div>
            </div>

            {/* Bottom stats */}
            <div className="mx-auto mt-12 grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-left backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.14em] text-white/60">
                  Методология
                </p>
                <p className="mt-2 text-sm font-medium text-white/90">
                  Единая логика управления домом
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-left backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.14em] text-white/60">
                  Финансы
                </p>
                <p className="mt-2 text-sm font-medium text-white/90">
                  Контроль бюджета и собираемости
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-left backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.14em] text-white/60">
                  Коммуникация
                </p>
                <p className="mt-2 text-sm font-medium text-white/90">
                  Прозрачность для жильцов и УК
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-left backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.14em] text-white/60">
                  Аналитика
                </p>
                <p className="mt-2 text-sm font-medium text-white/90">
                  Метрики и индекс эффективности
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}