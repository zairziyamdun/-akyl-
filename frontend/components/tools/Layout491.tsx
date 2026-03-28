"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

const tabs = [
  {
    title: "Технические KPI",
    description:
      "Отслеживание состояния лифтов, отопления, водоснабжения. Система предупреждает о проблемах до того, как они станут критическими.",
  },
  {
    title: "Финансовые KPI",
    description:
      "Контроль сборов, затрат и структуры расходов. Видно, где возникают потери и где нужен корректирующий план.",
  },
  {
    title: "Сервисные KPI",
    description:
      "Показатели качества обслуживания жителей, скорости реакции и выполнения заявок в установленные сроки.",
  },
];

export function Layout491() {
  const [activeTab, setActiveTab] = useState(0);
  const active = tabs[activeTab];

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 text-sm font-semibold text-slate-700 md:mb-4">
            Показатели
          </p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Мониторинг KPI в реальном времени
          </h2>
          <p className="text-slate-600 md:text-lg">
            Система отслеживает все ключевые показатели управления домом. Видите
            результаты сразу и принимаете решения на основе точных данных.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
            <Button variant="secondary">Подробнее</Button>
            <Button variant="link" rightIcon={<span>›</span>}>
              →
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-x-12 md:grid-cols-2 lg:gap-x-20">
          <div className="mb-8 space-y-1 md:mb-0">
            {tabs.map((tab, idx) => {
              const isActive = idx === activeTab;
              return (
                <button
                  type="button"
                  key={tab.title}
                  onClick={() => setActiveTab(idx)}
                  className="w-full border-b border-black/10 py-6 text-left"
                >
                  <h3 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                    {tab.title}
                  </h3>
                  <p
                    className={[
                      "mt-3 overflow-hidden transition-all duration-300 md:mt-4",
                      isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-40",
                    ].join(" ")}
                  >
                    {tab.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-3xl shadow-sm ring-1 ring-black/5">
            <img src={HOME_IMAGE_URL} alt={active.title} className="w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

