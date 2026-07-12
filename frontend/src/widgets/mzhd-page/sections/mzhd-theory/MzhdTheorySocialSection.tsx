import Image from "next/image";

import { Container } from "@/shared/ui/Container";
import { mzhdTheoryImages, mzhdTheoryLayers } from "@/widgets/mzhd-page";

export function MzhdTheorySocialSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
            <Image
              src={mzhdTheoryImages.social}
              alt="Жилой дом как система"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Дом как социально-техническая система</h2>
            <p className="mt-4 text-slate-600">
              В одном контуре сходятся инженерные системы, финансы, люди и институты. Теория AKYL описывает,
              как согласовать интересы собственников, УК и города без хаоса и конфликтов.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              {mzhdTheoryLayers.map(({ text, icon: Icon }) => (
                <li key={text} className="flex gap-2">
                  <Icon size={16} className="shrink-0 text-slate-400" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
