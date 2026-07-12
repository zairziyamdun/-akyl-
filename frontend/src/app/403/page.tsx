import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import { AccessDenied } from "@/widgets/dashboard-shell";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <AccessDenied />
      <div className="mt-6">
        <Button asChild variant="secondary">
          <Link href="/">На главную</Link>
        </Button>
      </div>
    </div>
  );
}
