import { PageHeader } from "@/widgets/dashboard-shell";
import { StatusBadge } from "@/widgets/dashboard-shell";
import { Button } from "@/shared/ui/Button";
import { mockSubscriptions } from "@/widgets/dashboard-shell";

export default function UserSubscriptionPage() {
  return (
    <>
      <PageHeader
        title="Подписка"
        description="Управление доступом к журналу и библиотеке Pro"
      />

      <div className="grid max-w-3xl gap-4">
        {mockSubscriptions.map((sub) => (
          <div
            key={sub.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
                  {sub.name}
                </h3>
                <StatusBadge
                  status={sub.status === "active" ? "active" : "none"}
                />
              </div>
              <p className="text-sm text-slate-500">{sub.description}</p>
              {sub.expires ? (
                <p className="mt-2 text-xs text-slate-400">
                  Действует до {sub.expires}
                </p>
              ) : null}
            </div>
            <Button variant={sub.status === "active" ? "secondary" : "primary"}>
              {sub.status === "active" ? "Управлять" : "Оформить"}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
