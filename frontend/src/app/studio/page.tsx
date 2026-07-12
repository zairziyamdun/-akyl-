import Link from "next/link";

import { DataTable } from "@/widgets/dashboard-shell";
import { PageHeader } from "@/widgets/dashboard-shell";
import { StatCard } from "@/widgets/dashboard-shell";
import { StatusBadge } from "@/widgets/dashboard-shell";
import { Button } from "@/shared/ui/Button";
import { mockArticles, mockStudioStats } from "@/widgets/dashboard-shell";

export default function StudioDashboardPage() {
  const recent = mockArticles.slice(0, 4);

  return (
    <>
      <PageHeader
        title="Studio"
        description="Редакционный кабинет журналиста AKYL"
        actions={
          <Button asChild size="sm">
            <Link href="/studio/articles/new">Создать статью</Link>
          </Button>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mockStudioStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
            Последние статьи
          </h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/studio/articles">Все статьи</Link>
          </Button>
        </div>
        <DataTable
          data={recent}
          keyExtractor={(a) => a.id}
          columns={[
            { key: "title", header: "Заголовок", render: (a) => a.title },
            { key: "issue", header: "Выпуск", render: (a) => a.issue },
            {
              key: "status",
              header: "Статус",
              render: (a) => <StatusBadge status={a.status} />,
            },
            { key: "updated", header: "Обновлено", render: (a) => a.updated },
          ]}
        />
      </div>
    </>
  );
}
