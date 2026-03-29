import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function IEUCta() {
  return (
    <section
      className="border-t border-black/5 bg-slate-900 py-16 text-white md:py-20"
      aria-labelledby="ieu-cta-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="ieu-cta-heading"
            className="text-2xl font-bold tracking-tight md:text-3xl"
          >
            Следующий шаг после расчёта
          </h2>
          <p className="mt-4 text-white/70">
            Свяжите цифры IEU с практикой: консультация, аудит или поэтапное
            внедрение системы управления на платформе AKYL.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              className="bg-white text-slate-900 hover:bg-slate-100"
              asChild
            >
              <Link href="/contacts">Получить консультацию</Link>
            </Button>
            <Button
              variant="secondary"
              className="border-white/25 bg-white/10 text-white ring-white/20 hover:bg-white/15"
              asChild
            >
              <Link href="/contacts">Заказать аудит управления</Link>
            </Button>
            <Button
              variant="secondary"
              className="border-white/25 bg-transparent text-white ring-white/20 hover:bg-white/10"
              asChild
            >
              <Link href="/methodology">Начать внедрение системы</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
