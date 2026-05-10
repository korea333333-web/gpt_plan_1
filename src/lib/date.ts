export type DateOnly = {
  year: number;
  month: number;
  day: number;
};

export function toDateOnly(date: Date): DateOnly {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

export function dateOnlyToUtcDate(date: DateOnly): Date {
  return new Date(Date.UTC(date.year, date.month - 1, date.day));
}

export function formatDateOnly(date: DateOnly): string {
  const month = `${date.month}`.padStart(2, "0");
  const day = `${date.day}`.padStart(2, "0");
  return `${date.year}-${month}-${day}`;
}

export function compareDateOnly(a: DateOnly, b: DateOnly): number {
  return dateOnlyToUtcDate(a).getTime() - dateOnlyToUtcDate(b).getTime();
}

export function addDays(date: DateOnly, days: number): DateOnly {
  const next = dateOnlyToUtcDate(date);
  next.setUTCDate(next.getUTCDate() + days);
  return toDateOnly(next);
}

export function daysBetween(from: DateOnly, to: DateOnly): number {
  const diff = dateOnlyToUtcDate(to).getTime() - dateOnlyToUtcDate(from).getTime();
  return Math.round(diff / 86_400_000);
}

export function isValidDateOnly(date: DateOnly): boolean {
  const candidate = dateOnlyToUtcDate(date);
  return (
    candidate.getUTCFullYear() === date.year &&
    candidate.getUTCMonth() + 1 === date.month &&
    candidate.getUTCDate() === date.day
  );
}
