import Image from "next/image";

import type { AuthorBook } from "@/data/books";

export function BookCoverPlaceholder({
  book,
  size = "md",
}: {
  book: AuthorBook;
  size?: "sm" | "md";
}) {
  const aspect = size === "sm" ? "aspect-[3/4]" : "aspect-[3/4]";
  const w =
    size === "sm" ? "w-full max-w-[260px]" : "w-full max-w-[320px]";

  return (
    <div
      className={`${w} ${aspect} relative overflow-hidden border border-border bg-neutral-950`}
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


