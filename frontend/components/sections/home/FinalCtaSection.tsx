import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FinalCtaSection() {
  return (
    <section
      className="relative border-t border-white/10 bg-slate-950 py-20 text-white md:py-28 lg:py-32"
      aria-labelledby="final-cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_100%,rgba(201,169,98,0.09),transparent_55%)]"
        aria-hidden
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-12 text-center backdrop-blur-sm md:px-12 md:py-16">
          <SectionHeading
            headingId="final-cta-heading"
            variant="dark"
            align="center"
            eyebrow="Следующий шаг"
            title="Системное управление начинается с разговора по существу"
            description="Обсудим ваш контекст — портфель, объект или этап ввода — и предложим рабочий маршрут: методология, обучение, инструменты, внедрение."
            className="mx-auto max-w-2xl"
          />
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              asChild
              variant="primary"
              className="h-12 bg-[#c9a962] px-7 text-sm font-semibold text-slate-950 hover:bg-[#d4b56f]"
            >
              <Link href="/contacts">Получить консультацию</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-12 rounded-xl border border-white/20 bg-white/[0.06] px-7 text-sm font-semibold text-white hover:bg-white/[0.1]"
            >
              <Link href="/methodology">Изучить методологию</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
