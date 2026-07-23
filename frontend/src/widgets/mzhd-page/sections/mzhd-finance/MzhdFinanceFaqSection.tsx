"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui";
import { Container } from "@/shared/ui/Container";

import { mzhdFinanceFaq } from "../../model/mzhd-finance.data";

export function MzhdFinanceFaqSection() {
  return (
    <section
      className="py-16 sm:py-20"
      aria-label="Частые вопросы о финансовом управлении МЖД"
      data-geo-faq
    >
      <Container>
        <p className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase">
          Вопросы
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Частые вопросы о финансах МЖД
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Краткие ответы о бюджете, план-факте, задолженности и отчётности для
          жителей.
        </p>

        <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {mzhdFinanceFaq.map((item) => (
            <Collapsible key={item.question}>
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-slate-900 hover:bg-slate-50">
                {item.question}
                <span className="text-slate-400" aria-hidden>
                  +
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-5 text-sm leading-7 text-slate-600">
                {item.answer}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </Container>
    </section>
  );
}
