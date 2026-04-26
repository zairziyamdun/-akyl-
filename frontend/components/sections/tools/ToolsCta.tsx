import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function ToolsCta() {
  return (
    <section className="pb-16 pt-6 md:pb-20">
      <Container>
        <div className="rounded-3xl border border-black/10 bg-slate-50 px-6 py-10 text-center shadow-sm md:px-10 md:py-14">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Начните использовать инструменты управления уже сегодня
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Рассчитайте индекс эффективности, проанализируйте бюджет дома,
            внедрите KPI и получите инструменты для системного управления МЖД.
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