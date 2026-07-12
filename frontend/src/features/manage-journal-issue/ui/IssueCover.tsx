import Image from "next/image";

import { cn } from "@/shared/lib";

type IssueCoverThumbProps = {
  coverUrl: string;
  title: string;
  issueNumber: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-14 w-10",
  md: "h-24 w-[4.5rem]",
  lg: "h-80 w-60",
};

export function IssueCoverThumb({
  coverUrl,
  title,
  issueNumber,
  size = "sm",
  className,
}: IssueCoverThumbProps) {
  const dim = sizes[size];

  if (!coverUrl) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400 ring-1 ring-slate-200",
          dim,
          className,
        )}
      >
        №{issueNumber}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-lg shadow-sm ring-1 ring-slate-200",
        dim,
        className,
      )}
    >
      <Image
        src={coverUrl}
        alt={title}
        fill
        className="object-cover"
        sizes="80px"
        unoptimized={coverUrl.startsWith("blob:")}
      />
    </div>
  );
}

export function IssueCoverHero({
  coverUrl,
  title,
  issueNumber,
  className,
}: {
  coverUrl: string;
  title: string;
  issueNumber: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200",
        className,
      )}
    >
      {coverUrl ? (
        <Image
          src={coverUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="320px"
          priority
          unoptimized={coverUrl.startsWith("blob:")}
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-slate-100 text-slate-400">
          Нет обложки
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 to-transparent p-5">
        <p className="text-xs font-semibold tracking-wider text-sky-300 uppercase">
          Выпуск {issueNumber}
        </p>
        <p className="mt-1 font-[family-name:var(--font-sora)] text-lg font-semibold text-white">
          {title}
        </p>
      </div>
    </div>
  );
}
