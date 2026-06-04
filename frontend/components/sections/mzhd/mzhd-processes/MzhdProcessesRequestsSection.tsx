import { ClipboardList } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { mzhdProcessesRequestSteps } from "@/data/mzhdProcessesData";

export function MzhdProcessesRequestsSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex items-start gap-4">
          <ClipboardList className="shrink-0 text-sky-700" size={32} />
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Управление заявками</h2>
            <p className="mt-4 max-w-3xl text-slate-600">
              Единый канал приёма, классификация, SLA, эскалация и закрытие с обратной связью жителю.
              Основа сервисного качества и цифровизации.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          {mzhdProcessesRequestSteps.map((s) => (
            <div key={s} className="rounded-xl bg-sky-50 py-4 text-center text-sm font-semibold text-sky-900">
              {s}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
