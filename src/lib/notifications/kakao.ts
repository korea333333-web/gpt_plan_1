import type { NotificationMessage } from "./types";

export function buildKakaoMessage(message: NotificationMessage): string {
  const label = message.dday === 0 ? "오늘" : `${message.dday}일 전`;
  return `[달새김] ${message.anniversaryName}이 ${label}입니다.`;
}
