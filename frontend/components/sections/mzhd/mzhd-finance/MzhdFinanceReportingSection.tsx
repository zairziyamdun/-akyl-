import { AlertCircle, FileSpreadsheet } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { mzhdFinanceArticles } from "@/data/mzhdFinanceData";

export function MzhdFinanceReportingSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 md:grid-cols-2">
          <article>
            <AlertCircle className="text-amber-600" size={28} />
            <h2 className="mt-4 text-2xl font-semibold">{mzhdFinanceArticles.debt.title}</h2>
            <p className="mt-3 text-slate-600">{mzhdFinanceArticles.debt.description}</p>
          </article>
          <article>
            <FileSpreadsheet className="text-slate-700" size={28} />
            <h2 className="mt-4 text-2xl font-semibold">{mzhdFinanceArticles.reporting.title}</h2>
            <p className="mt-3 text-slate-600">{mzhdFinanceArticles.reporting.description}</p>
          </article>
        </div>
      </Container>
    </section>
  );
}
