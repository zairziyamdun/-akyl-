import { Container } from "@/shared/ui/Container";
import { mzhdTheoryDataCycle } from "@/widgets/mzhd-page";

export function MzhdTheoryDataSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Управление через данные
        </h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          Кибернетический принцип: решения принимаются на основе измеримых
          сигналов — KPI, заявок, финансов, аудитов — а не только интуиции.
        </p>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            {mzhdTheoryDataCycle.label}
          </p>
          <p className="mt-3 font-[family-name:var(--font-sora)] text-xl font-semibold">
            {mzhdTheoryDataCycle.formula}
          </p>
          <p className="mt-3 text-sm text-slate-600">
            {mzhdTheoryDataCycle.description}
          </p>
        </div>
      </Container>
    </section>
  );
}
