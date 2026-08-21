"use client";

import Image from "next/image";
import Link from "next/link";
import { PublicUserMenu } from "@/widgets/dashboard-shell";
import { HOME_LOGO_URL } from "@/widgets/home-page";
import { HeaderContainer } from "./header-container";
import { MegaMenuNav } from "./mega-menu-nav";
import { MobileNavigation } from "./mobile-navigation";

export function SiteHeader() {
  return (
    <HeaderContainer>
      <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-8">
        <Link href="/" className="shrink-0" aria-label="На главную">
          <Image
            src={HOME_LOGO_URL}
            alt="AKYL"
            width={140}
            height={40}
            className="h-8 w-auto object-contain sm:h-9"
            priority
          />
        </Link>
        <MegaMenuNav />
      </div>

      <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
        <div className="hidden items-center gap-0.5 md:flex">
          <button
            type="button"
            className="rounded-full px-2.5 py-1.5 text-xs text-white/60 transition hover:bg-white/6 hover:text-white sm:text-sm"
          >
            RU
          </button>
          <button
            type="button"
            className="rounded-full px-2.5 py-1.5 text-xs text-white/60 transition hover:bg-white/6 hover:text-white sm:text-sm"
          >
            KZ
          </button>
        </div>

        <div className="hidden md:block">
          <PublicUserMenu />
        </div>

        <Link
          href="/consultation"
          className="hidden h-9 items-center rounded-full bg-white px-4 text-sm font-semibold text-black transition hover:scale-[1.02] md:inline-flex"
        >
          Консультация
        </Link>

        <MobileNavigation />
      </div>
    </HeaderContainer>
  );
}
