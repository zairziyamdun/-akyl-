import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const layers = [
  { id: "L5", label: "Логика AKYL", sub: "Единая модель и язык управления" },
  { id: "L4", label: "Роли и ответственность", sub: "Кто принимает какие решения" },
  { id: "L3", label: "Процессы", sub: "Сквозные цепочки и регламенты" },
  { id: "L2", label: "Финансы и KPI", sub: "Планирование, контроль, отчётность" },
  { id: "L1", label: "Цифровая система", sub: "Данные, инструменты, аудит" },
] as const;

const cards = [
  {
    title: "Модель управления",
    line: "Связка теории, практики и измеримых критериев зрелости.",
  },
  {
    title: "Роли",
    line: "Матрица полномочий без дублирования и провалов ответственности.",
  },
  {
    title: "Процессы",
    line: "Карты процессов от операционки до стратегических циклов.",
  },
  {
    title: "Финансы",
    line: "Бюджетирование, резервы и прозрачность для собственников.",
  },
  {
    title: "KPI",
    line: "Панель показателей для линейки и собственников.",
  },
  {
    title: "Цифровая система",
    line: "Единая среда для данных, документов и управленческих решений.",
  },
] as const;

export function ArchitectureSection() {
  return (
    <section
      className="relative border-t border-white/10 bg-[#070d16] py-20 text-white md:py-28 lg:py-32"
      aria-labelledby="architecture-section-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(201,169,98,0.03),transparent_35%)]"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeading
          headingId="architecture-section-heading"
          variant="dark"
          align="center"
          eyebrow="Архитектура"
          title="Единая модель вместо разрозненных инструментов"
          description="AKYL собирает управление МЖД в согласованную структуру: от единой модели до цифрового контура. Каждый слой опирается на нижележащий — без «висящих» модулей."
          className="mx-auto max-w-3xl"
        />

        <div className="mx-auto mt-16 max-w-2xl">
          <div
            className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-sm md:p-8"
            role="img"
            aria-label="Схема слоёв архитектуры управления: от цифровой системы до логики AKYL"
          >
            <ol className="flex flex-col gap-3">
              {[...layers].reverse().map((layer, idx) => (
                <li
                  key={layer.id}
                  className={cn(
                    "relative rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 md:px-5 md:py-4",
                    idx === 1 && "ml-3 md:ml-4",
                    idx === 2 && "ml-6 md:ml-8",
                    idx === 3 && "ml-9 md:ml-12",
                    idx === 4 && "ml-12 md:ml-16",
                  )}
                >
                  <div className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between md:gap-4">
                    <span className="text-sm font-semibold tracking-tight text-white">
                      {layer.label}
                    </span>
                    <span className="text-xs text-white/50 md:text-right">
                      {layer.sub}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-center text-xs text-white/45">
              Упрощённая схема: реальная архитектура адаптируется под масштаб и зрелость организации.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 md:px-6 md:py-6"
            >
              <h3 className="text-base font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {c.line}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
