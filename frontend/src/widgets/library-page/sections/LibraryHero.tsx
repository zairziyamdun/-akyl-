import { Container } from "@/shared/ui/Container";

export function LibraryHero() {
  return (
    <section className="page-hero-height flex items-center border-b border-border bg-card">
      <Container className="py-16">
        <div className="max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            База знаний
          </span>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">
            Библиотека знаний
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Исследования, методические материалы, нормативные акты и
            практические руководства. Цифровая энциклопедия профессионального
            управления многоквартирными домами.
          </p>
        </div>
      </Container>
    </section>
  );
}
