import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { getRoleDashboardPath } from "@/lib/auth/mockAuth";
import type { AkylRole } from "@/lib/auth/mockAuth";

export function AccessDenied({ role }: { role?: AkylRole }) {
  const home = role ? getRoleDashboardPath(role) : "/";

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 text-6xl font-light text-slate-300">403</div>
      <h1 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-900">
        У вас нет доступа к этому разделу
      </h1>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        Эта страница доступна только пользователям с соответствующей ролью.
        Обратитесь к администратору, если вам нужен доступ.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild variant="secondary">
          <Link href="/">На главную</Link>
        </Button>
        {role ? (
          <Button asChild>
            <Link href={home}>В кабинет</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
