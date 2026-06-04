import Image from "next/image";
import Link from "next/link";
import { PieChart } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { mzhdFinanceImages } from "@/data/mzhdFinanceData";

export function MzhdFinancePlanFactSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <PieChart className="text-slate-700" size={32} />
            <h2 className="mt-4 text-3xl font-semibold">План-факт контроль</h2>
            <p className="mt-4 text-slate-600">
              Ежемесячное сравнение плана и факта по статьям выявляет перерасход, экономию и риски к концу
              года.
            </p>
            <Link
              href="/tools/budget-analysis"
              className="mt-6 inline-flex text-sm font-semibold text-sky-700 underline-offset-4 hover:underline"
            >
              Открыть инструмент «Анализ бюджета» →
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
            <Image
              src={mzhdFinanceImages.planFact}
              alt="Аналитика бюджета"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
