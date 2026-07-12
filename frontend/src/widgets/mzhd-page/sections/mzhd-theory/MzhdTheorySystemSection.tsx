import { Container } from "@/shared/ui/Container";
import { mzhdTheorySystemSteps } from "@/widgets/mzhd-page";

export function MzhdTheorySystemSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h2 className="text-3xl font-semibold sm:text-4xl">Системный подход</h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          МЖД рассматривается как целостная система с входами, процессами,
          выходами и обратной связью. Управление — не набор разрозненных услуг,
          а непрерывный цикл улучшений.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {mzhdTheorySystemSteps.map((step, i) => (
            <div
              key={step}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <span className="text-xs font-bold text-sky-700">0{i + 1}</span>
              <p className="mt-2 font-medium">{step}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
