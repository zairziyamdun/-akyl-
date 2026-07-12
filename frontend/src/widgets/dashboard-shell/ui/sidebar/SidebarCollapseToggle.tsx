"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { KeyboardEvent } from "react";

import { cn } from "@/shared/lib";

type SidebarCollapseToggleProps = {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
};

export function SidebarCollapseToggle({
  collapsed,
  onToggle,
  className,
}: SidebarCollapseToggleProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      aria-label="Toggle sidebar"
      aria-expanded={!collapsed}
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]",
        "border border-[#E2E8F0] bg-white text-[#64748B]",
        "transition-colors duration-200 hover:border-[#CBD5E1] hover:bg-[#F8FAFC] hover:text-[#334155]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/25 focus-visible:ring-offset-1",
        className,
      )}
    >
      {collapsed ? (
        <ChevronRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
      ) : (
        <ChevronLeft className="h-4 w-4" strokeWidth={2.25} aria-hidden />
      )}
    </button>
  );
}
