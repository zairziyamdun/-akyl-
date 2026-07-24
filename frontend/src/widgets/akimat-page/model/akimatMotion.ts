import type { Transition, Variants } from "framer-motion";

export const akimatEase = [0.22, 1, 0.36, 1] as const;

export const akimatTransition: Transition = {
  duration: 0.6,
  ease: akimatEase,
};

export const akimatSectionMotion = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: akimatTransition,
};

export const akimatHeroTransition: Transition = {
  duration: 0.85,
  ease: akimatEase,
};

export const akimatStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

export const akimatStaggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: akimatEase },
  },
};

export const akimatLineReveal: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.7, ease: akimatEase },
  },
};
