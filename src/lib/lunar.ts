import KoreanLunarCalendar from "korean-lunar-calendar";
import type { DateOnly } from "./date";

export type LunarDate = DateOnly & {
  isLeapMonth: boolean;
};

export function lunarToSolar(
  year: number,
  month: number,
  day: number,
  isLeapMonth = false,
): DateOnly {
  const calendar = new KoreanLunarCalendar();
  const ok = calendar.setLunarDate(year, month, day, isLeapMonth);

  if (!ok) {
    throw new RangeError(`Invalid lunar date: ${year}-${month}-${day}`);
  }

  return calendar.getSolarCalendar();
}

export function solarToLunar(year: number, month: number, day: number): LunarDate {
  const calendar = new KoreanLunarCalendar();
  const ok = calendar.setSolarDate(year, month, day);

  if (!ok) {
    throw new RangeError(`Invalid solar date: ${year}-${month}-${day}`);
  }

  const lunar = calendar.getLunarCalendar();

  return {
    year: lunar.year,
    month: lunar.month,
    day: lunar.day,
    isLeapMonth: lunar.intercalation,
  };
}

export function formatLunarDate(date: LunarDate): string {
  const leap = date.isLeapMonth ? "윤" : "";
  return `${date.year}년 ${leap}${date.month}월 ${date.day}일`;
}
