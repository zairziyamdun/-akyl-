import { DataTable } from "@/widgets/dashboard-shell";
import { PageHeader } from "@/widgets/dashboard-shell";
import { StatusBadge } from "@/widgets/dashboard-shell";
import { mockJournalIssues } from "@/widgets/dashboard-shell";

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
