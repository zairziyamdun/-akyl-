import { Download } from "lucide-react";

import { Button } from "@/components/ui/Button";

const bookFeatures = [
  "Полная теоретическая база",
  "Практическое руководство по внедрению",
  "Визуальные карты процессов",
  "Кейсы и примеры",
];

export function LibraryFeaturedBook() {
  return (
    <section id="book" className="bg-muted border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Издание
            </span>
            <h2 className="mt-2 text-3xl font-semibold text-foreground tracking-tight">
              Профессиональное управление многоквартирными жилыми домами
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Базовая книга, знакомящая с полной методологией трансформации
              управления жилым фондом. Доступна в печатном и цифровом форматах.
            </p>
            <ul className="mt-6 space-y-3">
              {bookFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Скачать фрагмент
              </Button>
              <Button variant="secondary">Заказать печатный экземпляр</Button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8">
            <div className="aspect-[3/4] bg-primary rounded-lg flex items-center justify-center mb-6">
              <div className="text-center text-primary-foreground">
                <div className="text-6xl font-bold mb-2">A</div>
                <div className="text-sm font-medium opacity-80">AKYL</div>
                <div className="text-xs mt-4 opacity-60 max-w-32 mx-auto">
                  Методология профессионального управления
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-foreground">Полное руководство</h3>
              <p className="text-sm text-muted-foreground mt-1">
                380 стр. · KZ, RU, EN
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
