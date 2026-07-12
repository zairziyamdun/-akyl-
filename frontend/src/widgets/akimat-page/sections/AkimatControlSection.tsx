import Image from "next/image";

import { Container } from "@/shared/ui/Container";
import {
  akimatControlBullets,
  akimatControlSection,
  akimatImages,
} from "@/widgets/akimat-page";

export function AkimatControlSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
            <Image
              src={akimatImages.control}
              alt={akimatControlSection.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {akimatControlSection.title}
            </h2>
            <p className="mt-4 text-slate-600">
              {akimatControlSection.description}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {akimatControlBullets.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
