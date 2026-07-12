import { DataTable } from "@/widgets/dashboard-shell";
import { PageHeader } from "@/widgets/dashboard-shell";
import { mockLibraryItems } from "@/widgets/dashboard-shell";

const typeLabels: Record<string, string> = {
  article: "Article",
  research: "Research",
  template: "Template",
  book: "Book",
};

export default function AdminLibraryPage() {
  return (
    <>
      <PageHeader
        title="Библиотека"
        description="Материалы базы знаний: статьи, исследования, шаблоны и книги"
      />

      <DataTable
        data={mockLibraryItems}
        keyExtractor={(i) => i.id}
        columns={[
          { key: "title", header: "Название", render: (i) => i.title },
          {
            key: "type",
            header: "Тип",
            render: (i) => (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                {typeLabels[i.type] ?? i.type}
              </span>
            ),
          },
          { key: "topic", header: "Тема", render: (i) => i.topic },
        ]}
      />
    </>
  );
}
