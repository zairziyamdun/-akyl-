"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib";

import { SIDEBAR_MOTION_TRANSITION } from "../../model/sidebarNavUtils";

type SidebarNavLabelProps = {
  children: ReactNode;
  collapsed: boolean;
  className?: string;
};

export function SidebarNavLabel({ children, collapsed, className }: SidebarNavLabelProps) {
  return (
    <motion.span
      className={cn(
        "truncate text-sm font-medium leading-none",
        collapsed && "pointer-events-none absolute opacity-0",
        className,
      )}
      initial={false}
      animate={{
        opacity: collapsed ? 0 : 1,
        x: collapsed ? -8 : 0,
      }}
      transition={SIDEBAR_MOTION_TRANSITION}
      aria-hidden={collapsed}
    >
      {children}
    </motion.span>
  );
}
