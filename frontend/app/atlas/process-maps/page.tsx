import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionShell } from "@/components/ui/SectionShell";

export const metadata: Metadata = {
  title: "Карты процессов | Атлас AKYL",
  description: "Пошаговые карты бизнес-процессов управления МЖД.",
};

export default function AtlasProcessMapsPage() {
  return (
    <div className="w-full bg-white text-slate-900">
      <section className="border-b border-black/5 bg-slate-50 py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <Link
                href="/atlas"
                className="text-sm text-slate-600 transition hover:text-slate-900"
              >
                ← Атлас
              </Link>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                Карты процессов
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Типовые процессы управления домом в наглядном виде.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <SectionShell className="border-t border-black/5 bg-white">
        <div className="lg:col-span-8">
          <p className="text-base leading-relaxed text-slate-600">
            Контент раздела будет дополняться. Рекомендуем также раздел{" "}
            <Link
              href="/tools/checklists"
              className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
            >
              чек-листов
            </Link>{" "}
            для операционной самопроверки.
          </p>
        </div>
      </SectionShell>
    </div>
  );
}
