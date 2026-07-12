import { Scale } from "lucide-react";

import { Container } from "@/shared/ui/Container";
import { mzhdStandardsResponsibilityLines } from "@/widgets/mzhd-page";

export function MzhdStandardsResponsibilitySection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <Scale className="text-slate-700" size={32} />
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Ответственность
        </h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          Каждая роль имеет зону ответственности, KPI и механизм подотчётности.
          Решения фиксируются, исполнение контролируется.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {mzhdStandardsResponsibilityLines.map((line) => (
            <div
              key={line}
              className="rounded-xl bg-white p-5 text-sm font-medium shadow-sm"
            >
              {line}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
