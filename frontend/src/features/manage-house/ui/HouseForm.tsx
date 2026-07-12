"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  createHouse,
  deleteHouse,
  fetchHouse,
  HousesApiError,
  updateHouse,
} from "@/entities/house";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { PageHeader } from "@/widgets/dashboard-shell";

type HouseFormProps = {
  mode: "create" | "edit";
  houseId?: string;
};

function parseOptionalInt(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number.parseInt(trimmed, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseOptionalNumber(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export function HouseForm({ mode, houseId }: HouseFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [apartmentsCount, setApartmentsCount] = useState("");
  const [totalArea, setTotalArea] = useState("");
  const [buildYear, setBuildYear] = useState("");
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode !== "edit" || !houseId) return;

    let cancelled = false;
    void (async () => {
      setLoading(true);
      setError("");
      try {
        const house = await fetchHouse(houseId);
        if (cancelled) return;
        setName(house.name);
        setAddress(house.address ?? "");
        setApartmentsCount(
          house.apartments_count !== null ? String(house.apartments_count) : "",
        );
        setTotalArea(house.total_area !== null ? String(house.total_area) : "");
        setBuildYear(house.build_year !== null ? String(house.build_year) : "");
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof HousesApiError
              ? err.message
              : "Не удалось загрузить ЖК",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mode, houseId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: name.trim(),
      address: address.trim() || null,
      apartments_count: parseOptionalInt(apartmentsCount),
      total_area: parseOptionalNumber(totalArea),
      build_year: parseOptionalInt(buildYear),
    };

    try {
      if (mode === "create") {
        const house = await createHouse(payload);
        router.push(`/admin/houses/${house.id}`);
      } else if (houseId) {
        await updateHouse(houseId, payload);
        router.refresh();
      }
    } catch (err) {
      setError(
        err instanceof HousesApiError ? err.message : "Не удалось сохранить",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!houseId || !window.confirm("Удалить этот ЖК?")) return;
    setSaving(true);
    setError("");
    try {
      await deleteHouse(houseId);
      router.push("/admin/houses");
    } catch (err) {
      setError(
        err instanceof HousesApiError ? err.message : "Не удалось удалить",
      );
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-sky-600" />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title={mode === "create" ? "Новый ЖК" : "Редактирование ЖК"}
        actions={
          <div className="flex flex-wrap gap-2">
            {mode === "edit" && houseId ? (
              <Button asChild variant="secondary" size="sm">
                <Link href={`/admin/houses/${houseId}/finance`}>Финансы</Link>
              </Button>
            ) : null}
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/houses">← К списку</Link>
            </Button>
          </div>
        }
      />

      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Название *
          </label>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Адрес
          </label>
          <Input
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Количество квартир
          </label>
          <Input
            type="number"
            min={0}
            value={apartmentsCount}
            onChange={(event) => setApartmentsCount(event.target.value)}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Общая площадь, м²
          </label>
          <Input
            type="number"
            min={0}
            step="0.01"
            value={totalArea}
            onChange={(event) => setTotalArea(event.target.value)}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Год постройки
          </label>
          <Input
            type="number"
            min={1800}
            max={2100}
            value={buildYear}
            onChange={(event) => setBuildYear(event.target.value)}
          />
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="submit" disabled={saving}>
            {saving ? "Сохранение…" : "Сохранить"}
          </Button>
          {mode === "edit" ? (
            <Button
              type="button"
              variant="secondary"
              disabled={saving}
              onClick={() => void handleDelete()}
            >
              Удалить
            </Button>
          ) : null}
        </div>
      </form>
    </>
  );
}
