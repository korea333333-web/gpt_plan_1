import { describe, expect, it } from "vitest";
import { lunarToSolar, solarToLunar } from "./lunar";

describe("lunar conversion", () => {
  it("converts 2026 Seollal from lunar to solar", () => {
    expect(lunarToSolar(2026, 1, 1)).toEqual({
      year: 2026,
      month: 2,
      day: 17,
    });
  });

  it("converts 2026 Chuseok from lunar to solar", () => {
    expect(lunarToSolar(2026, 8, 15)).toEqual({
      year: 2026,
      month: 9,
      day: 25,
    });
  });

  it("converts solar dates back to lunar dates", () => {
    expect(solarToLunar(2026, 2, 17)).toEqual({
      year: 2026,
      month: 1,
      day: 1,
      isLeapMonth: false,
    });
  });

  it("keeps leap month separate from regular lunar month", () => {
    const regular = lunarToSolar(2025, 6, 1, false);
    const leap = lunarToSolar(2025, 6, 1, true);

    expect(regular).not.toEqual(leap);
  });
});
