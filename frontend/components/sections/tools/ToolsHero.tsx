import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function ToolsHero() {
  return (
    <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-slate-50 to-white">
      <Container className="py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-1.5 text-sm text-slate-600 shadow-sm">
            Практические решения для профессионального управления МЖД
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
            Инструменты управления
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Цифровые инструменты для анализа, контроля и повышения эффективности
            управления многоквартирными домами: KPI, бюджет, чек-листы,
            шаблоны отчетности и индекс эффективности.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/tools/index-efficiency">
              <Button>Рассчитать индекс</Button>
            </Link>
            <Link href="/contacts">
              <Button variant="secondary">Получить консультацию</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}