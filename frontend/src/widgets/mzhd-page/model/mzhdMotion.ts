import type { Transition, Variants } from "framer-motion";

export const mzhdEase = [0.22, 1, 0.36, 1] as const;

export const mzhdTransition: Transition = {
  duration: 0.55,
  ease: mzhdEase,
};

export const sectionMotion = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: mzhdTransition,
};

export const mzhdStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const mzhdStaggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: mzhdEase },
  },
};
