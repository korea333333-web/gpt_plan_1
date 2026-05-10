import { formatDateOnly } from "../date";
import type { NotificationMessage } from "./types";

export function buildGoogleCalendarEvent(message: NotificationMessage) {
  const date = formatDateOnly(message.occurrenceDate);

  return {
    summary: message.anniversaryName,
    start: { date },
    end: { date },
    reminders: {
      useDefault: false,
      overrides: [{ method: "popup", minutes: 9 * 60 }],
    },
  };
}
