import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

export function Layout13() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-20">
          
          {/* LEFT CONTENT */}
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Основное
            </p>

            <h2 className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Индекс эффективности управления домом
            </h2>

            <p className="mb-6 text-slate-600 text-base md:text-lg leading-relaxed">
              Единая метрика, которая объединяет все аспекты управления
              многоквартирным домом в одно число. Управляющие компании,
              акиматы и советы домов получают ясную картину качества работы
              и видят, где нужны улучшения.
            </p>

            {/* MINI ICONS */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-12 w-12 overflow-hidden rounded-lg border bg-white shadow-sm"
                >
                  <img
                    src={HOME_IMAGE_URL}
                    alt="feature"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex items-center gap-4">
              
              <Link href="/efficiency-index">
                <Button variant="secondary">
                  Подробнее
                </Button>
              </Link>

              <Link href="/efficiency-index">
                <Button variant="link">
                  →
                </Button>
              </Link>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="overflow-hidden rounded-3xl shadow-md">
            <img
              src={HOME_IMAGE_URL}
              alt="Индекс эффективности"
              className="w-full h-[400px] object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}