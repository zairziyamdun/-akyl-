"use client";

import { useState } from "react";
import Link from "next/link";

import { AuthCard } from "@/components/dashboard/AuthCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";

type FormState = "idle" | "loading" | "success" | "error";

function useMockSubmit() {
  const [state, setState] = useState<FormState>("idle");

  const submit = async (shouldFail = false) => {
    setState("loading");
    await new Promise((r) => setTimeout(r, 900));
    setState(shouldFail ? "error" : "success");
  };

  return { state, submit, reset: () => setState("idle") };
}

export function LoginForm() {
  const { state, submit } = useMockSubmit();

  return (
    <AuthCard
      title="Вход в AKYL"
      description="Профессиональная платформа управления МЖД"
      footer={
        <p className="text-center text-sm text-slate-500">
          Нет аккаунта?{" "}
          <Link href="/register" className="font-medium text-sky-700 hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
          <Input type="email" placeholder="you@example.kz" required disabled={state === "loading"} />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Пароль</label>
            <Link href="/forgot-password" className="text-xs text-sky-700 hover:underline">
              Забыли пароль?
            </Link>
          </div>
          <Input type="password" placeholder="••••••••" required disabled={state === "loading"} />
        </div>

        {state === "error" ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            Неверный email или пароль (mock)
          </p>
        ) : null}

        {state === "success" ? (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Вход выполнен. Подключите Supabase Auth для редиректа в кабинет.
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={state === "loading"}>
          {state === "loading" ? "Вход…" : "Войти"}
        </Button>
      </form>
    </AuthCard>
  );
}

export function RegisterForm() {
  const { state, submit } = useMockSubmit();

  return (
    <AuthCard
      title="Регистрация"
      description="Создайте аккаунт для доступа к материалам AKYL"
      footer={
        <p className="text-center text-sm text-slate-500">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="font-medium text-sky-700 hover:underline">
            Войти
          </Link>
        </p>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Имя</label>
          <Input placeholder="Иван Иванов" required disabled={state === "loading"} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
          <Input type="email" placeholder="you@example.kz" required disabled={state === "loading"} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Организация</label>
          <Input placeholder="ОСИ / УК / Акимат" required disabled={state === "loading"} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Пароль</label>
          <Input type="password" placeholder="мин. 8 символов" required disabled={state === "loading"} />
        </div>

        {state === "success" ? (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Аккаунт создан (mock). Подтвердите email после подключения Supabase.
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={state === "loading"}>
          {state === "loading" ? "Создание…" : "Создать аккаунт"}
        </Button>
      </form>
    </AuthCard>
  );
}

export function ForgotPasswordForm() {
  const { state, submit } = useMockSubmit();

  return (
    <AuthCard
      title="Восстановление пароля"
      description="Мы отправим ссылку для сброса пароля на ваш email"
      footer={
        <p className="text-center text-sm text-slate-500">
          <Link href="/login" className="font-medium text-sky-700 hover:underline">
            ← Вернуться ко входу
          </Link>
        </p>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
          <Input type="email" placeholder="you@example.kz" required disabled={state === "loading"} />
        </div>

        {state === "success" ? (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Письмо отправлено (mock). Проверьте почту.
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={state === "loading"}>
          {state === "loading" ? "Отправка…" : "Отправить ссылку"}
        </Button>
      </form>
    </AuthCard>
  );
}

export function AuthLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-slate-900 p-12 text-white lg:flex">
        <div>
          <p className="text-sm font-medium text-sky-300">AKYL Platform</p>
          <h2 className="mt-6 max-w-md font-[family-name:var(--font-sora)] text-4xl font-semibold leading-tight">
            Управление многоквартирными домами — профессионально
          </h2>
          <p className="mt-4 max-w-sm text-sm text-slate-400">
            Единая экосистема для акимата, управляющих компаний, ОСИ и экспертов.
          </p>
        </div>
        <ul className="space-y-3 text-sm text-slate-400">
          <li className="flex items-center gap-2">
            <span className="text-sky-400">✓</span> Методология и KPI
          </li>
          <li className="flex items-center gap-2">
            <span className="text-sky-400">✓</span> Журнал и библиотека
          </li>
          <li className="flex items-center gap-2">
            <span className="text-sky-400">✓</span> Личные кабинеты по ролям
          </li>
        </ul>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col items-center justify-center bg-slate-50 px-4 py-12",
        )}
      >
        <Link href="/" className="mb-8 lg:hidden">
          <span className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-900">
            AKYL
          </span>
        </Link>
        {children}
      </div>
    </div>
  );
}
