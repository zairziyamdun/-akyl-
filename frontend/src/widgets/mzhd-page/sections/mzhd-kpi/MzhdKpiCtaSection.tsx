import Link from "next/link";

import { Container } from "@/shared/ui/Container";
import { mzhdKpiCta } from "@/widgets/mzhd-page";

export function MzhdKpiCtaSection() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <div className="rounded-3xl bg-slate-900 px-8 py-12 text-white sm:px-12">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            {mzhdKpiCta.title}
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/consultation"
              className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950"
            >
              Получить консультацию
            </Link>
            <Link
              href="/tools/kpi-templates"
              className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white"
            >
              KPI-шаблоны
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
