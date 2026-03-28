import { ToolsHero } from "@/components/tools/ToolsHero";
import { FeaturedTool } from "@/components/tools/FeaturedTool";
import { ToolsGrid } from "@/components/tools/ToolsGrid";
import { ToolsWorkflow } from "@/components/tools/ToolsWorkflow";
import { ProblemsSolutions } from "@/components/tools/ProblemsSolutions";
import { ToolsResults } from "@/components/tools/ToolsResults";
import { SystemConnection } from "@/components/tools/SystemConnection";
import { ToolsCta } from "@/components/tools/ToolsCta";

export default function ToolsPage() {
  return (
    <main className="bg-white text-slate-900">
      <ToolsHero />
      <FeaturedTool />
      <ToolsGrid />
      <ToolsWorkflow />
      <ProblemsSolutions />
      <ToolsResults />
      <SystemConnection />
      <ToolsCta />
    </main>
  );
}