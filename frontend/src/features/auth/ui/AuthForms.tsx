"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import { AuthCard } from "@/widgets/dashboard-shell";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { AuthApiError, useAuth } from "../api/AuthProvider";
import { getRoleDashboardPath } from "@/entities/session";
import { cn } from "@/shared/lib";

type FormState = "idle" | "loading" | "success" | "error";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        onSubmit={async (e) => {
          e.preventDefault();
          setState("loading");
          setError("");
          try {
            const role = await login({ email, password });
            const returnUrl =
              searchParams.get("returnUrl") ?? searchParams.get("next");
            router.push(returnUrl ?? getRoleDashboardPath(role));
          } catch (err) {
            setState("error");
            setError(
              err instanceof AuthApiError
                ? err.message
                : "Не удалось войти. Проверьте email и пароль.",
            );
          }
        }}
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
          <Input
            type="email"
            placeholder="you@example.kz"
            required
            disabled={state === "loading"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Пароль</label>
            <Link href="/forgot-password" className="text-xs text-sky-700 hover:underline">
              Забыли пароль?
            </Link>
          </div>
          <Input
            type="password"
            placeholder="••••••••"
            required
            disabled={state === "loading"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {state === "error" && error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        ) : null}

        <Button type="submit" className="w-full" disabled={state === "loading"}>
          {state === "loading" ? "Вход…" : "Войти"}
        </Button>
      </form>
    </AuthCard>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

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
        onSubmit={async (e) => {
          e.preventDefault();
          setState("loading");
          setError("");
          try {
            await register({
              email,
              password,
              full_name: fullName,
              organization,
              phone,
            });
            setState("success");
            setTimeout(() => router.push("/login"), 1500);
          } catch (err) {
            setState("error");
            setError(
              err instanceof AuthApiError
                ? err.message
                : "Не удалось создать аккаунт",
            );
          }
        }}
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Имя</label>
          <Input
            placeholder="Иван Иванов"
            required
            disabled={state === "loading"}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
          <Input
            type="email"
            placeholder="you@example.kz"
            required
            disabled={state === "loading"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Организация</label>
          <Input
            placeholder="ОСИ / УК / Акимат"
            required
            disabled={state === "loading"}
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Телефон</label>
          <Input
            type="tel"
            placeholder="+7 777 000 0000"
            required
            disabled={state === "loading"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Пароль</label>
          <Input
            type="password"
            placeholder="мин. 8 символов"
            required
            minLength={8}
            disabled={state === "loading"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {state === "error" && error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        ) : null}

        {state === "success" ? (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Аккаунт создан. Перенаправление на вход…
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={state === "loading" || state === "success"}>
          {state === "loading" ? "Создание…" : "Создать аккаунт"}
        </Button>
      </form>
    </AuthCard>
  );
}

export function ForgotPasswordForm() {
  // TODO: implement forgot-password via Supabase resetPasswordForEmail + backend endpoint
  const [state, setState] = useState<FormState>("idle");

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
          setState("loading");
          setTimeout(() => setState("success"), 900);
        }}
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
          <Input type="email" placeholder="you@example.kz" required disabled={state === "loading"} />
        </div>

        {state === "success" ? (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {/* TODO: connect to POST /api/auth/forgot-password when implemented */}
            Функция восстановления пароля будет подключена позже.
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
