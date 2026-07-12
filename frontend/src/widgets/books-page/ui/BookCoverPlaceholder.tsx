import Image from "next/image";

import { cn } from "@/shared/lib";
import type { AuthorBook } from "../model/books.data";

export function BookCoverPlaceholder({
  book,
  size = "md",
  className,
}: {
  book: AuthorBook;
  size?: "sm" | "md";
  className?: string;
}) {
  const aspect = size === "sm" ? "aspect-[3/4]" : "aspect-[3/4]";
  const w =
    size === "sm" ? "w-full max-w-[260px]" : "w-full max-w-[320px]";

  return (
    <div
      className={cn(
        w,
        aspect,
        "relative overflow-hidden border border-border bg-neutral-950",
        className,
      )}
    >
      <Image
        src={book.image}
        alt={book.title}
        fill
        sizes={
          size === "sm"
            ? "(max-width: 1024px) 50vw, 260px"
            : "(max-width: 1024px) 60vw, 320px"
        }
        className="object-cover"
        priority={false}
      />
    </div>
  );
}


