import type { Transition } from "framer-motion";

export const implementationSectionTransition: Transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1],
};

export const implementationSectionMotion = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: implementationSectionTransition,
};
