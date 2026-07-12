import type { Metadata } from "next";

import { MzhdProcessesPage } from "@/widgets/mzhd-page";

export const metadata: Metadata = {
  title: "Бизнес-процессы управления МЖД | AKYL",
  description:
    "Ключевые процессы: заявки, эксплуатация, финансы, подрядчики, отчётность и контроль.",
};

export default function MzhdProcessesRoutePage() {
  return <MzhdProcessesPage />;
}
