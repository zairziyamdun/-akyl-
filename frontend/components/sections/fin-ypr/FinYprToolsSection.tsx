"use client";

import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

export function FinYprToolsSection() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
        <p className="mb-3 text-sm font-semibold text-slate-700 md:mb-4">
          Инструменты
        </p>
        <h2 className="mb-5 text-5xl font-bold tracking-tight md:mb-6 md:text-7xl lg:text-8xl">
          Три столпа управления
        </h2>
        <p className="text-slate-600 md:text-lg">
          Бюджет строится на фактах, не на надежде.
        </p>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div className="grid grid-cols-1 rounded-3xl bg-white shadow-sm ring-1 ring-black/5 sm:col-span-2">
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8 lg:p-12">
              <IconTile
                icon={
                  <img
                    src={HOME_IMAGE_URL}
                    alt=""
                    className="h-12 w-12 rounded-xl object-cover ring-1 ring-black/10"
                  />
                }
                title="Планирование бюджета"
                titleClassName="text-3xl md:text-4xl lg:text-5xl"
                description="Определите расходы на год вперед с точностью."
              />
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                <Button variant="secondary">Начать</Button>
                <Button variant="link" rightIcon={<span>›</span>}>
                  →
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
            <div className="flex h-full flex-col justify-between p-6 md:p-8 lg:p-6">
              <div>
                <IconTile
                  icon={
                    <img
                      src={HOME_IMAGE_URL}
                      alt=""
                      className="h-12 w-12 rounded-xl object-cover ring-1 ring-black/10"
                    />
                  }
                  title="Цифровой учет без бумаги"
                  description="Каждая трата записана, каждый документ на месте."
                />
              </div>
              <div className="mt-5 flex items-center gap-4 md:mt-6">
                <Button variant="link" rightIcon={<span>›</span>}>
                  →
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
            <div className="flex h-full flex-col justify-between p-6 md:p-8 lg:p-6">
              <div>
                <IconTile
                  icon={
                    <img
                      src={HOME_IMAGE_URL}
                      alt=""
                      className="h-12 w-12 rounded-xl object-cover ring-1 ring-black/10"
                    />
                  }
                  title="Цифровой учет без бумаги"
                  description="Каждая трата записана, каждый документ на месте."
                />
              </div>
              <div className="mt-5 flex items-center gap-4 md:mt-6">
                <Button variant="link" rightIcon={<span>›</span>}>
                  →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

