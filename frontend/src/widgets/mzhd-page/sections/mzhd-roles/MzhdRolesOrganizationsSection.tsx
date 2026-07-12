import { Building, Home } from "lucide-react";

import { Container } from "@/shared/ui/Container";
import { mzhdRolesOrganizations } from "@/widgets/mzhd-page";

export function MzhdRolesOrganizationsSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-8">
            <Building className="text-slate-700" size={28} />
            <h2 className="mt-4 text-2xl font-semibold">{mzhdRolesOrganizations.management.title}</h2>
            <p className="mt-3 text-slate-600">{mzhdRolesOrganizations.management.description}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-8">
            <Home className="text-slate-700" size={28} />
            <h2 className="mt-4 text-2xl font-semibold">{mzhdRolesOrganizations.council.title}</h2>
            <p className="mt-3 text-slate-600">{mzhdRolesOrganizations.council.description}</p>
          </article>
        </div>
      </Container>
    </section>
  );
}
