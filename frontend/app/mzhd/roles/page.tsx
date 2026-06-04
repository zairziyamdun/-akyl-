import type { Metadata } from "next";

import { MzhdRolesPage } from "@/components/sections/mzhd/mzhd-roles";

export const metadata: Metadata = {
  title: "Роли участников управления | AKYL",
  description:
    "Чёткое распределение ответственности между собственниками, ОСИ, управляющими компаниями, подрядчиками и государственными органами.",
};

export default function MzhdRolesRoutePage() {
  return <MzhdRolesPage />;
}
