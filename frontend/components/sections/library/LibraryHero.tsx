import { Container } from "@/components/ui/Container";

export function LibraryHero() {
  return (
    <section className="bg-card border-b border-border">
      <Container className="py-16">
        <div className="max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            База знаний
          </span>
          <h1 className="mt-2 text-4xl font-semibold text-foreground tracking-tight">
            Библиотека знаний
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Исследования, методические материалы, нормативные акты и практические
            руководства. Цифровая энциклопедия профессионального управления
            многоквартирными домами.
          </p>
        </div>
      </Container>
    </section>
  );
}
