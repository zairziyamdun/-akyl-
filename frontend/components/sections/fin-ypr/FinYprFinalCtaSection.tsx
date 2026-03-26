"use client";

import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FinYprFinalCtaSection() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-12 lg:p-16">
          <div className="max-w-lg text-center">
            <SectionHeading
              align="center"
              title="Начните прямо сейчас"
              description="Получите доступ к демонстрации платформы и увидите, как работает управление финансами в реальности."
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
            <Button>Демонстрация</Button>
            <Button variant="secondary">Подробнее</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

