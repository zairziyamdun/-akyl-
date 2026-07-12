import type { Metadata } from "next";

import { MzhdArchitecturePage } from "@/widgets/mzhd-page";

export const metadata: Metadata = {
  title: "Архитектура системы управления | AKYL",
  description:
    "Структура участников, процессов, финансов и цифровых инструментов в единой модели управления МЖД.",
};

export default function MzhdArchitectureRoutePage() {
  return <MzhdArchitecturePage />;
}
