"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

const items = [
  {
    title: "Методология и теория",
    description: "Структура, где каждый знает своё место и ответственность.",
    image: HOME_IMAGE_URL,
  },
  {
    title: "Архитектура и роли",
    description: "Структура, где каждый знает своё место и ответственность.",
    image: HOME_IMAGE_URL,
  },
  {
    title: "Процессы и финансы",
    description:
      "Информация собирается и становится основой для правильных решений каждый день.",
    image: HOME_IMAGE_URL,
  },
  {
    title: "Данные и контроль",
    description: "Структура, где каждый знает своё место и ответственность.",
    image: HOME_IMAGE_URL,
  },
];

export function PillarsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16">
          <div className="md:sticky md:top-24">
            <SectionHeading
              eyebrow="Основа"
              title="Что объединяет AKYL в одну систему"
              description={
                <>
                  Четыре столпа держат дом на ногах. Без одного из них система
                  падает. AKYL собирает их вместе и делает работающей.
                </>
              }
            />
            <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
              <Button variant="secondary">Разобраться</Button>
              <Button variant="link" rightIcon={<span>›</span>}>
                Смотреть
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {items.map((it) => (
              <div
                key={it.title}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
              >
                <div className="flex items-start gap-5">
                  <div className="hidden shrink-0 md:block">
                    <img
                      src={it.image}
                      alt=""
                      className="h-20 w-20 rounded-2xl object-cover ring-1 ring-black/10"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
                      {it.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">
                      {it.description}
                    </p>
                    <div className="mt-4 md:hidden">
                      <img
                        src={it.image}
                        alt=""
                        className="h-44 w-full rounded-2xl object-cover ring-1 ring-black/10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

