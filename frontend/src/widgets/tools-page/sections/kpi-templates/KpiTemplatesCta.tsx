import Link from "next/link";

import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";

export function KpiTemplatesCta() {
  return (
    <section
      className="border-t border-black/5 bg-gradient-to-b from-slate-50 to-white py-16 md:py-20"
      aria-labelledby="kpi-cta-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl border border-black/10 bg-white px-6 py-12 text-center shadow-sm ring-1 ring-black/5 md:px-12 md:py-14">
          <h2
            id="kpi-cta-heading"
            className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
          >
            Начните внедрять KPI уже сейчас
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-slate-600">
            Используйте готовые шаблоны, чтобы перейти от интуитивного управления
            к системе, основанной на данных, контроле и результатах.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/library/templates">Скачать шаблоны</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/consultation">Запросить консультацию</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
