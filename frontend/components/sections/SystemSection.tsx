"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

const items = [
  {
    title: "Участники",
    description:
      "Работа дома идёт по чётким правилам и последовательности действий.",
    image: HOME_IMAGE_URL,
  },
  {
    title: "Процессы",
    description:
      "Работа дома идёт по чётким правилам и последовательности действий.",
    image: HOME_IMAGE_URL,
  },
  {
    title: "Финансы",
    description:
      "Информация собирается, анализируется и становится основой для решений.",
    image: HOME_IMAGE_URL,
  },
  {
    title: "Данные",
    description:
      "Работа дома идёт по чётким правилам и последовательности действий.",
    image: HOME_IMAGE_URL,
  },
];

export function SystemSection() {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16">
          <div className="md:sticky md:top-24">
            <SectionHeading
              eyebrow="Система"
              title="Многоквартирный дом — это система"
              description={
                <>
                  Всё связано. Участники, процессы, финансы, данные — это не
                  отдельные части, а единое целое. Изменение в одном месте влияет
                  на всё остальное.
                </>
              }
            />
            <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
              <Button variant="secondary">Понять</Button>
              <Button variant="link" rightIcon={<span>›</span>}>
                Схема
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

