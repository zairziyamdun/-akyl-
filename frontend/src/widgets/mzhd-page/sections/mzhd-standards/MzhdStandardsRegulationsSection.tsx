import { FileCheck, ScrollText } from "lucide-react";
import Link from "next/link";

import { Container } from "@/shared/ui/Container";
import { mzhdStandardsRegulations } from "@/widgets/mzhd-page";

export function MzhdStandardsRegulationsSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <ScrollText className="text-violet-700" size={32} />
            <h2 className="mt-4 text-3xl font-semibold">
              {mzhdStandardsRegulations.regulations.title}
            </h2>
            <p className="mt-4 text-slate-600">
              {mzhdStandardsRegulations.regulations.description}
            </p>
          </div>
          <div>
            <FileCheck className="text-emerald-700" size={32} />
            <h2 className="mt-4 text-3xl font-semibold">
              {mzhdStandardsRegulations.reporting.title}
            </h2>
            <p className="mt-4 text-slate-600">
              {mzhdStandardsRegulations.reporting.description}
            </p>
            <Link
              href="/tools/management-report"
              className="mt-4 inline-flex text-sm font-semibold text-emerald-800 underline-offset-4 hover:underline"
            >
              {mzhdStandardsRegulations.reporting.linkLabel}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
