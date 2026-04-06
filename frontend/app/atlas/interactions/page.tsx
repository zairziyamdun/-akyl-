import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionShell } from "@/components/ui/SectionShell";

export const metadata: Metadata = {
  title: "Схемы взаимодействия | Атлас AKYL",
  description:
    "Модели коммуникаций, ролей и принятия решений при управлении МЖД.",
};

export default function AtlasInteractionsPage() {
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
                Схемы взаимодействия
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Как участники системы сходятся в решениях и коммуникациях.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <SectionShell className="border-t border-black/5 bg-white">
        <div className="lg:col-span-8">
          <p className="text-base leading-relaxed text-slate-600">
            Раздел в наполнении. Дополнительно:{" "}
            <Link
              href="/methodology/roles"
              className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
            >
              роли в методологии
            </Link>
            .
          </p>
        </div>
      </SectionShell>
    </div>
  );
}
