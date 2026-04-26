import { REPORT_SECTIONS } from "@/lib/managementReportData";
import { Container } from "@/components/ui/Container";

export function ManagementReportOverviewCards() {
  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Основные разделы
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Из чего состоит управленческий отчет
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Соберите структуру так, чтобы отчет закрывал контроль финансов,
            процессов и управленческих решений — без лишней бюрократии.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {REPORT_SECTIONS.map((section) => (
            <article
              key={section.id}
              className="flex h-full flex-col rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="h-12 w-12 rounded-2xl bg-slate-100" />
              <h3 className="mt-5 text-xl font-semibold text-slate-950">
                {section.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {section.description}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                {section.overviewBullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-slate-400" aria-hidden>
                      ·
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

