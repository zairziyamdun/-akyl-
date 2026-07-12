import { Container } from "@/shared/ui/Container";
import {
  akimatBenefitCards,
  akimatBenefitsSection,
} from "@/widgets/akimat-page";

export function AkimatBenefitsSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {akimatBenefitsSection.title}
        </h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          {akimatBenefitsSection.description}
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {akimatBenefitCards.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm"
              >
                <div className="inline-flex rounded-xl bg-slate-900 p-2.5 text-white">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
