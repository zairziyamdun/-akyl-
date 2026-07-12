import { Landmark } from "lucide-react";

import { Container } from "@/shared/ui/Container";
import { mzhdArchitectureParticipants } from "@/widgets/mzhd-page";

export function MzhdArchitectureParticipantsSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h2 className="text-3xl font-semibold sm:text-4xl">Участники системы</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mzhdArchitectureParticipants.map((name) => (
            <div key={name} className="rounded-2xl border border-slate-200 p-5 text-center">
              <Landmark className="mx-auto text-slate-400" size={28} />
              <p className="mt-3 font-semibold">{name}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
