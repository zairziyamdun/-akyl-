import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const cases = [
  {
    client: "УК, региональный портфель · 80+ домов",
    problem:
      "Разрозненная отчётность, конфликты по деньгам, отсутствие единых KPI между филиалами.",
    solution:
      "Внедрение целевой модели ролей, панели KPI и регламента финансовой прозрачности для собственников.",
    result:
      "Сокращение спорных ситуаций на этапе ОСС, ускорение согласования бюджетов, выравнивание практики филиалов.",
  },
  {
    client: "Девелопер · ввод жилого квартала",
    problem:
      "Разрыв между проектной документацией и эксплуатацией: передача объекта без готовой управленческой модели.",
    solution:
      "Проектирование архитектуры управления «с нуля», обучение управляющей организации, пилот цифрового контура.",
    result:
      "Предсказуемый переход на постгарантийное обслуживание, снижение количества претензий первых сезонов.",
  },
  {
    client: "Управляющая компания · один крупный объект",
    problem:
      "Сильная зависимость от ключевых людей, слабый документированный контроль подрядчиков.",
    solution:
      "Карты процессов, чек-листы качества, связка с KPI и регулярным управленческим отчётом.",
    result:
      "Повторяемые стандарты работы смен, меньше инцидентов по срокам и объёмам работ.",
  },
] as const;

export function CasesSection() {
  return (
    <section
      className="border-t border-slate-200/80 bg-white py-20 md:py-28 lg:py-32"
      aria-labelledby="cases-section-heading"
    >
      <Container>
        <SectionHeading
          headingId="cases-section-heading"
          align="center"
          eyebrow="Практика"
          title="Как это выглядит на объектах"
          description="Обобщённые профили внедрений без раскрытия конфиденциальных данных — чтобы показать логику работы, а не маркетинговые обещания."
          className="mx-auto max-w-3xl"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c.client}
              className="flex flex-col rounded-2xl border border-slate-200/90 bg-slate-50/50 p-6 md:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Кейс
              </p>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-900">
                {c.client}
              </h3>
              <dl className="mt-6 flex flex-1 flex-col gap-5 text-sm">
                <div>
                  <dt className="font-medium text-slate-900">Проблема</dt>
                  <dd className="mt-1.5 leading-relaxed text-slate-600">
                    {c.problem}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-900">Решение</dt>
                  <dd className="mt-1.5 leading-relaxed text-slate-600">
                    {c.solution}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-900">Результат</dt>
                  <dd className="mt-1.5 leading-relaxed text-slate-600">
                    {c.result}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="secondary">
            <Link href="/cases">Смотреть кейсы</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
