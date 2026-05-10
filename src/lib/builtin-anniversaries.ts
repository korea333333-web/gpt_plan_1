import type { AnniversaryInput } from "./anniversary";

export type BuiltinAnniversary = AnniversaryInput & {
  key: string;
  enabledByDefault: boolean;
};

export const builtinAnniversaries: BuiltinAnniversary[] = [
  {
    key: "seollal",
    name: "설날",
    dateType: "lunar",
    month: 1,
    day: 1,
    repeatType: "yearly",
    category: "holiday",
    enabledByDefault: true,
  },
  {
    key: "daeboreum",
    name: "정월대보름",
    dateType: "lunar",
    month: 1,
    day: 15,
    repeatType: "yearly",
    category: "holiday",
    enabledByDefault: false,
  },
  {
    key: "buddhas_birthday",
    name: "석가탄신일",
    dateType: "lunar",
    month: 4,
    day: 8,
    repeatType: "yearly",
    category: "holiday",
    enabledByDefault: true,
  },
  {
    key: "dano",
    name: "단오",
    dateType: "lunar",
    month: 5,
    day: 5,
    repeatType: "yearly",
    category: "holiday",
    enabledByDefault: false,
  },
  {
    key: "chuseok",
    name: "추석",
    dateType: "lunar",
    month: 8,
    day: 15,
    repeatType: "yearly",
    category: "holiday",
    enabledByDefault: true,
  },
];
