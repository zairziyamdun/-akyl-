import { Settings } from "lucide-react";

import { Container } from "@/shared/ui/Container";
import { mzhdKpiTechnicalItems } from "@/widgets/mzhd-page";

export function MzhdKpiTechnicalSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Settings className="text-slate-700" size={32} />
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Технические KPI
        </h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          Состояние инженерных систем, аварийность, выполнение графиков ТО и
          срок устранения неисправностей.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {mzhdKpiTechnicalItems.map((kpi) => (
            <li
              key={kpi}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium"
            >
              {kpi}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
