import {
  HeroSection,
  ArchitectureSection,
  BookSection,
  CasesSection,
  FinalCtaSection,
  ImplementationSection,
  LearningSection,
  ProblemsSection,
  ResultsSection,
  SystemSection,
  ToolsSection,
} from "@/components/sections/home";

export default function Page() {
  return (
    <div>
      <HeroSection />
      <BookSection />
      <LearningSection />
      <ImplementationSection />
      <ProblemsSection />
      <SystemSection />
      <ArchitectureSection />
      <ToolsSection />
      <ResultsSection />
      <CasesSection />
      <FinalCtaSection />
    </div>
  );
}
