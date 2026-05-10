import type { NotificationMessage } from "./types";

export function buildTelegramMessage(message: NotificationMessage): string {
  const label = message.dday === 0 ? "오늘" : `D-${message.dday}`;
  return `달새김 알림\n${message.anniversaryName}\n${label}`;
}
