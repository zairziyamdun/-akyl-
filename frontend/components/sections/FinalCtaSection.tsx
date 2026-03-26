"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FinalCtaSection() {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <Container>
        <div className="rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm md:p-12 lg:p-16">
          <SectionHeading
            align="center"
            title="Начните внедрение сегодня"
            description="Система управления ждёт. Первый шаг — это консультация с экспертом AKYL."
            className="mx-auto"
          />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button>Консультация</Button>
            <Button variant="secondary">Внедрение</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

