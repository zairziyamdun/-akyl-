import { DataTable } from "@/widgets/dashboard-shell";
import { PageHeader } from "@/widgets/dashboard-shell";
import { Button } from "@/shared/ui/Button";
import { mockUserMaterials } from "@/widgets/dashboard-shell";

export default function UserMaterialsPage() {
  return (
    <>
      <PageHeader
        title="Мои материалы"
        description="Сохранённые шаблоны, статьи и выпуски журнала"
      />

      <DataTable
        data={mockUserMaterials}
        keyExtractor={(m) => m.id}
        columns={[
          { key: "title", header: "Название", render: (m) => m.title },
          {
            key: "type",
            header: "Тип",
            render: (m) => (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-700">
                {m.type}
              </span>
            ),
          },
          {
            key: "saved",
            header: "Статус",
            render: (m) => (m.saved ? "В коллекции" : "Доступно"),
          },
          {
            key: "actions",
            header: "",
            className: "text-right",
            render: () => (
              <Button variant="ghost" size="sm">
                Открыть
              </Button>
            ),
          },
        ]}
      />
    </>
  );
}
