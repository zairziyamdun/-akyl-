import { env } from "../config/env.js";
import { logError } from "../common/logger.js";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    console.warn("Telegram env is not configured");
    return;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram API error (${response.status}): ${body}`);
  }
}

export function buildConsultationTelegramMessage(input: {
  name: string;
  phone?: string;
  email?: string;
  organization?: string;
  role?: string;
  message: string;
}): string {
  const line = (label: string, value?: string | null) =>
    `${label}: ${escapeHtml(value?.trim() || "—")}`;

  return [
    "<b>Новая заявка AKYL</b>",
    "",
    line("Имя", input.name),
    line("Телефон", input.phone),
    line("Email", input.email),
    line("Организация", input.organization),
    line("Роль", input.role),
    line("Сообщение", input.message),
    "",
    "Источник: consultation",
  ].join("\n");
}

export async function notifyConsultationRequest(input: {
  name: string;
  phone?: string;
  email?: string;
  organization?: string;
  role?: string;
  message: string;
}): Promise<void> {
  try {
    await sendTelegramMessage(buildConsultationTelegramMessage(input));
  } catch (error) {
    logError(error, {
      module: "telegram",
      path: "consultation",
    });
  }
}
