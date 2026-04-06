import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionShell } from "@/components/ui/SectionShell";

export const metadata: Metadata = {
  title: "Теория управления МЖД | AKYL",
  description:
    "Системный и научный подход к управлению многоквартирным домом в логике методологии AKYL.",
};

export default function MethodologyTheoryPage() {
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
                Теория управления МЖД
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Базовые принципы системной модели: участники, связи, циклы
                решений и критерии зрелости управления.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <SectionShell className="border-t border-black/5 bg-white">
        <div className="lg:col-span-8">
          <p className="text-base leading-relaxed text-slate-600">
            Здесь будет развёрнутый теоретический блок. Пока используйте{" "}
            <Link
              href="/library"
              className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
            >
              библиотеку знаний
            </Link>{" "}
            и{" "}
            <Link
              href="/library/books"
              className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
            >
              книги
            </Link>
            .
          </p>
        </div>
      </SectionShell>
    </div>
  );
}
