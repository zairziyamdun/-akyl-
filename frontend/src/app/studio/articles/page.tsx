import Link from "next/link";

import { DataTable } from "@/widgets/dashboard-shell";
import { PageHeader } from "@/widgets/dashboard-shell";
import { StatusBadge } from "@/widgets/dashboard-shell";
import { Button } from "@/shared/ui/Button";
import { mockArticles } from "@/widgets/dashboard-shell";

export default function StudioArticlesPage() {
  return (
    <>
      <PageHeader
        title="Мои статьи"
        description="Черновики, материалы на модерации и опубликованные статьи"
        actions={
          <Button asChild size="sm">
            <Link href="/studio/articles/new">Создать статью</Link>
          </Button>
        }
      />

      <DataTable
        data={mockArticles}
        keyExtractor={(a) => a.id}
        columns={[
          { key: "title", header: "Заголовок", render: (a) => a.title },
          { key: "issue", header: "Выпуск", render: (a) => `#${a.issue}` },
          {
            key: "status",
            header: "Статус",
            render: (a) => <StatusBadge status={a.status} />,
          },
          { key: "updated", header: "Обновлено", render: (a) => a.updated },
          {
            key: "actions",
            header: "",
            className: "text-right",
            render: () => (
              <Button asChild variant="ghost" size="sm">
                <Link href="/studio/articles/new">Редактировать</Link>
              </Button>
            ),
          },
        ]}
      />
    </>
  );
}
