import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { educationCta } from "@/data/educationData";

export function EducationCtaSection() {
  return (
    <section className="pb-20 pt-4 sm:pb-24">
      <Container>
        <div className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white px-8 py-12 sm:px-12">
          <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
            {educationCta.title}
          </h2>
          <p className="mt-3 max-w-xl text-slate-600">{educationCta.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/consultation"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
            >
              Получить консультацию
            </Link>
            <Link
              href="/mzhd"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900"
            >
              Вернуться к методологии
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
