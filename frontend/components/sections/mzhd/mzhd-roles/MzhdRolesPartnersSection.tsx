import { Handshake, Wrench } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { mzhdRolesPartners } from "@/data/mzhdRolesData";

export function MzhdRolesPartnersSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h2 className="text-3xl font-semibold sm:text-4xl">Подрядчики и акимат</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="flex gap-4 rounded-2xl border border-slate-200 p-6">
            <Wrench className="shrink-0 text-amber-600" size={24} />
            <div>
              <h3 className="font-semibold">{mzhdRolesPartners.contractors.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{mzhdRolesPartners.contractors.description}</p>
            </div>
          </div>
          <div className="flex gap-4 rounded-2xl border border-slate-200 p-6">
            <Handshake className="shrink-0 text-sky-600" size={24} />
            <div>
              <h3 className="font-semibold">{mzhdRolesPartners.akimat.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{mzhdRolesPartners.akimat.description}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
