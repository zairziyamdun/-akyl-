import Link from "next/link";

import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";

export function IEUHero() {
  return (
    <header className="border-b border-black/5 bg-gradient-to-b from-slate-50 to-white">
      <Container className="py-14 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
            IEU · AKYL
          </p>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-950 md:text-5xl lg:text-[3.25rem]">
            Индекс эффективности управления МЖД
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Инструмент оценки качества управления домом на основе финансов,
            эксплуатации, сервиса, безопасности, документов, коммуникаций и
            цифровизации.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="#ieu-calculator">Рассчитать индекс</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/consultation">Получить консультацию</Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
