import Image from "next/image";

import { Container } from "@/components/ui/Container";
import {
  educationFormats,
  educationFormatsSection,
  educationImages,
} from "@/data/educationData";

export function EducationFormatsSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {educationFormatsSection.title}
            </h2>
            <p className="mt-4 text-slate-600">
              {educationFormatsSection.description}
            </p>
            <div className="mt-8 space-y-4">
              {educationFormats.map((format) => (
                <div
                  key={format.title}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <h3 className="font-semibold">{format.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{format.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
            <Image
              src={educationImages.formats}
              alt={educationFormatsSection.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
