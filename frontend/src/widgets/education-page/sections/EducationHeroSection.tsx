import Image from "next/image";
import Link from "next/link";

import { Container } from "@/shared/ui/Container";
import { educationHero, educationImages } from "@/widgets/education-page";

export function EducationHeroSection() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src={educationImages.hero}
          alt={educationHero.heroImageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/55 to-slate-900/40" />
      </div>

      <Container className="relative z-10 flex min-h-[80vh] flex-col justify-center py-20">
        <span className="mb-4 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-sm">
          {educationHero.badge}
        </span>
        <h1 className="max-w-4xl font-[family-name:var(--font-sora)] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {educationHero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
          {educationHero.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/consultation"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            Получить консультацию
          </Link>
          <Link
            href="/mzhd"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
          >
            Вернуться к методологии
          </Link>
        </div>
      </Container>
    </section>
  );
}
