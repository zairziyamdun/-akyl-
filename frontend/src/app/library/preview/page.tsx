import type { Metadata } from "next";

import { ArticlePreview } from "@/widgets/library-article";

export const metadata: Metadata = {
  title: "Предпросмотр статьи | AKYL",
  robots: { index: false, follow: false },
};

/** Admin draft preview; the content comes from the editor via localStorage. */
export default function LibraryPreviewPage() {
  return <ArticlePreview />;
}
