"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  HousesApiError,
  createHouse,
  deleteHouse,
  fetchHouse,
  updateHouse,
} from "@/lib/houses/housesApi";

type HouseFormProps = {
  mode: "create" | "edit";
  houseId?: string;
};

export function HouseForm({ mode, houseId }: HouseFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
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
        setCity(house.city ?? "");
        setAddress(house.address ?? "");
        setDescription(house.description ?? "");
        setStatus(house.status ?? "active");
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof HousesApiError ? err.message : "Не удалось загрузить ЖК");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mode, houseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: name.trim(),
      city: city.trim() || null,
      address: address.trim() || null,
      description: description.trim() || null,
      status: status.trim() || null,
    };

    try {
      if (mode === "create") {
        const house = await createHouse(payload);
        router.push(`/admin/houses/${house.id}`);
      } else if (houseId) {
        await updateHouse(houseId, payload);
        router.push("/admin/houses");
      }
    } catch (err) {
      setError(err instanceof HousesApiError ? err.message : "Не удалось сохранить");
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
      setError(err instanceof HousesApiError ? err.message : "Не удалось удалить");
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
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/houses">← К списку</Link>
          </Button>
        }
      />

      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Название *</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Город</label>
          <Input value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Адрес</label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Описание</label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Статус</label>
          <Input value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="submit" disabled={saving}>
            {saving ? "Сохранение…" : "Сохранить"}
          </Button>
          {mode === "edit" ? (
            <Button type="button" variant="secondary" disabled={saving} onClick={() => void handleDelete()}>
              Удалить
            </Button>
          ) : null}
        </div>
      </form>
    </>
  );
}
