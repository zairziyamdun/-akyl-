import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { mzhdTheoryHero, mzhdTheoryImages } from "@/data/mzhdTheoryData";

export function MzhdTheoryHeroSection() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src={mzhdTheoryImages.hero}
          alt={mzhdTheoryHero.imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/60 to-indigo-950/50" />
      </div>
      <Container className="relative z-10 flex min-h-[80vh] flex-col justify-center py-20">
        <span className="mb-4 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase">
          {mzhdTheoryHero.badge}
        </span>
        <h1 className="max-w-4xl font-[family-name:var(--font-sora)] text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          {mzhdTheoryHero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/75">{mzhdTheoryHero.description}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/consultation" className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950">
            Получить консультацию
          </Link>
          <Link href="/mzhd" className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white">
            Вернуться к методологии
          </Link>
        </div>
      </Container>
    </section>
  );
}
