"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

const tabs = [
  {
    key: "tab-one",
    label: "Эксплуатация",
    eyebrow: "Основа",
    title: "Состояние дома и готовность к ремонтам",
    text: "Оценивает выполнение плановых работ, исправность инженерных систем и скорость устранения дефектов. Это фундамент, на котором стоит весь дом.",
  },
  {
    key: "tab-two",
    label: "Финансы",
    eyebrow: "Основа",
    title: "Состояние дома и готовность к ремонтам",
    text: "Оценивает выполнение плановых работ, исправность инженерных систем и скорость устранения дефектов. Это фундамент, на котором стоит весь дом.",
  },
  {
    key: "tab-three",
    label: "Сервис",
    eyebrow: "Основа",
    title: "Состояние дома и готовность к ремонтам",
    text: "Оценивает выполнение плановых работ, исправность инженерных систем и скорость устранения дефектов. Это фундамент, на котором стоит весь дом.",
  },
];

export function Layout504() {
  const [active, setActive] = useState(0);
  const item = tabs[active];

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 text-sm font-semibold md:mb-4">Формула</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Семь компонентов управления
            </h2>
            <p className="text-slate-600 md:text-lg">
              Индекс объединяет эксплуатацию, финансы, сервис, коммуникации,
              документы, безопасность и цифровизацию в единую метрику качества.
            </p>
            <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
              <Button variant="secondary">Подробнее</Button>
              <Button variant="link" rightIcon={<span>›</span>}>
                Читать
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="no-scrollbar relative mb-12 flex w-full flex-nowrap items-center justify-start gap-x-6 overflow-auto md:mb-16 md:justify-center">
            {tabs.map((tab, idx) => (
              <button
                type="button"
                key={tab.key}
                onClick={() => setActive(idx)}
                className={[
                  "whitespace-nowrap border-b-[1.5px] px-0 py-2",
                  active === idx
                    ? "border-black text-slate-900"
                    : "border-transparent text-slate-500",
                ].join(" ")}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid w-full grid-cols-1 border border-black/10 bg-white md:grid-cols-2 md:items-center">
            <div className="aspect-square">
              <img src={HOME_IMAGE_URL} className="h-full w-full object-cover" alt="" />
            </div>
            <div className="p-6 md:p-8 lg:p-12">
              <p className="mb-3 text-sm font-semibold md:mb-4">{item.eyebrow}</p>
              <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                {item.title}
              </h3>
              <p className="text-slate-600">{item.text}</p>
              <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                <Button variant="secondary">Узнать</Button>
                <Button variant="link" rightIcon={<span>›</span>}>
                  Далее
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

