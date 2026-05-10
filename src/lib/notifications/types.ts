import type { DateOnly } from "../date";

export type NotificationChannel = "kakao" | "telegram" | "google_calendar";

export type NotificationMessage = {
  anniversaryName: string;
  occurrenceDate: DateOnly;
  dday: number;
  channel: NotificationChannel;
};

export const defaultNotificationDays = [7, 3, 0] as const;
export const defaultNotificationTime = "09:00";
