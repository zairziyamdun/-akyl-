"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui";
import { Container } from "@/shared/ui/Container";

import { implementationFaq } from "../model/implementation.data";

export function ImplementationFaqSection() {
  return (
    <section
      className="border-b border-stone-200/80 py-16 sm:py-20"
      style={{ backgroundColor: "#f8f5ef" }}
      aria-label="Частые вопросы о практике внедрения AKYL"
      data-geo-faq
    >
      <Container>
        <p className="text-xs font-medium tracking-[0.14em] text-stone-500 uppercase">
          Вопросы
        </p>
        <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          Частые вопросы о внедрении
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
          Краткие ответы об этапах, старте проекта и результатах системного
          внедрения.
        </p>

        <div className="mt-10 divide-y divide-stone-200 rounded-2xl border border-stone-200/90 bg-white/90">
          {implementationFaq.map((item) => (
            <Collapsible key={item.question}>
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-stone-900 hover:bg-stone-50">
                {item.question}
                <span className="text-stone-400" aria-hidden>
                  +
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-5 text-sm leading-7 text-stone-600">
                {item.answer}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </Container>
    </section>
  );
}
