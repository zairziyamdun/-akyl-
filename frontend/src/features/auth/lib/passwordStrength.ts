export type PasswordRuleId =
  | "minLength"
  | "uppercase"
  | "lowercase"
  | "digit"
  | "symbol";

export type PasswordRule = {
  id: PasswordRuleId;
  label: string;
  test: (password: string) => boolean;
};

/** Shared password policy for registration (UI checklist + submit guard). */
export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: "minLength",
    label: "Не менее 8 символов",
    test: (password) => password.length >= 8,
  },
  {
    id: "uppercase",
    label: "Заглавная буква (A–Z)",
    test: (password) => /[A-ZА-ЯЁ]/.test(password),
  },
  {
    id: "lowercase",
    label: "Строчная буква (a–z)",
    test: (password) => /[a-zа-яё]/.test(password),
  },
  {
    id: "digit",
    label: "Цифра (0–9)",
    test: (password) => /\d/.test(password),
  },
  {
    id: "symbol",
    label: "Спецсимвол (!@#$%…)",
    test: (password) => /[^A-Za-zА-Яа-яЁё0-9\s]/.test(password),
  },
];

export function getPasswordRuleResults(password: string) {
  return PASSWORD_RULES.map((rule) => ({
    ...rule,
    passed: rule.test(password),
  }));
}

export function isPasswordStrong(password: string): boolean {
  return PASSWORD_RULES.every((rule) => rule.test(password));
}

export function getPasswordStrengthError(password: string): string | null {
  const failed = PASSWORD_RULES.filter((rule) => !rule.test(password));
  if (failed.length === 0) return null;
  return `Пароль слишком слабый: ${failed.map((r) => r.label.toLowerCase()).join(", ")}`;
}
