import { Container } from "@/shared/ui/Container";

import { implementationDefinition } from "../model/implementation.data";

export function ImplementationDefinitionSection() {
  return (
    <section
      className="border-b border-stone-200/80 py-12 sm:py-14"
      style={{ backgroundColor: "#f8f5ef" }}
      aria-labelledby="implementation-definition-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium tracking-[0.14em] text-stone-500 uppercase">
            Определение
          </p>
          <h2
            id="implementation-definition-heading"
            className="mt-3 font-[family-name:var(--font-sora)] text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl"
          >
            Что такое практика внедрения AKYL
          </h2>
          <p
            data-geo-definition
            className="mt-5 text-base leading-8 text-stone-700 sm:text-lg"
          >
            {implementationDefinition}
          </p>
        </div>
      </Container>
    </section>
  );
}
