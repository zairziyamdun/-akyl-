import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionShell } from "@/components/ui/SectionShell";

export const metadata: Metadata = {
  title: "Роли участников управления МЖД | AKYL",
  description:
    "Ответственность, взаимодействие и управленческие роли в модели AKYL.",
};

export default function MethodologyRolesPage() {
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
                Роли участников
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Матрица полномочий и взаимодействий: собственники, УК,
                подрядчики, регулятор.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <SectionShell className="border-t border-black/5 bg-white">
        <div className="lg:col-span-8">
          <p className="text-base leading-relaxed text-slate-600">
            Раздел в разработке. Связанные материалы — в{" "}
            <Link
              href="/library"
              className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
            >
              библиотеке
            </Link>{" "}
            и{" "}
            <Link
              href="/atlas/interactions"
              className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
            >
              схемах взаимодействия
            </Link>
            .
          </p>
        </div>
      </SectionShell>
    </div>
  );
}
