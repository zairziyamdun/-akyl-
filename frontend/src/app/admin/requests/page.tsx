import {
  DataTable,
  mockConsultationRequests,
  PageHeader,
  StatusBadge,
} from "@/widgets/dashboard-shell";

export default function AdminRequestsPage() {
  return (
    <>
      <PageHeader
        title="Заявки консультаций"
        description="Входящие обращения с формы консультации на сайте"
      />

      <DataTable
        data={mockConsultationRequests}
        keyExtractor={(r) => r.id}
        columns={[
          { key: "name", header: "Имя", render: (r) => r.name },
          {
            key: "organization",
            header: "Организация",
            render: (r) => r.organization,
          },
          { key: "role", header: "Роль", render: (r) => r.role },
          { key: "email", header: "Email", render: (r) => r.email },
          {
            key: "status",
            header: "Статус",
            render: (r) => <StatusBadge status={r.status} />,
          },
          { key: "date", header: "Дата", render: (r) => r.createdAt },
          {
            key: "message",
            header: "Сообщение",
            render: (r) => (
              <span className="line-clamp-1 max-w-xs text-slate-500">
                {r.message}
              </span>
            ),
          },
        ]}
      />
    </>
  );
}
