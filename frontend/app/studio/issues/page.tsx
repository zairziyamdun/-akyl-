import { DataTable } from "@/components/dashboard/DataTable";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { mockJournalIssues } from "@/data/dashboardMockData";

export default function StudioIssuesPage() {
  return (
    <>
      <PageHeader
        title="Выпуски журнала"
        description="Выпуски, доступные для публикации статей"
      />

      <DataTable
        data={mockJournalIssues.filter((i) => i.status !== "archived")}
        keyExtractor={(i) => i.id}
        columns={[
          { key: "id", header: "№", render: (i) => i.id },
          { key: "title", header: "Название", render: (i) => i.title },
          { key: "year", header: "Год", render: (i) => i.year },
          {
            key: "status",
            header: "Статус",
            render: (i) => <StatusBadge status={i.status} />,
          },
        ]}
      />
    </>
  );
}
