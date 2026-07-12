import { Cpu, Wallet } from "lucide-react";

import { Container } from "@/shared/ui/Container";
import { mzhdArchitectureContours } from "@/widgets/mzhd-page";

export function MzhdArchitectureContoursSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-8">
            <Wallet className="text-emerald-700" size={28} />
            <h2 className="mt-4 text-2xl font-semibold">{mzhdArchitectureContours.finance.title}</h2>
            <p className="mt-3 text-slate-600">{mzhdArchitectureContours.finance.description}</p>
          </div>
          <div className="rounded-2xl border border-sky-200 bg-sky-50/50 p-8">
            <Cpu className="text-sky-700" size={28} />
            <h2 className="mt-4 text-2xl font-semibold">{mzhdArchitectureContours.digital.title}</h2>
            <p className="mt-3 text-slate-600">{mzhdArchitectureContours.digital.description}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
