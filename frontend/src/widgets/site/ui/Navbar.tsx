"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/shared/lib";
import { Container } from "@/shared/ui/Container";
import { PublicUserMenu } from "@/widgets/dashboard-shell";
import { HOME_LOGO_URL } from "@/widgets/home-page";

type NavItem = {
  label: string;
  href: string;
};

const primaryLinks: NavItem[] = [
  { label: "Управление МЖД", href: "/mzhd" },
  { label: "Практика внедрения", href: "/implementation" },
  { label: "Акимат", href: "/akimat" },
  { label: "База знаний", href: "/library" },
];

const secondaryLinks: NavItem[] = [
  { label: "Обучение", href: "/education" },
  { label: "Журнал", href: "/journal" },
  { label: "Старый сайт", href: "https://akyl.kz/" },
  { label: "Инструменты", href: "/tools" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("http")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  item,
  pathname,
  variant = "primary",
  onClick,
}: {
  item: NavItem;
  pathname: string;
  variant?: "primary" | "secondary" | "mobile";
  onClick?: () => void;
}) {
  const active = isActive(pathname, item.href);
  const external = item.href.startsWith("http");

  return (
    <Link
      href={item.href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        variant === "primary" &&
          "rounded-full px-4 py-2 text-sm font-medium transition",
        variant === "primary" &&
          (active
            ? "bg-white/12 text-white"
            : "text-white/80 hover:bg-white/7 hover:text-white"),

        variant === "secondary" &&
          "text-sm text-white/50 transition hover:text-white/80",
        variant === "mobile" &&
          "rounded-2xl px-4 py-3 text-sm font-medium transition",
        variant === "mobile" &&
          (active
            ? "bg-white/10 text-white"
            : "text-white/80 hover:bg-white/8 hover:text-white"),
      )}
    >
      {item.label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  return <NavbarInner key={pathname} pathname={pathname} />;
}

function NavbarInner({ pathname }: { pathname: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-white/8 bg-[#060b14]/95 backdrop-blur-xl"
          : "border-white/6 bg-[#060b14]/90 backdrop-blur-lg",
      )}
    >
      <Container className="py-3.5">
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* LEFT — LOGO */}
          <div className="flex items-center">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image
                src={HOME_LOGO_URL}
                alt="AKYL"
                width={170}
                height={56}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* CENTER — NAV */}
          <div className="hidden lg:flex flex-col items-center">
            <nav className="flex items-center gap-2">
              {primaryLinks.map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  variant="primary"
                />
              ))}
            </nav>

            <div className="mt-1 flex items-center gap-3 text-sm text-white/50">
              {secondaryLinks.map((item, i) => (
                <div key={item.label} className="flex items-center gap-3">
                  {i > 0 && <span className="text-white/20">·</span>}
                  <NavLink
                    item={item}
                    pathname={pathname}
                    variant="secondary"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — CTA + ACTIONS */}
          <div className="flex items-center justify-end gap-3">
            <div className="hidden md:flex items-center gap-2">
              <button className="rounded-full px-3 py-2 text-sm text-white/60 hover:bg-white/6 hover:text-white">
                RU
              </button>
              <button className="rounded-full px-3 py-2 text-sm text-white/60 hover:bg-white/6 hover:text-white">
                KZ
              </button>
              <button className="rounded-full px-3 py-2 text-sm text-white/60 hover:bg-white/6 hover:text-white">
                ☾
              </button>
            </div>

            <PublicUserMenu />

            <Link
              href="/consultation"
              className="hidden md:inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02]"
            >
              Консультация
            </Link>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white lg:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </Container>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t border-white/8 bg-[#060b14]/98 backdrop-blur-2xl lg:hidden">
          <Container className="py-4">
            <div className="flex flex-col gap-2">
              {primaryLinks.map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  variant="mobile"
                  onClick={() => setMobileOpen(false)}
                />
              ))}

              <div className="mt-3 text-xs text-white/40">Дополнительно</div>

              {secondaryLinks.map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  variant="mobile"
                  onClick={() => setMobileOpen(false)}
                />
              ))}

              <Link
                href="/login"
                className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-medium text-white"
                onClick={() => setMobileOpen(false)}
              >
                Войти
              </Link>

              <Link
                href="/consultation"
                className="mt-2 rounded-xl bg-white px-4 py-3 text-center text-black font-semibold"
              >
                Консультация
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
