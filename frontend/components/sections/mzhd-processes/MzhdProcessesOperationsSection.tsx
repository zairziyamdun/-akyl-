import Image from "next/image";
import { Hammer } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { mzhdProcessesImages } from "@/data/mzhdProcessesData";

export function MzhdProcessesOperationsSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Hammer className="text-slate-700" size={32} />
            <h2 className="mt-4 text-3xl font-semibold">Эксплуатация</h2>
            <p className="mt-4 text-slate-600">
              Планово-предупредительные работы, учёт износа, аварийные регламенты и журналы обслуживания
              инженерных систем.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-md">
            <Image
              src={mzhdProcessesImages.operations}
              alt="Эксплуатация и обслуживание"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
