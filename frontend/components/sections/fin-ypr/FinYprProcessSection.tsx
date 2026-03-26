"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Step = {
  id: number;
  title: string;
  text: string;
  image: string;
  imageCaption: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Сбор данных",
    text: "Собираем фактические показатели, расходы, остатки, задолженности и ключевые финансовые данные.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "На этом этапе фиксируются исходные финансовые показатели.",
  },
  {
    id: 2,
    title: "Формирование бюджета",
    text: "На основе фактов строится план расходов, резервов и распределения средств на следующий период.",
    image:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Бюджет помогает заранее увидеть нагрузку и риски.",
  },
  {
    id: 3,
    title: "Контроль исполнения",
    text: "Сравниваем план и факт, следим за отклонениями и оперативно замечаем проблемные зоны.",
    image:
      "https://images.unsplash.com/photo-1554224153-3a9a0d6d1f0f?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Контроль исполнения не даёт потерять деньги незаметно.",
  },
  {
    id: 4,
    title: "Анализ и решения",
    text: "По итогам периода оцениваем эффективность и принимаем конкретные управленческие решения.",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Смысл финансового управления — не в цифрах, а в действиях.",
  },
];

export function FinYprProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const elements = itemRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          const activeIndex = Number(
            visibleEntries[0].target.getAttribute("data-index")
          );
          setActiveStep(activeIndex);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0.25, 0.4, 0.6, 0.8],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const currentStep = useMemo(() => steps[activeStep], [activeStep]);

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div className="space-y-24">
            {steps.map((step, index) => {
              const isActive = index === activeStep;

              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  data-index={index}
                  className="min-h-[70vh] flex items-center"
                >
                  <div
                    className={`max-w-xl transition-all duration-500 ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-40 translate-y-2"
                    }`}
                  >
                    <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      Шаг {step.id}
                    </div>

                    <h3 className="text-3xl font-semibold leading-tight md:text-4xl">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-base leading-7 text-neutral-600 md:text-lg">
                      {step.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative hidden lg:block">
            <div className="sticky top-24">
              <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    key={currentStep.image}
                    src={currentStep.image}
                    alt={currentStep.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="border-t border-neutral-200 p-6">
                  <div className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
                    Описание
                  </div>
                  <p className="mt-3 text-base leading-7 text-neutral-700">
                    {currentStep.imageCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={currentStep.image}
                  alt={currentStep.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="border-t border-neutral-200 p-5">
                <div className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
                  Описание
                </div>
                <p className="mt-3 text-base leading-7 text-neutral-700">
                  {currentStep.imageCaption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}