import Link from "next/link";

import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";

export function ToolsCta() {
  return (
    <section className="bg-sky-50/70 py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-4xl rounded-2xl border border-sky-100 bg-white px-6 py-12 text-center shadow-sm md:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Начните управлять домом на основе данных, а не ощущений
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/tools/index-efficiency">
              <Button>Рассчитать индекс</Button>
            </Link>
            <Link href="/tools/budget-analysis">
              <Button variant="secondary">Перейти к анализу бюджета</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
