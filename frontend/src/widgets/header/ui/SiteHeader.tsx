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
      <div className="flex min-w-0 flex-1 items-center gap-6 lg:gap-10">
        <Link href="/" className="shrink-0" aria-label="На главную">
          <Image
            src={HOME_LOGO_URL}
            alt="AKYL"
            width={170}
            height={56}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
        <MegaMenuNav />
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
        <div className="hidden items-center gap-1 md:flex">
          <button
            type="button"
            className="rounded-full px-3 py-2 text-sm text-white/60 transition hover:bg-white/6 hover:text-white"
          >
            RU
          </button>
          <button
            type="button"
            className="rounded-full px-3 py-2 text-sm text-white/60 transition hover:bg-white/6 hover:text-white"
          >
            KZ
          </button>
        </div>

        <div className="hidden md:block">
          <PublicUserMenu />
        </div>

        <Link
          href="/consultation"
          className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02] md:inline-flex"
        >
          Консультация
        </Link>

        <MobileNavigation />
      </div>
    </HeaderContainer>
  );
}
