import Image from "next/image";
import Link from "next/link";

import { Container } from "@/shared/ui/Container";
import { mzhdArchitectureCta, mzhdArchitectureImages } from "@/widgets/mzhd-page";

export function MzhdArchitectureCtaSection() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src={mzhdArchitectureImages.cta}
            alt={mzhdArchitectureCta.imageAlt}
            width={1600}
            height={600}
            className="h-48 w-full object-cover sm:h-64"
          />
          <div className="absolute inset-0 bg-slate-950/75" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">{mzhdArchitectureCta.title}</h2>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/consultation" className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950">
                Получить консультацию
              </Link>
              <Link href="/mzhd" className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white">
                Вернуться к методологии
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
