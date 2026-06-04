import { Workflow } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { mzhdArchitectureProcessRows } from "@/data/mzhdArchitectureData";

export function MzhdArchitectureProcessesSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
      <Container>
        <h2 className="text-3xl font-semibold sm:text-4xl">Процессы управления</h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          Архитектура связывает стратегические, операционные и исполнительские процессы в единую карту
          ответственности.
        </p>
        <div className="mt-8 space-y-3">
          {mzhdArchitectureProcessRows.map((row) => (
            <div key={row} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
              <Workflow size={18} className="shrink-0 text-slate-500" />
              <span className="text-sm font-medium">{row}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
