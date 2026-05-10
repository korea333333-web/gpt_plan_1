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
    <article className="relative overflow-hidden rounded-soft border border-[var(--border-subtle)] bg-card p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
      <div
        className={`absolute inset-y-0 left-0 w-1 ${isLunar ? "bg-lunar" : "bg-solar"}`}
      />
      <div className="flex items-start justify-between gap-4">
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
          <p className="mt-1 text-2xl font-semibold text-gold">
            {dday === 0 ? "오늘" : `D-${dday}`}
          </p>
        </div>
      </div>
    </article>
  );
}
