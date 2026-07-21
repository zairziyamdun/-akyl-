"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { HOUSE_CABINET_BASE } from "@/entities/house";

/**
 * Temporary compatibility for /manager/* → /app/*
 * Remove the whole /manager tree after migration is complete.
 */
export default function ManagerLegacyCatchAllPage() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const houseMatch = pathname.match(
      /^\/manager\/houses\/([^/]+)(?:\/([^/]+))?/,
    );
    if (houseMatch) {
      const houseId = houseMatch[1];
      const panel = houseMatch[2] ?? "overview";
      router.replace(`${HOUSE_CABINET_BASE}/${houseId}/${panel}`);
      return;
    }

    if (pathname === "/manager/houses" || pathname === "/manager") {
      router.replace(HOUSE_CABINET_BASE);
      return;
    }

    // Flat /manager/finance etc. → houses list (house context required)
    router.replace(HOUSE_CABINET_BASE);
  }, [pathname, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F7FB] text-sm text-slate-500">
      Переход в кабинет…
    </div>
  );
}
