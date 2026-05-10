import { AppShell } from "@/components/AppShell";
import { formatDateOnly } from "@/lib/date";
import { lunarToSolar, solarToLunar } from "@/lib/lunar";

export default function ConverterPage() {
  const solar = lunarToSolar(2026, 3, 27);
  const lunar = solarToLunar(2026, 5, 22);

  return (
    <AppShell eyebrow="Converter" title="음력 양력 변환">
      <section className="space-y-4">
        <div className="rounded-soft border border-[var(--border-subtle)] bg-card p-5">
          <p className="text-xs font-semibold text-lunar">음력에서 양력</p>
          <h2 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
            음력 2026년 3월 27일
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            양력 {formatDateOnly(solar)}
          </p>
        </div>
        <div className="rounded-soft border border-[var(--border-subtle)] bg-card p-5">
          <p className="text-xs font-semibold text-solar">양력에서 음력</p>
          <h2 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
            양력 2026년 5월 22일
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            음력 {lunar.year}년 {lunar.isLeapMonth ? "윤" : ""}
            {lunar.month}월 {lunar.day}일
          </p>
        </div>
      </section>
    </AppShell>
  );
}
