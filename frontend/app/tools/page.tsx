import { ToolsHero } from "@/components/sections/tools/ToolsHero";
import { FeaturedTool } from "@/components/sections/tools/FeaturedTool";
import { ToolsGrid } from "@/components/sections/tools/ToolsGrid";
import { ToolsWorkflow } from "@/components/sections/tools/ToolsWorkflow";
import { ProblemsSolutions } from "@/components/sections/tools/ProblemsSolutions";
import { ToolsResults } from "@/components/sections/tools/ToolsResults";
import { SystemConnection } from "@/components/sections/tools/SystemConnection";
import { ToolsCta } from "@/components/sections/tools/ToolsCta";

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