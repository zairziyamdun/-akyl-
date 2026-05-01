import type { Metadata } from "next";

import { ImplementationPage } from "@/components/sections/implementation";

export const metadata: Metadata = {
  title: "Практика внедрения | AKYL",
  description:
    "Пошаговая модель внедрения методологии AKYL: диагностика, аудит, проектирование системы, инструменты, обучение и контроль.",
};

export default function ImplementationRoutePage() {
  return <ImplementationPage />;
}
