import Image from "next/image";

import { cn } from "@/shared/lib";

import { LIBRARY_TYPE_ICONS, type LibraryMaterialType } from "../model/types";

const PLACEHOLDER_GRADIENTS: Record<LibraryMaterialType, string> = {
  article: "from-slate-800 via-slate-700 to-sky-800",
  research: "from-indigo-900 via-indigo-800 to-sky-700",
  regulation: "from-stone-800 via-stone-700 to-amber-800",
  template: "from-emerald-900 via-emerald-800 to-teal-700",
  video: "from-rose-900 via-rose-800 to-orange-700",
};

/** Cover image, or a branded gradient with the type icon when there is none. */
export function MaterialCover({
  src,
  type,
  alt = "",
  className,
  priority = false,
  iconClassName,
}: {
  src: string | null | undefined;
  type: LibraryMaterialType;
  alt?: string;
  className?: string;
  priority?: boolean;
  iconClassName?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        unoptimized
        priority={priority}
        className={cn("h-full w-full bg-slate-100 object-cover", className)}
      />
    );
  }

  const Icon = LIBRARY_TYPE_ICONS[type];
  return (
    <div
      aria-hidden
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br",
        PLACEHOLDER_GRADIENTS[type],
        className,
      )}
    >
      <Icon className={cn("size-10 text-white/70", iconClassName)} />
    </div>
  );
}
