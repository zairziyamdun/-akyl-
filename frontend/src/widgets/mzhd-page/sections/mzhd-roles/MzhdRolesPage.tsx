import { MzhdRolesCtaSection } from "./MzhdRolesCtaSection";
import { MzhdRolesDefinitionSection } from "./MzhdRolesDefinitionSection";
import { MzhdRolesFaqSection } from "./MzhdRolesFaqSection";
import { MzhdRolesHeroSection } from "./MzhdRolesHeroSection";
import { MzhdRolesOrganizationsSection } from "./MzhdRolesOrganizationsSection";
import { MzhdRolesOwnersSection } from "./MzhdRolesOwnersSection";
import { MzhdRolesPartnersSection } from "./MzhdRolesPartnersSection";

export function MzhdRolesPage() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-white text-slate-900">
      <MzhdRolesHeroSection />
      <MzhdRolesDefinitionSection />
      <MzhdRolesOwnersSection />
      <MzhdRolesOrganizationsSection />
      <MzhdRolesPartnersSection />
      <MzhdRolesFaqSection />
      <MzhdRolesCtaSection />
    </main>
  );
}
