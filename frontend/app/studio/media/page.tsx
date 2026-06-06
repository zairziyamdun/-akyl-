import { DataTable } from "@/components/dashboard/DataTable";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { mockMediaFiles } from "@/data/dashboardMockData";

export default function StudioMediaPage() {
  return (
    <>
      <PageHeader
        title="Медиафайлы"
        description="Изображения, PDF и вложения для статей журнала"
        actions={
          <Button size="sm">Загрузить файл</Button>
        }
      />

      {mockMediaFiles.length === 0 ? (
        <EmptyState
          title="Нет медиафайлов"
          description="Загрузите изображения или PDF для использования в статьях"
          action={<Button>Загрузить</Button>}
        />
      ) : (
        <DataTable
          data={mockMediaFiles}
          keyExtractor={(m) => m.id}
          columns={[
            { key: "name", header: "Файл", render: (m) => m.name },
            { key: "folder", header: "Папка", render: (m) => m.folder },
            { key: "size", header: "Размер", render: (m) => m.size },
          ]}
        />
      )}
    </>
  );
}
