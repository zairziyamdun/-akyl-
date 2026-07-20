import Link from "next/link";

import { Container } from "@/shared/ui/Container";
import { mzhdTheoryCta } from "@/widgets/mzhd-page";

export function MzhdTheoryCtaSection() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-12 text-white sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-[family-name:var(--font-sora)] text-2xl font-semibold sm:text-3xl">
              {mzhdTheoryCta.title}
            </h2>
            <p className="mt-4 text-white/70">{mzhdTheoryCta.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/consultation"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Получить консультацию
              </Link>
              <Link
                href="/implementation"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Практика внедрения
              </Link>
              <Link
                href="/mzhd"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/5"
              >
                К методологии
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
