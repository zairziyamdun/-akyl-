import { HeartHandshake, TrendingUp } from "lucide-react";

import { Container } from "@/shared/ui/Container";
import { mzhdKpiCategories } from "@/widgets/mzhd-page";

export function MzhdKpiCategoriesSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-8 shadow-sm">
            <TrendingUp className="text-emerald-700" size={28} />
            <h2 className="mt-4 text-2xl font-semibold">{mzhdKpiCategories.financial.title}</h2>
            <p className="mt-3 text-slate-600">{mzhdKpiCategories.financial.description}</p>
          </article>
          <article className="rounded-2xl bg-white p-8 shadow-sm">
            <HeartHandshake className="text-sky-700" size={28} />
            <h2 className="mt-4 text-2xl font-semibold">{mzhdKpiCategories.service.title}</h2>
            <p className="mt-3 text-slate-600">{mzhdKpiCategories.service.description}</p>
          </article>
        </div>
      </Container>
    </section>
  );
}
