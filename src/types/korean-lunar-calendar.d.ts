declare module "korean-lunar-calendar" {
  export type SolarCalendar = {
    year: number;
    month: number;
    day: number;
  };

  export type LunarCalendar = {
    year: number;
    month: number;
    day: number;
    intercalation: boolean;
  };

  export default class KoreanLunarCalendar {
    setSolarDate(year: number, month: number, day: number): boolean;
    setLunarDate(
      year: number,
      month: number,
      day: number,
      intercalation: boolean,
    ): boolean;
    getSolarCalendar(): SolarCalendar;
    getLunarCalendar(): LunarCalendar;
  }
}
