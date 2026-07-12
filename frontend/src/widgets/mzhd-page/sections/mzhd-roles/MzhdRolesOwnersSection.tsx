import { Container } from "@/shared/ui/Container";
import { mzhdRolesOwnerTasks } from "@/widgets/mzhd-page";

export function MzhdRolesOwnersSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h2 className="text-3xl font-semibold sm:text-4xl">Собственники</h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          Источник полномочий и финансирования. Собственники определяют
          приоритеты, утверждают бюджет и контролируют результат через ОСИ и
          отчётность УК.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {mzhdRolesOwnerTasks.map((t) => (
            <li
              key={t}
              className="rounded-xl border border-slate-200 p-4 text-sm"
            >
              {t}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
