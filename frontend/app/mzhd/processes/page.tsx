import type { Metadata } from "next";

import { MzhdProcessesPage } from "@/components/sections/mzhd-processes";

export const metadata: Metadata = {
  title: "Бизнес-процессы управления МЖД | AKYL",
  description:
    "Ключевые процессы: заявки, эксплуатация, финансы, подрядчики, отчётность и контроль.",
};

export default function MzhdProcessesRoutePage() {
  return <MzhdProcessesPage />;
}
