import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type IconTileProps = {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
  align?: "left" | "center";
};

export function IconTile({
  icon,
  title,
  description,
  className,
  titleClassName,
  align = "left",
}: IconTileProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "",
        className,
      )}
    >
      {icon ? <div className="mb-3">{icon}</div> : null}
      <h3
        className={cn(
          "text-lg font-bold leading-tight text-slate-900 md:text-2xl",
          titleClassName,
        )}
      >
        {title}
      </h3>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

