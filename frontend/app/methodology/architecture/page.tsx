import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionShell } from "@/components/ui/SectionShell";

export const metadata: Metadata = {
  title: "Архитектура системы управления МЖД | AKYL",
  description:
    "Компоненты, связи и уровни системы управления многоквартирными домами.",
};

export default function MethodologyArchitecturePage() {
  return (
    <div className="w-full bg-white text-slate-900">
      <section className="border-b border-black/5 bg-slate-50 py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <Link
                href="/methodology"
                className="text-sm text-slate-600 transition hover:text-slate-900"
              >
                ← Методология
              </Link>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                Архитектура системы
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Как методология, роли, процессы, финансы и цифровой контур
                собираются в единую управляемую модель.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <SectionShell className="border-t border-black/5 bg-white">
        <div className="lg:col-span-8">
          <p className="text-base leading-relaxed text-slate-600">
            На главной странице сайта представлен блок «Архитектура» с обзором
            слоёв. Детальный материал по разделу будет расширяться; см. также{" "}
            <Link
              href="/atlas/architecture"
              className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
            >
              атлас: архитектура
            </Link>
            .
          </p>
        </div>
      </SectionShell>
    </div>
  );
}
