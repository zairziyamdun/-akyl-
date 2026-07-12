import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";

export const metadata: Metadata = {
  title: "Модуль в разработке | AKYL",
  description:
    "Раздел цифровой модели управления ещё не активирован. Следите за обновлениями платформы AKYL.",
};

export default function NotFound() {
  return (
    <Section
      size="hero"
      className="relative isolate flex min-h-[calc(100vh-12rem)] flex-col justify-center overflow-hidden bg-[#060a0f] text-white"
      aria-labelledby="not-found-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,186,122,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.04),transparent_40%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-xl text-center">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-8 py-10 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)] backdrop-blur-md md:px-10 md:py-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-[#d4ba7a]/85">
              Код 404
            </p>

            <h1
              id="not-found-heading"
              className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl lg:text-5xl lg:leading-tight"
            >
              Модуль системы находится в разработке
            </h1>

            <p className="mt-6 text-sm leading-relaxed text-white/68 md:text-base md:leading-7">
              В рамках построения цифровой модели управления данный раздел ещё
              не активирован. Следите за обновлениями платформы.
            </p>

            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Button
                asChild
                className="h-11 rounded-full border-0 bg-[#d4ba7a] px-6 text-sm font-medium text-[#0b1320] shadow-none transition hover:bg-[#e0ca8a]"
              >
                <Link href="/">На главную</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="h-11 rounded-full border border-white/12 bg-white/[0.04] px-6 text-sm font-medium text-white shadow-none hover:bg-white/[0.08]"
              >
                <Link href="/library">База знаний</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
