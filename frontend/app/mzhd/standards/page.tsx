import type { Metadata } from "next";

import { MzhdStandardsPage } from "@/components/sections/mzhd-standards";

export const metadata: Metadata = {
  title: "Принципы и стандарты | AKYL",
  description:
    "Единые правила профессионального управления: прозрачность, ответственность, регламенты и контроль качества.",
};

export default function MzhdStandardsRoutePage() {
  return <MzhdStandardsPage />;
}
