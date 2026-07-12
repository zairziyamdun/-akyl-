import { Container } from "@/shared/ui/Container";
import {
  educationPrograms,
  educationProgramsSection,
} from "@/widgets/education-page";

export function EducationProgramsSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {educationProgramsSection.title}
        </h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          {educationProgramsSection.description}
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {educationPrograms.map((program) => {
            const Icon = program.icon;
            return (
              <article
                key={program.title}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="inline-flex w-fit rounded-xl bg-sky-100 p-2.5 text-sky-800">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{program.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {program.text}
                </p>
                <p className="mt-4 text-xs font-medium text-slate-500">
                  {program.duration}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
