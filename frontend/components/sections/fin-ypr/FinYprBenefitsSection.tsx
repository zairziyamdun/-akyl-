"use client";

import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

const benefits = [
  {
    title: "Прозрачность расходов",
    description: "Каждый рубль учтен и виден в системе",
  },
  {
    title: "Распределение ресурсов",
    description: "Деньги идут туда, где они нужны больше",
  },
  {
    title: "Снижение финансовых рисков",
    description: "Проблемы видны раньше, чем они станут серьезными",
  },
  {
    title: "Устойчивость управления",
    description: "Система работает стабильно в любых условиях",
  },
];

export function FinYprBenefitsSection() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
        <p className="mb-3 text-sm font-semibold text-slate-700 md:mb-4">
          Преимущества
        </p>
        <h2 className="mb-5 text-5xl font-bold tracking-tight md:mb-6 md:text-7xl lg:text-8xl">
          Видите деньги, контролируете риски
        </h2>
        <p className="text-slate-600 md:text-lg">
          Четыре причины выбрать эту систему
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="flex flex-col justify-center rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
          >
            <IconTile
              icon={
                <img
                  src={HOME_IMAGE_URL}
                  alt=""
                  className="h-12 w-12 rounded-xl object-cover ring-1 ring-black/10"
                />
              }
              title={b.title}
              description={b.description}
            />
            <div className="mt-5 md:mt-6">
              <Button variant="link" rightIcon={<span>›</span>}>
                →
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

