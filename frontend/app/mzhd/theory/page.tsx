import type { Metadata } from "next";

import { MzhdTheoryPage } from "@/components/sections/mzhd-theory";

export const metadata: Metadata = {
  title: "Теория управления МЖД | AKYL",
  description:
    "Научная база профессионального управления многоквартирными домами: системный подход, кибернетика и обратная связь.",
};

export default function MzhdTheoryRoutePage() {
  return <MzhdTheoryPage />;
}
