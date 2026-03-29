import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const elements = [
  { label: "Участники", hint: "Роли, интересы, договорённости" },
  { label: "Процессы", hint: "Сквозные цепочки от заявки до отчёта" },
  { label: "Финансы", hint: "Бюджет, резервы, прозрачность" },
  { label: "Данные", hint: "Единая фактура для решений" },
  { label: "Контроль", hint: "KPI, аудит, обратная связь" },
  { label: "Обратная связь", hint: "Диалог с собственниками и рынком" },
] as const;

export function SystemSection() {
  return (
    <section
      className="border-t border-slate-200/60 bg-slate-50 py-20 md:py-28 lg:py-32"
      aria-labelledby="system-section-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              headingId="system-section-heading"
              eyebrow="Системное мышление"
              title="Дом — это не набор услуг, а система"
              description="Когда все элементы связаны явно, управление становится предсказуемым: меньше сюрпризов по деньгам, срокам и ответственности. AKYL описывает эту систему как целое."
            />
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {elements.map((el) => (
                <div
                  key={el.label}
                  className="rounded-2xl border border-slate-200/90 bg-white px-5 py-5 md:px-6 md:py-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c9a962]/90">
                    {el.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {el.hint}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
