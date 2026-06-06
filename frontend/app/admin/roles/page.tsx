import { PageHeader } from "@/components/dashboard/PageHeader";
import { RoleBadge } from "@/components/dashboard/RoleBadge";
import { mockPermissionMatrix, mockRoleCards } from "@/data/dashboardMockData";
import type { AkylRole } from "@/lib/auth/mockAuth";

function Check({ value }: { value: boolean }) {
  return (
    <span className={value ? "text-emerald-600" : "text-slate-300"}>
      {value ? "✓" : "—"}
    </span>
  );
}

export default function AdminRolesPage() {
  return (
    <>
      <PageHeader
        title="Роли и права"
        description="Матрица доступа по ролям платформы"
      />

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {mockRoleCards.map((card) => (
          <div
            key={card.role}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
                {card.title}
              </h3>
              <RoleBadge role={card.role} />
            </div>
            <p className="mb-4 text-sm text-slate-500">{card.description}</p>
            <ul className="space-y-1 text-sm text-slate-600">
              {card.permissions.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="text-sky-500">•</span> {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
            Матрица прав
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Функция
                </th>
                {(["admin", "journalist", "user"] as AkylRole[]).map((r) => (
                  <th
                    key={r}
                    className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500"
                  >
                    {r}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockPermissionMatrix.map((row) => (
                <tr key={row.feature} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 text-sm text-slate-700">{row.feature}</td>
                  <td className="px-4 py-3 text-center">
                    <Check value={row.admin} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Check value={row.journalist} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Check value={row.user} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
