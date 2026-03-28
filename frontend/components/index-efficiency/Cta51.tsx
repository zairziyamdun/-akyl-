"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IEUCalculator } from "@/components/ieu/IEUCalculator";

export function Cta51() {
  const [open, setOpen] = useState(false);

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-black/10 bg-white px-6 py-10 text-center shadow-sm md:px-10 md:py-14 lg:px-16 lg:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-5xl">
              Узнайте уровень управления вашего дома
            </h2>

            <p className="text-slate-600">
              Введите показатели и получите индекс эффективности
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Button onClick={() => setOpen(!open)}>
              {open ? "Скрыть" : "Рассчитать"}
            </Button>
          </div>
        </div>

        {/* 🔥 ВЫПАДАЮЩИЙ БЛОК */}
        {open && (
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <IEUCalculator />
          </div>
        )}
      </div>
    </section>
  );
}