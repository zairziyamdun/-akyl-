import { Container } from "@/shared/ui/Container";

import { mzhdFinanceDefinition } from "../../model/mzhd-finance.data";

export function MzhdFinanceDefinitionSection() {
  return (
    <section
      className="border-b border-slate-200 bg-slate-50 py-12 sm:py-14"
      aria-labelledby="mzhd-finance-definition-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase">
            Определение
          </p>
          <h2
            id="mzhd-finance-definition-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Что такое финансовое управление МЖД
          </h2>
          <p
            data-geo-definition
            className="mt-5 text-base leading-8 text-slate-700 sm:text-lg"
          >
            {mzhdFinanceDefinition}
          </p>
        </div>
      </Container>
    </section>
  );
}
