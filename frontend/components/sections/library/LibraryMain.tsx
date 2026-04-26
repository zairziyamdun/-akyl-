"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Download,
  FileText,
  Folder,
  ScrollText,
  Search,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

import {
  contentTypes,
  libraryItems,
  topics,
  typeLabelsRu,
  type LibraryItemType,
} from "@/data/libraryContent";

const filterChipBase =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-[color,background-color,border-color,box-shadow] duration-200";

const filterChipActive =
  "border-2 border-foreground/80 bg-foreground text-background shadow-sm";

const filterChipInactive =
  "border border-border bg-background text-muted-foreground hover:border-muted-foreground/30 hover:bg-muted hover:text-foreground";

function getTypeIcon(type: LibraryItemType) {
  switch (type) {
    case "article":
      return FileText;
    case "research":
      return ScrollText;
    case "regulation":
      return Folder;
    case "template":
      return Download;
    case "video":
      return Video;
    default:
      return FileText;
  }
}

export function LibraryMain() {
  const [activeType, setActiveType] = useState("all");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return libraryItems.filter((item) => {
      const matchesType = activeType === "all" || item.type === activeType;
      const matchesTopic = !activeTopic || item.topic === activeTopic;
      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        query.length === 0 ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.topic.toLowerCase().includes(query);

      return matchesType && matchesTopic && matchesSearch;
    });
  }, [activeType, activeTopic, searchQuery]);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-10 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/40">
          <div className="grid gap-8 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <span className="inline-flex items-center rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                Библиотека знаний AKYL
              </span>

              <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Материалы, исследования и инструменты для профессионального
                управления МЖД
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                Единое пространство для теории и практики, аналитики, нормативных
                материалов, шаблонов и практических решений. Всё, что помогает
                перейти от хаотичного управления к системной модели.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/80 p-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {libraryItems.length}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    материалов в библиотеке
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {topics.length}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    тематических направлений
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-border bg-card p-4 md:p-5">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск по библиотеке, темам и материалам…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition focus:border-accent"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {contentTypes.map((type) => {
                  const isActive = activeType === type.id;

                  return (
                    <button
                      key={type.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveType(type.id)}
                      className={`${filterChipBase} ${
                        isActive ? filterChipActive : filterChipInactive
                      }`}
                    >
                      {isActive ? (
                        <Check
                          className="size-3.5 shrink-0 stroke-[2.5]"
                          aria-hidden
                        />
                      ) : null}
                      {type.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => {
                  const isActive = activeTopic === topic.name;

                  return (
                    <button
                      key={topic.name}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() =>
                        setActiveTopic(isActive ? null : topic.name)
                      }
                      className={`${filterChipBase} ${
                        isActive ? filterChipActive : filterChipInactive
                      }`}
                    >
                      {isActive ? (
                        <Check
                          className="size-3.5 shrink-0 stroke-[2.5]"
                          aria-hidden
                        />
                      ) : null}
                      {topic.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Найдено материалов:{" "}
              <span className="font-medium text-foreground">
                {filteredItems.length}
              </span>
            </p>
          </div>

          {(activeType !== "all" || activeTopic || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setActiveType("all");
                setActiveTopic(null);
                setSearchQuery("");
              }}
              className="text-sm font-medium text-accent hover:underline"
            >
              Сбросить фильтры
            </button>
          )}
        </div>
        {/* Список материалов */}
        {filteredItems.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => {
              const TypeIcon = getTypeIcon(item.type);

              return (
                <article
                  key={item.id}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted transition group-hover:bg-accent/10">
                      <TypeIcon className="h-5 w-5 text-accent" />
                    </div>

                    <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                      {typeLabelsRu[item.type]}
                    </span>
                  </div>

                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{item.topic}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-base font-semibold leading-6 text-foreground transition group-hover:text-accent">
                    {item.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.readTime ? (
                      <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        {item.readTime}
                      </span>
                    ) : null}

                    {item.duration ? (
                      <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        {item.duration}
                      </span>
                    ) : null}

                    {item.format ? (
                      <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        {item.format}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-auto pt-6">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                    >
                      {item.type === "template" ? "Скачать материал" : "Открыть материал"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">
              Ничего не найдено
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Попробуйте изменить поисковый запрос, сбросить фильтры или выбрать
              другую тему материалов.
            </p>
          </div>
        )}
        {/* Подписка на обновления */}
        <div className="mt-10 rounded-3xl border border-border bg-muted/50 p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Получайте новые материалы первыми
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Подпишитесь на обновления библиотеки, чтобы следить за новыми
                исследованиями, методическими материалами и практическими
                инструментами по управлению МЖД.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent"
                />
                <Button className="h-11 w-full" size="sm">
                  Подписаться
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}