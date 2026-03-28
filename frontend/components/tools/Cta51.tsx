import { Button } from "@/components/ui/Button";

export function Cta51() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center rounded-3xl border border-black/10 bg-white p-8 md:p-12 lg:p-16">
          <div className="max-w-lg text-center">
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Начните работать эффективнее
            </h2>
            <p className="text-slate-600 md:text-lg">
              Получите доступ к инструментам, которые помогут вашей компании
              управлять домами на новом уровне качества.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
            <Button>Демо</Button>
            <Button variant="secondary">Консультация</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

