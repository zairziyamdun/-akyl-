"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

const images = [
  { src: HOME_IMAGE_URL, alt: "Central model image 1" },
  { src: HOME_IMAGE_URL, alt: "Central model image 2" },
  { src: HOME_IMAGE_URL, alt: "Central model image 3" },
];

export function CentralModelGallerySection() {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <Container>
        <SectionHeading
          align="center"
          title="Центральная модель"
          description="Роли, процессы, финансы и данные в едином организме дома"
        />

        <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto p-4 md:p-6">
            {images.map((img) => (
              <div
                key={img.src}
                className="w-[90%] shrink-0 snap-center md:w-[70%] lg:w-[60%]"
              >
                <div className="overflow-hidden rounded-2xl ring-1 ring-black/10">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-[70vh] max-h-[36rem] w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

