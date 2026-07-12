import Link from "next/link";
import { Gauge } from "lucide-react";

import { Container } from "@/shared/ui/Container";
import { mzhdKpiIeu } from "@/widgets/mzhd-page";

export function MzhdKpiIeuSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Gauge className="text-indigo-700" size={32} />
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Индекс эффективности управления</h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          IEU объединяет финансы, эксплуатацию, сервис, подрядчиков и управление в один интегральный
          показатель от 0 до 100.
        </p>
        <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-indigo-800">{mzhdKpiIeu.exampleLabel}</p>
            <p className="mt-2 font-[family-name:var(--font-sora)] text-5xl font-semibold text-indigo-950">
              {mzhdKpiIeu.score}
              <span className="text-2xl text-indigo-700">/{mzhdKpiIeu.maxScore}</span>
            </p>
          </div>
          <Link
            href="/tools/index-efficiency"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-indigo-900 px-6 py-3 text-sm font-semibold text-white"
          >
            {mzhdKpiIeu.calculateLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
