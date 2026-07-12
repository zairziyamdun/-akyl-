"use client";

import type { ReactNode } from "react";
import type { Transition } from "framer-motion";
import { motion } from "framer-motion";

import { homeTransition, homeViewport } from "@/widgets/home-page";

type HomeSectionMotionProps = {
  children: ReactNode;
  className?: string;
  initial?: { opacity: number; y: number };
  transition?: Transition;
};

export function HomeSectionMotion({
  children,
  className,
  initial = { opacity: 0, y: 18 },
  transition = homeTransition,
}: HomeSectionMotionProps) {
  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={homeViewport}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
