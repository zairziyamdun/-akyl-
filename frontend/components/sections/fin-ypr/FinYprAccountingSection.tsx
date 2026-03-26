"use client";

import { Button } from "@/components/ui/Button";

export function FinYprAccountingSection() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5 md:p-12">
          <p className="mb-3 text-sm font-semibold text-slate-700 md:mb-4">
            Учет
          </p>
          <p className="mx-auto mb-5 max-w-2xl text-lg font-bold leading-[1.4] text-slate-900 md:mb-6 md:text-2xl">
            Все операции видны сразу. Деньги движутся, вы знаете куда.
          </p>
          <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
            <Button variant="secondary">Узнать</Button>
            <Button variant="link" rightIcon={<span>›</span>}>
              →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

