import { CalendarHeart, Moon, Sun } from "lucide-react";
import type { Occurrence } from "@/lib/anniversary";

type AnniversaryCardProps = Occurrence & {
  dateLabel: string;
  milestone?: string | null;
};

const categoryLabels = {
  birthday: "생신",
  memorial: "제사",
  anniversary: "기념일",
  holiday: "명절",
  other: "기타",
};

export function AnniversaryCard({
  anniversary,
  date,
  dateLabel,
  dday,
  milestone,
}: AnniversaryCardProps) {
  const isLunar = anniversary.dateType === "lunar";
  const Icon = isLunar ? Moon : Sun;

  return (
    <article className="group relative overflow-hidden rounded-soft border border-[var(--border-subtle)] bg-card p-4 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-200 hover:border-[rgba(201,169,110,0.28)] hover:bg-[var(--bg-card-hover)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_44%,rgba(201,169,110,0.04))] opacity-70" />
      <div
        className={`absolute inset-y-0 left-0 w-1 ${isLunar ? "bg-lunar" : "bg-solar"}`}
      />
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                isLunar
                  ? "bg-[var(--accent-lunar-dim)] text-lunar"
                  : "bg-[var(--accent-solar-dim)] text-solar"
              }`}
            >
              <Icon aria-hidden size={13} />
              {isLunar ? "음력" : "양력"}
            </span>
            <span className="text-[11px] font-medium text-[var(--text-tertiary)]">
              {categoryLabels[anniversary.category]}
            </span>
          </div>
          <h2 className="truncate text-lg font-semibold text-[var(--text-primary)]">
            {anniversary.name}
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {isLunar
              ? `음력 ${anniversary.month}/${anniversary.day} -> 양력 ${date.month}/${date.day}`
              : `양력 ${date.month}/${date.day}`}
          </p>
          <p className="mt-2 flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
            <CalendarHeart aria-hidden size={14} />
            {dateLabel}
            {milestone ? <span>· {milestone}</span> : null}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs font-medium text-[var(--text-tertiary)]">D-Day</p>
          <p className="mt-1 text-2xl font-semibold text-gold drop-shadow-[0_0_18px_rgba(201,169,110,0.18)]">
            {dday === 0 ? "오늘" : `D-${dday}`}
          </p>
        </div>
      </div>
    </article>
  );
}
