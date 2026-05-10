import { AppShell } from "@/components/AppShell";
import { solarToLunar } from "@/lib/lunar";

const days = Array.from({ length: 31 }, (_, index) => index + 1);

export default function CalendarPage() {
  return (
    <AppShell eyebrow="Calendar" title="2026년 5월">
      <section className="rounded-soft border border-[var(--border-subtle)] bg-card p-4">
        <div className="mb-3 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[var(--text-tertiary)]">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={`blank-${index}`} />
          ))}
          {days.map((day) => {
            const lunar = solarToLunar(2026, 5, day);
            const isMarked = day === 30;
            return (
              <div
                key={day}
                className={`min-h-20 rounded-soft border p-2 ${
                  isMarked
                    ? "border-gold bg-[var(--accent-gold-dim)]"
                    : "border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)]"
                }`}
              >
                <p className="text-sm font-semibold text-[var(--text-primary)]">{day}</p>
                <p className="mt-1 text-[10px] text-[var(--text-tertiary)]">
                  {lunar.isLeapMonth ? "윤" : ""}
                  {lunar.month}/{lunar.day}
                </p>
                {isMarked ? (
                  <p className="mt-2 truncate text-[10px] font-semibold text-gold">결혼기념일</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
