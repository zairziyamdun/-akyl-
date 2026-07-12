import type { Transition, Variants } from "framer-motion";

export const consultationEase = [0.22, 1, 0.36, 1] as const;

export const consultationSectionTransition: Transition = {
  duration: 0.65,
  ease: consultationEase,
};

export const consultationSectionMotion = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: consultationSectionTransition,
};

export const consultationHeroTransition: Transition = {
  duration: 0.8,
  ease: consultationEase,
};

export const consultationStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const consultationStaggerItem: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: consultationEase },
  },
};

export const consultationCardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.01,
    transition: { duration: 0.35, ease: consultationEase },
  },
};

export const consultationFloatPanel: Variants = {
  hidden: { opacity: 0, y: 40, rotate: 1.5 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.9, ease: consultationEase, delay: 0.15 },
  },
};
