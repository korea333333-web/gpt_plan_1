import { describe, expect, it } from "vitest";
import { getDday, getMilestone, getNextOccurrence, type AnniversaryInput } from "./anniversary";

describe("anniversary calculations", () => {
  it("uses this year when the solar anniversary is still ahead", () => {
    const anniversary: AnniversaryInput = {
      name: "결혼기념일",
      dateType: "solar",
      month: 5,
      day: 30,
      repeatType: "yearly",
      category: "anniversary",
    };

    expect(getNextOccurrence(anniversary, { year: 2026, month: 5, day: 10 })).toMatchObject({
      date: { year: 2026, month: 5, day: 30 },
      dday: 20,
    });
  });

  it("rolls over to next year when the anniversary already passed", () => {
    const anniversary: AnniversaryInput = {
      name: "생일",
      dateType: "solar",
      month: 1,
      day: 2,
      repeatType: "yearly",
      category: "birthday",
    };

    expect(getNextOccurrence(anniversary, { year: 2026, month: 5, day: 10 })).toMatchObject({
      date: { year: 2027, month: 1, day: 2 },
    });
  });

  it("converts lunar anniversaries before calculating D-Day", () => {
    const anniversary: AnniversaryInput = {
      name: "설날",
      dateType: "lunar",
      month: 1,
      day: 1,
      repeatType: "yearly",
      category: "holiday",
    };

    expect(getNextOccurrence(anniversary, { year: 2026, month: 2, day: 1 })).toMatchObject({
      date: { year: 2026, month: 2, day: 17 },
      dday: 16,
      convertedFromLunar: true,
    });
  });

  it("calculates D-Day by date-only values", () => {
    expect(
      getDday({ year: 2026, month: 5, day: 22 }, { year: 2026, month: 5, day: 10 }),
    ).toBe(12);
  });

  it("calculates Korean age and anniversary years", () => {
    expect(getMilestone(1957, 2026, "korean_age")).toBe("70세 (칠순)");
    expect(getMilestone(2016, 2026, "anniversary_years")).toBe("10주년");
    expect(getMilestone(1957, 2026, "international_age")).toBe("69세");
  });
});
