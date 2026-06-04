import { Container } from "@/components/ui/Container";
import {
  educationAudience,
  educationAudienceSection,
} from "@/data/educationData";

export function EducationAudienceSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {educationAudienceSection.title}
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {educationAudience.map((item) => (
            <article
              key={item.role}
              className="rounded-2xl border border-slate-200 p-5"
            >
              <h3 className="font-semibold">{item.role}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
