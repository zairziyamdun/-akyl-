"use client";

import { useEffect, useState } from "react";
import { cn } from "@/shared/lib";

type HeaderContainerProps = {
  children: React.ReactNode;
};

export function HeaderContainer({ children }: HeaderContainerProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-white/10 bg-[#060b14]/98 backdrop-blur-xl"
          : "border-white/6 bg-[#060b14]/90 backdrop-blur-lg",
      )}
    >
      <div className="mx-auto flex min-h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </header>
  );
}
