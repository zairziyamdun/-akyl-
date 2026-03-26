"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

export function ProblemSection() {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Проблема"
          title="Почему текущая система управления не работает"
          description={
            <>
              Финансы остаются в тени. Процессы разбросаны по разным людям и
              бумагам. Никто не видит полной картины, и конфликты множатся.
            </>
          }
          className="mx-auto max-w-3xl"
        />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <img
              key={i}
              src={HOME_IMAGE_URL}
              alt="Partner logo"
              className="h-10 w-auto opacity-70"
            />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="secondary">Подробнее</Button>
          <Button variant="link" rightIcon={<span>›</span>}>
            Узнать
          </Button>
        </div>
      </Container>
    </section>
  );
}

