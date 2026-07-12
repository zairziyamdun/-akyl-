"use client";

import { cn } from "@/shared/lib";
import type { DashboardTabId } from "@/entities/house";
import { DASHBOARD_TABS } from "@/entities/house";

type HouseDashboardTabsProps = {
  activeTab: DashboardTabId;
  onChange: (tab: DashboardTabId) => void;
};

export function HouseDashboardTabs({ activeTab, onChange }: HouseDashboardTabsProps) {
  return (
    <nav
      className="border-b border-slate-200/80 bg-white"
      aria-label="Разделы дашборда"
    >
      <div className="flex gap-1 overflow-x-auto pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {DASHBOARD_TABS.map((tab) => {
          const active = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                "shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium transition md:px-4",
                active
                  ? "border-[#0c1e3a] text-[#0c1e3a]"
                  : "border-transparent text-slate-500 hover:border-slate-200 hover:text-slate-800",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
