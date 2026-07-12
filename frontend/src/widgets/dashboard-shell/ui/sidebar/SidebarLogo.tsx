"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { SIDEBAR_MOTION_TRANSITION } from "../../model/sidebarNavUtils";
import { dashColors } from "../../model/sidebarTheme";

type SidebarLogoProps = {
  collapsed: boolean;
};

export function SidebarLogo({ collapsed }: SidebarLogoProps) {
  if (collapsed) {
    return (
      <div
        className="flex h-10 w-10 shrink-0 cursor-default select-none items-center justify-center overflow-hidden rounded-xl shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${dashColors.brandMid} 0%, ${dashColors.brand} 100%)`,
        }}
        aria-label="AKYL"
      >
        <Image
          src="/home/logo-akyl.svg"
          alt=""
          width={22}
          height={22}
          className="h-[22px] w-[22px] brightness-0 invert"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div
      className="flex min-w-0 cursor-default select-none items-center gap-3 overflow-hidden"
      aria-label="AKYL"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F9] p-1">
        <Image
          src="/home/logo-akyl.svg"
          alt=""
          width={32}
          height={32}
          className="h-6 w-6"
          aria-hidden
        />
      </div>
      <motion.span
        className="truncate text-xl font-bold tracking-tight text-[#0F172A]"
        initial={false}
        animate={{ opacity: 1, x: 0 }}
        transition={SIDEBAR_MOTION_TRANSITION}
      >
        AKYL
      </motion.span>
    </div>
  );
}
