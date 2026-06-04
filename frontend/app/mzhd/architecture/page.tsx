import type { Metadata } from "next";

import { MzhdArchitecturePage } from "@/components/sections/mzhd/mzhd-architecture";

export const metadata: Metadata = {
  title: "Архитектура системы управления | AKYL",
  description:
    "Структура участников, процессов, финансов и цифровых инструментов в единой модели управления МЖД.",
};

export default function MzhdArchitectureRoutePage() {
  return <MzhdArchitecturePage />;
}
