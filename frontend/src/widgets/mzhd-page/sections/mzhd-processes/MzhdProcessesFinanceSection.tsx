import { Receipt, Truck } from "lucide-react";

import { Container } from "@/shared/ui/Container";
import { mzhdProcessesArticles } from "@/widgets/mzhd-page";

export function MzhdProcessesFinanceSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 p-8">
            <Receipt size={28} className="text-emerald-700" />
            <h2 className="mt-4 text-2xl font-semibold">
              {mzhdProcessesArticles.finance.title}
            </h2>
            <p className="mt-3 text-slate-600">
              {mzhdProcessesArticles.finance.description}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 p-8">
            <Truck size={28} className="text-amber-700" />
            <h2 className="mt-4 text-2xl font-semibold">
              {mzhdProcessesArticles.contractors.title}
            </h2>
            <p className="mt-3 text-slate-600">
              {mzhdProcessesArticles.contractors.description}
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
