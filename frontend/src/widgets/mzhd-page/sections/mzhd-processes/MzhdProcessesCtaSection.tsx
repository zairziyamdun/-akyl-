import Link from "next/link";

import { Container } from "@/shared/ui/Container";
import { mzhdProcessesCta } from "@/widgets/mzhd-page";

export function MzhdProcessesCtaSection() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-12 shadow-lg sm:px-12">
          <h2 className="text-2xl font-semibold sm:text-3xl">{mzhdProcessesCta.title}</h2>
          <p className="mt-3 text-slate-600">{mzhdProcessesCta.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/consultation" className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white">
              Получить консультацию
            </Link>
            <Link href="/tools/checklists" className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900">
              Чек-листы
            </Link>
            <Link href="/mzhd" className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900">
              Вернуться к методологии
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
