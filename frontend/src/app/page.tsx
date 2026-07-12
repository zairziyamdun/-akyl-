import {
  HeroSection,
  HomeAnalyticsShowcaseSection,
  HomeAudienceSection,
  HomeClosingCtaSection,
  HomeEducationSpotlightSection,
  HomeImplementationPracticeSection,
  HomeJournalSpotlightSection,
  HomeKnowledgeLibrarySection,
  HomePlatformDirectionsSection,
  HomeProfessionalManagementSection,
  HomeSystemViewSection,
  HomeUrbanCaseSection,
  HomeWhyNewSystemSection,
} from "@/widgets/home-page";

export default function Page() {
  return (
    <div className="min-w-0 overflow-x-hidden bg-white">
      <HeroSection />
      <HomeWhyNewSystemSection />
      <HomeProfessionalManagementSection />
      <HomeSystemViewSection />
      <HomePlatformDirectionsSection />
      <HomeImplementationPracticeSection />
      <HomeUrbanCaseSection />
      <HomeAudienceSection />
      <HomeAnalyticsShowcaseSection />
      <HomeEducationSpotlightSection />
      <HomeKnowledgeLibrarySection />
      <HomeJournalSpotlightSection />
      <HomeClosingCtaSection />
    </div>
  );
}
