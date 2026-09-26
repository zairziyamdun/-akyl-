"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { getPostLoginPath } from "@/entities/session";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useToast } from "@/shared/ui/toast";
import { AuthCard } from "@/widgets/dashboard-shell";
import { AuthApiError, useAuth } from "../api/AuthProvider";
import {
  getPasswordRuleResults,
  getPasswordStrengthError,
  isPasswordStrong,
} from "../lib/passwordStrength";

type FormState = "idle" | "loading" | "success" | "error";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const { success: toastSuccess, error: toastError } = useToast();
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthCard
      title="Вход в AKYL"
      description="Войдите, чтобы открыть материалы и кабинет AKYL"
      footer={
        <p className="text-center text-sm text-slate-500">
          Нет аккаунта?{" "}
          <Link
            href="/register"
            className="font-medium text-sky-700 hover:underline"
          >
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
            const { role } = await login({
              email,
              password,
            });
            const returnUrl =
              searchParams.get("returnUrl") ?? searchParams.get("next");
            toastSuccess("Вход выполнен");
            router.push(returnUrl ?? getPostLoginPath(role));
          } catch (err) {
            setState("error");
            const message =
              err instanceof AuthApiError
                ? err.message
                : "Не удалось войти. Проверьте email и пароль.";
            setError(message);
            toastError(message);
          }
        }}
      >
        <div>
          <label
            htmlFor="login-email"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <Input
            id="login-email"
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
            <label
              htmlFor="login-password"
              className="text-sm font-medium text-slate-700"
            >
              Пароль
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-sky-700 hover:underline"
            >
              Забыли пароль?
            </Link>
          </div>
          <Input
            id="login-password"
            type="password"
            placeholder="••••••••"
            required
            disabled={state === "loading"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {state === "error" && error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
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
  const router = useRouter();
  const { register } = useAuth();
  const { success: toastSuccess, error: toastError } = useToast();
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const passwordRules = useMemo(
    () => getPasswordRuleResults(password),
    [password],
  );

  return (
    <AuthCard
      title="Регистрация"
      description="Создайте аккаунт для доступа к материалам AKYL"
      footer={
        <p className="text-center text-sm text-slate-500">
          Уже есть аккаунт?{" "}
          <Link
            href="/login"
            className="font-medium text-sky-700 hover:underline"
          >
            Войти
          </Link>
        </p>
      }
    >
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");

          if (password !== passwordConfirm) {
            const message = "Пароли не совпадают";
            setState("error");
            setError(message);
            toastError(message);
            return;
          }

          if (!isPasswordStrong(password)) {
            const message =
              getPasswordStrengthError(password) ??
              "Пароль не соответствует требованиям";
            setState("error");
            setError(message);
            toastError(message);
            return;
          }

          setState("loading");
          try {
            await register({
              email,
              password,
              full_name: fullName,
              phone: phone.trim() || undefined,
            });
            setState("success");
            toastSuccess("Аккаунт создан. Войдите, чтобы получить доступ.");
            // Do not auto-login — user must sign in explicitly.
            setTimeout(() => router.push("/login"), 1500);
          } catch (err) {
            setState("error");
            const message =
              err instanceof AuthApiError
                ? err.message
                : "Не удалось создать аккаунт";
            setError(message);
            toastError(message);
          }
        }}
      >
        <div>
          <label
            htmlFor="register-full-name"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Имя
          </label>
          <Input
            id="register-full-name"
            placeholder="Иван Иванов"
            required
            disabled={state === "loading" || state === "success"}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="register-email"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <Input
            id="register-email"
            type="email"
            placeholder="you@example.kz"
            required
            disabled={state === "loading" || state === "success"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="register-phone"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Телефон (необязательно)
          </label>
          <Input
            id="register-phone"
            type="tel"
            placeholder="+7 777 000 0000"
            disabled={state === "loading" || state === "success"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="register-password"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Пароль
          </label>
          <Input
            id="register-password"
            type="password"
            placeholder="мин. 8 символов"
            required
            minLength={8}
            autoComplete="new-password"
            disabled={state === "loading" || state === "success"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ul className="mt-2 space-y-1">
            {passwordRules.map((rule) => (
              <li
                key={rule.id}
                className={cn(
                  "flex items-center gap-2 text-xs",
                  rule.passed ? "text-emerald-700" : "text-slate-400",
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold",
                    rule.passed
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-400",
                  )}
                  aria-hidden
                >
                  {rule.passed ? "✓" : "·"}
                </span>
                {rule.label}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label
            htmlFor="register-password-confirm"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Подтверждение пароля
          </label>
          <Input
            id="register-password-confirm"
            type="password"
            placeholder="повторите пароль"
            required
            minLength={8}
            autoComplete="new-password"
            disabled={state === "loading" || state === "success"}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        {state === "error" && error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        {state === "success" ? (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Аккаунт создан. Войдите, чтобы получить доступ.
          </p>
        ) : null}

        <Button
          type="submit"
          className="w-full"
          disabled={state === "loading" || state === "success"}
        >
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
          <Link
            href="/login"
            className="font-medium text-sky-700 hover:underline"
          >
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
          <label
            htmlFor="forgot-email"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <Input
            id="forgot-email"
            type="email"
            placeholder="you@example.kz"
            required
            disabled={state === "loading"}
          />
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
            Единая экосистема для акимата, управляющих компаний, ОСИ и
            экспертов.
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
