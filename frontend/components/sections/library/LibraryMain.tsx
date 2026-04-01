"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  Filter,
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
} from "./libraryContent";

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

  const filteredItems = libraryItems.filter((item) => {
    const matchesType = activeType === "all" || item.type === activeType;
    const matchesTopic = !activeTopic || item.topic === activeTopic;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesTopic && matchesSearch;
  });

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск по библиотеке…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-4">Тип материала</h3>
              <div className="space-y-1">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setActiveType(type.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeType === type.id
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{type.name}</span>
                    <span className="opacity-70">{type.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-4">Темы</h3>
              <div className="space-y-1">
                {topics.map((topic) => (
                  <button
                    key={topic.name}
                    type="button"
                    onClick={() =>
                      setActiveTopic(activeTopic === topic.name ? null : topic.name)
                    }
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTopic === topic.name
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{topic.name}</span>
                    <span className="opacity-70">{topic.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-muted rounded-xl p-5">
              <h4 className="font-semibold text-foreground mb-2">Будьте в курсе</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Узнавайте о новых исследованиях и материалах первыми.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button className="w-full" size="sm">
                  Подписаться
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Показано: {filteredItems.length}
              </p>
              <Button variant="secondary" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Сортировка
              </Button>
            </div>

            <div className="space-y-4">
              {filteredItems.map((item) => {
                const TypeIcon = getTypeIcon(item.type);
                return (
                  <div
                    key={item.id}
                    className="group bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                        <TypeIcon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-accent">
                            {typeLabelsRu[item.type]}
                          </span>
                          <span className="text-xs text-muted-foreground">·</span>
                          <span className="text-xs text-muted-foreground">
                            {item.topic}
                          </span>
                          <span className="text-xs text-muted-foreground">·</span>
                          <span className="text-xs text-muted-foreground">
                            {item.date}
                          </span>
                        </div>
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                        <div className="mt-4 flex items-center gap-4">
                          {item.readTime ? (
                            <span className="text-xs text-muted-foreground">
                              {item.readTime}
                            </span>
                          ) : null}
                          {item.duration ? (
                            <span className="text-xs text-muted-foreground">
                              {item.duration}
                            </span>
                          ) : null}
                          {item.format ? (
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                              {item.format}
                            </span>
                          ) : null}
                          <button
                            type="button"
                            className="text-xs text-accent font-medium hover:underline ml-auto flex items-center gap-1"
                          >
                            {item.type === "template" ? "Скачать" : "Подробнее"}
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  По вашему запросу ничего не найдено.
                </p>
              </div>
            ) : null}

            <div className="mt-8 flex items-center justify-center gap-2">
              <Button variant="secondary" size="sm" disabled>
                Назад
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-accent text-accent-foreground"
              >
                1
              </Button>
              <Button variant="secondary" size="sm">
                2
              </Button>
              <Button variant="secondary" size="sm">
                3
              </Button>
              <Button variant="secondary" size="sm">
                Вперёд
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
