"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

export function HeroSection() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl ring-1 ring-black/10">
          <div className="relative z-10 flex min-h-[32rem] flex-col items-center justify-center p-8 text-center md:min-h-[40rem] md:p-16">
            <div className="w-full max-w-2xl">
              <h1 className="mb-5 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                Система управления многоквартирными домами
              </h1>
              <p className="text-base leading-7 text-white/90 md:text-lg">
                Методология и платформа, объединяющая процессы, финансы,
                участников и данные в единую управляемую систему. AKYL превращает
                хаос в порядок.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-8">
              <Button>Методология</Button>
              <Button variant="secondary">Консультация</Button>
            </div>
          </div>

          <div className="absolute inset-0 z-0">
            <img
              src={HOME_IMAGE_URL}
              className="h-full w-full object-cover"
              alt=""
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>
      </Container>
    </section>
  );
}

