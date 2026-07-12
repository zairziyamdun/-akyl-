import type { Metadata } from "next";

import { PublicIssueDetail } from "@/widgets/journal-public";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Выпуск журнала | AKYL`,
    description: `PDF-выпуск экспертного журнала AKYL (${id}).`,
  };
}

export default async function JournalIssuePage({ params }: PageProps) {
  const { id } = await params;
  return <PublicIssueDetail issueId={id} />;
}
