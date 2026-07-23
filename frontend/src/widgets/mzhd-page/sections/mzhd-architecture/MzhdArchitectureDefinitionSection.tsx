import { Container } from "@/shared/ui/Container";

import { mzhdArchitectureDefinition } from "../../model/mzhd-architecture.data";

export function MzhdArchitectureDefinitionSection() {
  return (
    <section
      className="border-b border-slate-200 bg-slate-50 py-12 sm:py-14"
      aria-labelledby="mzhd-architecture-definition-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase">
            Определение
          </p>
          <h2
            id="mzhd-architecture-definition-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Что такое архитектура системы управления МЖД
          </h2>
          <p
            data-geo-definition
            className="mt-5 text-base leading-8 text-slate-700 sm:text-lg"
          >
            {mzhdArchitectureDefinition}
          </p>
        </div>
      </Container>
    </section>
  );
}
