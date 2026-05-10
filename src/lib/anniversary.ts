import { compareDateOnly, daysBetween, type DateOnly } from "./date";
import { lunarToSolar } from "./lunar";

export type DateType = "lunar" | "solar";
export type RepeatType = "yearly" | "monthly" | "once";
export type Category = "birthday" | "memorial" | "anniversary" | "holiday" | "other";
export type MilestoneMode = "korean_age" | "international_age" | "anniversary_years";

export type AnniversaryInput = {
  id?: string;
  name: string;
  dateType: DateType;
  month: number;
  day: number;
  isLeapMonth?: boolean;
  repeatType: RepeatType;
  category: Category;
  startYear?: number | null;
  milestoneMode?: MilestoneMode | null;
};

export type Occurrence = {
  anniversary: AnniversaryInput;
  date: DateOnly;
  dday: number;
  convertedFromLunar: boolean;
};

export function getOccurrenceForYear(
  anniversary: AnniversaryInput,
  year: number,
): DateOnly {
  if (anniversary.dateType === "lunar") {
    return lunarToSolar(
      year,
      anniversary.month,
      anniversary.day,
      anniversary.isLeapMonth ?? false,
    );
  }

  return {
    year,
    month: anniversary.month,
    day: anniversary.day,
  };
}

export function getNextOccurrence(
  anniversary: AnniversaryInput,
  fromDate: DateOnly,
): Occurrence {
  if (anniversary.repeatType === "monthly") {
    return getNextMonthlyOccurrence(anniversary, fromDate);
  }

  const year = anniversary.repeatType === "once" && anniversary.startYear
    ? anniversary.startYear
    : fromDate.year;
  const thisOccurrence = getOccurrenceForYear(anniversary, year);

  if (
    anniversary.repeatType === "once" ||
    compareDateOnly(thisOccurrence, fromDate) >= 0
  ) {
    return {
      anniversary,
      date: thisOccurrence,
      dday: getDday(thisOccurrence, fromDate),
      convertedFromLunar: anniversary.dateType === "lunar",
    };
  }

  const nextOccurrence = getOccurrenceForYear(anniversary, fromDate.year + 1);
  return {
    anniversary,
    date: nextOccurrence,
    dday: getDday(nextOccurrence, fromDate),
    convertedFromLunar: anniversary.dateType === "lunar",
  };
}

export function getDday(targetDate: DateOnly, fromDate: DateOnly): number {
  return daysBetween(fromDate, targetDate);
}

export function getMilestone(
  startYear: number | null | undefined,
  targetYear: number,
  mode: MilestoneMode = "anniversary_years",
): string | null {
  if (!startYear) {
    return null;
  }

  if (mode === "korean_age") {
    const age = targetYear - startYear + 1;
    return `${age}세${getKoreanAgeName(age) ? ` (${getKoreanAgeName(age)})` : ""}`;
  }

  const years = Math.max(0, targetYear - startYear);

  if (mode === "international_age") {
    return `${years}세`;
  }

  return `${years}주년`;
}

function getNextMonthlyOccurrence(
  anniversary: AnniversaryInput,
  fromDate: DateOnly,
): Occurrence {
  const current = {
    year: fromDate.year,
    month: fromDate.month,
    day: anniversary.day,
  };

  const thisMonth =
    compareDateOnly(current, fromDate) >= 0
      ? current
      : normalizeMonth(fromDate.year, fromDate.month + 1, anniversary.day);

  return {
    anniversary,
    date: thisMonth,
    dday: getDday(thisMonth, fromDate),
    convertedFromLunar: false,
  };
}

function normalizeMonth(year: number, month: number, day: number): DateOnly {
  const normalized = new Date(Date.UTC(year, month - 1, day));
  return {
    year: normalized.getUTCFullYear(),
    month: normalized.getUTCMonth() + 1,
    day: normalized.getUTCDate(),
  };
}

function getKoreanAgeName(age: number): string | null {
  const names: Record<number, string> = {
    60: "육순",
    61: "환갑",
    70: "칠순",
    80: "팔순",
    90: "구순",
    100: "백수",
  };

  return names[age] ?? null;
}
