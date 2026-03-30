"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { usePathname } from "next/navigation";

import { HOME_LOGO_URL } from "@/lib/homeAssets";
import { Container } from "@/components/ui/Container";

type NavItem = {
  label: string;
  href: string;
};

type MegaItem = {
  title: string;
  description: string;
  href: string;
};

type MegaGroup = {
  title: string;
  items: MegaItem[];
};

const primaryLinks: NavItem[] = [
  { label: "Инструменты", href: "/tools" },
  { label: "МКД", href: "https://k.akyl.kz/" },
  { label: "Кейсы", href: "/cases" },
  { label: "Журнал", href: "/journal" },
  { label: "Контакты", href: "/contacts" },
];

const megaGroups: MegaGroup[] = [
  {
    title: "Методология",
    items: [
      {
        title: "Методология управления",
        description: "Подход, структура и логика профессионального управления МЖД",
        href: "/methodology",
      },
      {
        title: "Теория управления МЖД",
        description: "Системный и научный подход к управлению домом",
        href: "/methodology/theory",
      },
      {
        title: "Архитектура системы",
        description: "Компоненты, связи и уровни системы управления",
        href: "/methodology/architecture",
      },
      {
        title: "Роли участников",
        description: "Ответственность, взаимодействие и управленческие роли",
        href: "/methodology/roles",
      },
    ],
  },
  {
    title: "Атлас",
    items: [
      {
        title: "Атлас управления",
        description: "Визуальная карта системы управления МЖД",
        href: "/atlas",
      },
      {
        title: "Архитектура управления",
        description: "Схема всех ключевых элементов и связей",
        href: "/atlas/architecture",
      },
      {
        title: "Карты процессов",
        description: "Пошаговые карты бизнес-процессов управления",
        href: "/atlas/process-maps",
      },
      {
        title: "Схемы взаимодействия",
        description: "Модели коммуникаций, ролей и принятия решений",
        href: "/atlas/interactions",
      },
    ],
  },
  {
    title: "Библиотека",
    items: [
      {
        title: "Библиотека знаний",
        description: "Материалы, статьи, шаблоны и исследования",
        href: "/library",
      },
      {
        title: "Аналитика и статьи",
        description: "Экспертные публикации и обзоры отрасли",
        href: "/library/articles",
      },
      {
        title: "Научные исследования",
        description: "Исследовательская база и научные материалы",
        href: "/library/research",
      },
      {
        title: "Шаблоны",
        description: "Готовые документы и инструменты для практики",
        href: "/library/templates",
      },
    ],
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useOnClickOutside(
  refs: Array<RefObject<HTMLElement | null>>,
  handler: () => void,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent) => {
      const target = event.target as Node | null;

      const clickedInside = refs.some((ref) => {
        const el = ref.current;
        return el ? el.contains(target) : false;
      });

      if (!clickedInside) handler();
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [refs, handler, enabled]);
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function FloatingControls() {
  return (
    <div className="pointer-events-auto fixed right-6 top-[96px] z-[60] hidden lg:block">
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#0c1628]/92 px-2 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <button
          type="button"
          className="rounded-full px-3 py-1.5 text-sm font-medium text-white/65 transition hover:bg-white/6 hover:text-white"
        >
          RU
        </button>

        <button
          type="button"
          className="rounded-full px-3 py-1.5 text-sm font-medium text-white/65 transition hover:bg-white/6 hover:text-white"
        >
          KZ
        </button>

        <span className="mx-1 h-4 w-px bg-white/10" />

        <button
          type="button"
          aria-label="Переключить тему"
          className="rounded-full px-3 py-1.5 text-sm font-medium text-white/65 transition hover:bg-white/6 hover:text-white"
        >
          ☾
        </button>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  return <NavbarInner key={pathname} pathname={pathname} />;
}

function NavbarInner({ pathname }: { pathname: string }) {
  const menuId = useId();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMegaOpen, setDesktopMegaOpen] = useState(false);
  const [mobileMegaOpen, setMobileMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);
  const megaRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(
    [headerRef, megaRef],
    () => {
      setDesktopMegaOpen(false);
    },
    desktopMegaOpen,
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDesktopMegaOpen(false);
        setMobileOpen(false);
        setMobileMegaOpen(false);
      }
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const systemActive =
    isActive(pathname, "/methodology") ||
    isActive(pathname, "/atlas") ||
    isActive(pathname, "/library");

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "relative sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-white/10 bg-[#0a1220]/95 backdrop-blur-xl"
            : "border-white/8 bg-[#0a1220]/88 backdrop-blur-lg",
        )}
      >
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#08111f_0%,#0b1830_48%,#0d1d34_100%)]" />

        <Container className="py-4">
          <div className="flex min-w-0 items-center justify-between gap-3 md:gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-6 lg:gap-8">
              <Link
                href="/"
                className="inline-flex shrink-0 items-center"
                onClick={() => {
                  setDesktopMegaOpen(false);
                  setMobileOpen(false);
                }}
              >
                <Image
                  src={HOME_LOGO_URL}
                  alt="AKYL"
                  width={170}
                  height={56}
                  className="h-10 w-auto object-contain sm:h-[46px] lg:h-[50px] xl:h-[50px] xl:w-[150px]"
                  priority
                />
              </Link>

              {/* Desktop / large tablet: lg–∞; compact padding on lg–xl to reduce overflow */}
              <nav
                className="hidden min-w-0 flex-nowrap items-center gap-0.5 overflow-x-auto overflow-y-visible overscroll-x-contain lg:flex lg:gap-1 xl:gap-1 [scrollbar-width:thin]"
                aria-label="Основная навигация"
              >
                <button
                  type="button"
                  aria-expanded={desktopMegaOpen}
                  aria-controls={menuId}
                  onClick={() => setDesktopMegaOpen((prev) => !prev)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition xl:gap-2 xl:px-4 xl:py-2.5 xl:text-[15px]",
                    systemActive || desktopMegaOpen
                      ? "bg-white/8 text-white"
                      : "text-white/84 hover:bg-white/6 hover:text-white",
                  )}
                >
                  <span>Система</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-[10px] transition-transform duration-200",
                      desktopMegaOpen && "rotate-180",
                    )}
                  >
                    ▾
                  </span>
                </button>

                {primaryLinks.map((item) => {
                  const active = isActive(pathname, item.href);

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "shrink-0 rounded-full px-3 py-2 text-sm font-medium transition xl:px-4 xl:py-2.5 xl:text-[15px]",
                        active
                          ? "bg-white/8 text-white"
                          : "text-white/80 hover:bg-white/6 hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-2 md:flex md:gap-3">
                {/* <Link
                  href="/login"
                  className="rounded-full border border-white/10 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-white/6 sm:px-4 sm:py-3 sm:text-sm xl:px-5"
                >
                  Войти
                </Link> */}

                <Link
                  href="/contacts"
                  className="rounded-full border border-[#bfa06a]/35 bg-white/[0.02] px-3 py-2.5 text-xs font-semibold text-[#e6d1a1] transition hover:bg-[#bfa06a]/8 hover:text-white sm:px-4 sm:py-3 sm:text-sm xl:px-5"
                >
                  Консультация
                </Link>
              </div>

              {/* Burger: &lt; lg (tablet portrait / narrow); desktop row uses lg+ */}
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition hover:bg-white/8 sm:h-11 sm:w-11 lg:hidden"
                aria-expanded={mobileOpen}
                aria-controls={`${menuId}-mobile`}
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                <span className="sr-only">Открыть меню</span>
                <span aria-hidden="true" className="text-lg">
                  {mobileOpen ? "✕" : "☰"}
                </span>
              </button>
            </div>
          </div>
        </Container>

        {/* Mega menu: overlay, no layout shift */}
        {desktopMegaOpen && (
          <div
            ref={megaRef}
            id={menuId}
            className="absolute left-0 right-0 top-full z-[60] hidden max-h-[min(80vh,720px)] overflow-y-auto overscroll-contain border-t border-white/10 bg-[#0c1628]/98 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:block"
          >
            <Container className="py-6 xl:py-8">
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {megaGroups.map((group) => (
                  <div
                    key={group.title}
                    className="rounded-[26px] border border-white/8 bg-white/[0.03] p-5"
                  >
                    <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d5bd8c]">
                      {group.title}
                    </h3>

                    <ul className="mt-4 space-y-2">
                      {group.items.map((item) => (
                        <li key={item.title}>
                          <Link
                            href={item.href}
                            onClick={() => setDesktopMegaOpen(false)}
                            className={cn(
                              "block rounded-2xl border border-transparent p-4 transition",
                              isActive(pathname, item.href)
                                ? "border-white/10 bg-white/8"
                                : "hover:border-white/8 hover:bg-white/6",
                            )}
                          >
                            <p className="text-sm font-semibold text-white">
                              {item.title}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-white/60">
                              {item.description}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        )}

        {mobileOpen && (
          <div
            id={`${menuId}-mobile`}
            className="border-t border-white/10 bg-[#0c1628]/98 backdrop-blur-2xl lg:hidden"
          >
            <Container className="py-3 sm:py-4">
              <div
                className="max-h-[min(calc(100dvh-5.5rem),calc(100vh-5.5rem))] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] [scrollbar-gutter:stable]"
              >
                <div className="flex flex-col gap-2 pb-1">
                  <div className="mb-2 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3">
                    <div className="flex items-center gap-2 text-sm">
                      <button
                        type="button"
                        className="rounded-full px-3 py-1.5 text-white/70 transition hover:bg-white/8 hover:text-white"
                      >
                        RU
                      </button>
                      <button
                        type="button"
                        className="rounded-full px-3 py-1.5 text-white/70 transition hover:bg-white/8 hover:text-white"
                      >
                        KZ
                      </button>
                    </div>

                    <button
                      type="button"
                      className="rounded-full px-3 py-1.5 text-sm text-white/70 transition hover:bg-white/8 hover:text-white"
                      aria-label="Переключить тему"
                    >
                      ☾
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileMegaOpen((prev) => !prev)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition",
                      systemActive || mobileMegaOpen
                        ? "bg-white/10 text-white"
                        : "text-white/82 hover:bg-white/8 hover:text-white",
                    )}
                  >
                    <span>Система</span>
                    <span aria-hidden="true">{mobileMegaOpen ? "▴" : "▾"}</span>
                  </button>

                  {mobileMegaOpen && (
                    <div className="grid gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      {megaGroups.map((group) => (
                        <div key={group.title}>
                          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#d5bd8c]">
                            {group.title}
                          </h3>

                          <ul className="mt-2 space-y-1">
                            {group.items.map((item) => (
                              <li key={item.title}>
                                <Link
                                  href={item.href}
                                  onClick={() => {
                                    setMobileOpen(false);
                                    setMobileMegaOpen(false);
                                  }}
                                  className={cn(
                                    "block rounded-xl px-3 py-3 transition",
                                    isActive(pathname, item.href)
                                      ? "bg-white/10"
                                      : "hover:bg-white/8",
                                  )}
                                >
                                  <p className="text-sm font-semibold text-white">
                                    {item.title}
                                  </p>
                                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                                    {item.description}
                                  </p>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {primaryLinks.map((item) => {
                    const active = isActive(pathname, item.href);

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "rounded-2xl px-4 py-3 text-sm font-medium transition",
                          active
                            ? "bg-white/10 text-white"
                            : "text-white/82 hover:bg-white/8 hover:text-white",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-2xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/8"
                    >
                      Войти
                    </Link>

                    <Link
                      href="/contacts"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-2xl border border-[#bfa06a]/35 bg-white/[0.02] px-4 py-3 text-center text-sm font-semibold text-[#e6d1a1] transition hover:bg-[#bfa06a]/8 hover:text-white"
                    >
                      Консультация
                    </Link>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}
      </header>

      <FloatingControls />
    </>
  );
}