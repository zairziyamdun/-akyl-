import { Container } from "@/components/ui/Container";
import { akimatAnalyticsSection, akimatStats } from "@/data/akimatData";

export function AkimatAnalyticsSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {akimatAnalyticsSection.title}
        </h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          {akimatAnalyticsSection.description}
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {akimatStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-1 text-xs text-slate-400">{stat.note}</p>
              </div>
              <p className="font-[family-name:var(--font-sora)] text-3xl font-semibold text-slate-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
