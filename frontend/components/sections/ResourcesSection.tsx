"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

type Resource = {
  index: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

const resources: Resource[] = [
  {
    index: "01",
    label: "Методология",
    eyebrow: "Основа",
    title: "Методология управления МЖД",
    description:
      "Теория и практика, проверенные временем. Это фундамент, на котором стоит всё остальное.",
    image: HOME_IMAGE_URL,
  },
  {
    index: "02",
    label: "Атлас",
    eyebrow: "Основа",
    title: "Атлас управления",
    description:
      "Структурированная карта управления домом: роли, процессы, контуры ответственности и взаимосвязи.",
    image: HOME_IMAGE_URL,
  },
  {
    index: "03",
    label: "Библиотека",
    eyebrow: "Основа",
    title: "Библиотека знаний",
    description:
      "Материалы, статьи и исследования, которые помогают командам говорить на одном языке и внедрять систему.",
    image: HOME_IMAGE_URL,
  },
  {
    index: "04",
    label: "Инструменты",
    eyebrow: "Основа",
    title: "Инструменты",
    description:
      "Шаблоны, чек‑листы и практические инструменты для ежедневного управления и контроля результата.",
    image: HOME_IMAGE_URL,
  },
];

export function ResourcesSection() {
  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
          {resources.map((r, idx) => (
            <div
              key={r.index}
              className={[
                "border-t border-black/10",
                idx === 0 ? "border-t-0" : "",
              ].join(" ")}
            >
              <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-2 lg:items-center">
                <div>
                  <a
                    href="/"
                    className="flex items-center underline underline-offset-4"
                  >
                    <span className="mr-4 text-sm font-semibold text-slate-700 md:text-base">
                      {r.index}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 md:text-base">
                      {r.label}
                    </span>
                  </a>

                  <div className="mt-6">
                    <p className="mb-3 text-sm font-semibold text-slate-700">
                      {r.eyebrow}
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                      {r.title}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
                      {r.description}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Button variant="secondary">Изучить</Button>
                      <Button variant="link" rightIcon={<span>›</span>}>
                        Перейти
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <img
                    src={r.image}
                    className="h-[22rem] w-full rounded-2xl object-cover ring-1 ring-black/10 md:h-[28rem] lg:h-[60vh]"
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

