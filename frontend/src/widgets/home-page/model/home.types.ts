export type HomeHeroCta = {
  label: string;
  href: string;
};

export type HomeHeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: HomeHeroCta;
  secondaryCta?: HomeHeroCta;
  image: string;
};

export type HomeHeroMetric = {
  title: string;
  value?: string;
  description: string;
  icon: "standards" | "efficiency" | "speed" | "trust";
};
