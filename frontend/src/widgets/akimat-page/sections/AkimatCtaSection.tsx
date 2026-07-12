import Link from "next/link";
import { ClipboardCheck } from "lucide-react";

import { Container } from "@/shared/ui/Container";
import { akimatCta } from "@/widgets/akimat-page";

export function AkimatCtaSection() {
  return (
    <section className="pb-20 pt-4 sm:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 px-8 py-12 text-white sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                <ClipboardCheck size={14} />
                {akimatCta.badge}
              </div>
              <h2 className="mt-4 max-w-xl text-2xl font-semibold sm:text-3xl">
                {akimatCta.title}
              </h2>
              <p className="mt-3 max-w-lg text-sm text-white/70">
                {akimatCta.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/consultation"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
              >
                Получить консультацию
              </Link>
              <Link
                href="/mzhd"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white"
              >
                Вернуться к методологии
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
