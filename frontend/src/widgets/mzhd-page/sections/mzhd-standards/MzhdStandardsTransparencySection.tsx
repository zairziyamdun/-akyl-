import { Eye } from "lucide-react";

import { Container } from "@/shared/ui/Container";
import { mzhdStandardsTransparencyQuote } from "@/widgets/mzhd-page";

export function MzhdStandardsTransparencySection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Eye className="text-sky-700" size={32} />
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Прозрачность
        </h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          Открытые финансы, понятные отчёты, доступные данные для собственников
          и возможность проверки решений УК.
        </p>
        <div className="mt-8 rounded-2xl border border-sky-200 bg-sky-50 p-6">
          <p className="text-sm font-medium text-sky-900">
            {mzhdStandardsTransparencyQuote.label}
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {mzhdStandardsTransparencyQuote.text}
          </p>
        </div>
      </Container>
    </section>
  );
}
