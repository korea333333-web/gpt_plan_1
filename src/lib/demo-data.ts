import { getMilestone, getNextOccurrence, type AnniversaryInput } from "./anniversary";
import { formatDateOnly, type DateOnly } from "./date";
import { builtinAnniversaries } from "./builtin-anniversaries";

export const today: DateOnly = {
  year: 2026,
  month: 5,
  day: 10,
};

export const demoAnniversaries: AnniversaryInput[] = [
  {
    id: "mother-birthday",
    name: "어머니 생신",
    dateType: "lunar",
    month: 3,
    day: 27,
    repeatType: "yearly",
    category: "birthday",
    startYear: 1957,
    milestoneMode: "korean_age",
  },
  {
    id: "wedding",
    name: "결혼기념일",
    dateType: "solar",
    month: 5,
    day: 30,
    repeatType: "yearly",
    category: "anniversary",
    startYear: 2016,
    milestoneMode: "anniversary_years",
  },
  ...builtinAnniversaries.filter((item) => item.enabledByDefault),
];

export const upcomingAnniversaries = demoAnniversaries
  .map((anniversary) => {
    const occurrence = getNextOccurrence(anniversary, today);
    return {
      ...occurrence,
      dateLabel: formatDateOnly(occurrence.date),
      milestone: getMilestone(
        anniversary.startYear,
        occurrence.date.year,
        anniversary.milestoneMode ?? "anniversary_years",
      ),
    };
  })
  .sort((a, b) => a.dday - b.dday);
