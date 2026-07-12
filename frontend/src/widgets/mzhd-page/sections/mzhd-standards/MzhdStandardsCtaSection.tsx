import Link from "next/link";

import { Container } from "@/shared/ui/Container";
import { mzhdStandardsCta } from "@/widgets/mzhd-page";

export function MzhdStandardsCtaSection() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-violet-950 px-8 py-12 text-white sm:px-12">
          <div className="pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-violet-500/30 blur-3xl" />
          <h2 className="relative text-2xl font-semibold sm:text-3xl">
            {mzhdStandardsCta.title}
          </h2>
          <p className="relative mt-3 max-w-lg text-white/70">
            {mzhdStandardsCta.description}
          </p>
          <div className="relative mt-8 flex flex-wrap gap-4">
            <Link
              href="/consultation"
              className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950"
            >
              Получить консультацию
            </Link>
            <Link
              href="/mzhd"
              className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white"
            >
              Вернуться к методологии
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
