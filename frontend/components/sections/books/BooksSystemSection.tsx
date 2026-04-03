import { Container } from "@/components/ui/Container";

export function BooksSystemSection() {
  return (
    <section className="border-b border-border bg-card">
      <Container className="py-14 md:py-16 lg:py-20">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Серия книг формирует целостную модель профессионального управления
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
            Теория задаёт архитектуру управления, практика закрепляет её в
            процессах и эксплуатации, а обучение готовит специалистов и
            поддерживает внедрение — поэтому методология работает как единая
            система.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background p-6">
            <div className="text-sm font-semibold text-foreground">
              1 · Теория
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Управленческая логика, роли, связи, архитектура KPI и цифровая
              модель.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <div className="text-sm font-semibold text-foreground">
              2 · Практика
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Процессы, эксплуатация, подрядчики, управленческая аналитика и
              решения.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <div className="text-sm font-semibold text-foreground">
              3 · Внедрение и обучение
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Подготовка команд, стандарты компетенций, сопровождение
              внедрения.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

