export type HomeHeroCta = {
  label: string;
  href: string;
};

export type HomeHeroSlide = {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: HomeHeroCta;
  secondaryCta?: HomeHeroCta;
  image: string;
};

export type HomeHeroDiagramItem = {
  label: string;
  className: string;
};

export type HomeHeroKpi = {
  label: string;
  value: number;
};
