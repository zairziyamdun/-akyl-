import { Container } from "@/shared/ui/Container";

import { mzhdProcessesDefinition } from "../../model/mzhd-processes.data";

export function MzhdProcessesDefinitionSection() {
  return (
    <section
      className="border-b border-slate-200 bg-slate-50 py-12 sm:py-14"
      aria-labelledby="mzhd-processes-definition-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase">
            Определение
          </p>
          <h2
            id="mzhd-processes-definition-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Что такое бизнес-процессы управления МЖД
          </h2>
          <p
            data-geo-definition
            className="mt-5 text-base leading-8 text-slate-700 sm:text-lg"
          >
            {mzhdProcessesDefinition}
          </p>
        </div>
      </Container>
    </section>
  );
}
