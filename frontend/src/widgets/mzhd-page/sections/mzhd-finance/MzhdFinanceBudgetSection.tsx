import { Wallet } from "lucide-react";

import { Container } from "@/shared/ui/Container";
import { mzhdFinanceBudgetItems } from "@/widgets/mzhd-page";

export function MzhdFinanceBudgetSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Wallet className="text-emerald-700" size={32} />
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Бюджет дома</h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          Годовая смета с разбивкой по статьям: содержание, ремонт, ресурсы,
          резерв на непредвиденные работы. Утверждается собранием собственников.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {mzhdFinanceBudgetItems.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 p-5"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold">{item.pct}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
