"use client";

import { useEffect, useState } from "react";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";

export default function StudioArticleNewPage() {
  const [autosave, setAutosave] = useState<"idle" | "saving" | "saved">("idle");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!title.trim()) {
      setAutosave("idle");
      return;
    }

    setAutosave("saving");
    const t = setTimeout(() => setAutosave("saved"), 800);
    return () => clearTimeout(t);
  }, [title]);

  return (
    <>
      <PageHeader
        title="Новая статья"
        description="Создание материала для журнала AKYL"
        actions={
          <span
            className={cn(
              "text-xs font-medium",
              autosave === "saved" && "text-emerald-600",
              autosave === "saving" && "text-amber-600",
              autosave === "idle" && "text-slate-400",
            )}
          >
            {autosave === "saved"
              ? "✓ Черновик сохранён"
              : autosave === "saving"
                ? "Сохранение…"
                : "Autosave"}
          </span>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Заголовок
            </label>
            <Input
              placeholder="Заголовок статьи"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Содержание
            </label>
            <textarea
              className="min-h-[320px] w-full rounded-xl bg-white px-4 py-3 text-sm text-slate-900 ring-1 ring-black/10 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-400"
              placeholder="Текст статьи — здесь будет rich-text editor после подключения CMS…"
            />
          </div>

          <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
            <Button variant="secondary" onClick={() => alert("Mock: черновик сохранён")}>
              Save draft
            </Button>
            <Button variant="ghost" onClick={() => alert("Mock: preview")}>
              Preview
            </Button>
            <Button onClick={() => alert("Mock: отправлено на review")}>
              Submit for review
            </Button>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Метаданные</h3>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-slate-500">Категория</label>
                <select className="h-10 w-full rounded-xl bg-white px-3 text-sm ring-1 ring-black/10">
                  <option>Управление МЖД</option>
                  <option>Финансы</option>
                  <option>KPI</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-500">Выпуск</label>
                <select className="h-10 w-full rounded-xl bg-white px-3 text-sm ring-1 ring-black/10">
                  <option>04 — Стандарты</option>
                  <option>03 — Финансы</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-500">Теги</label>
                <Input placeholder="KPI, ОСИ, финансы" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
