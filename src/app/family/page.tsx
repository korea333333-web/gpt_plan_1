import { AppShell } from "@/components/AppShell";

const members = ["나", "어머니", "아버지", "동생"];

export default function FamilyPage() {
  return (
    <AppShell eyebrow="Family" title="가족 공유">
      <section className="rounded-soft border border-[var(--border-subtle)] bg-card p-5">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">우리 가족</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          Sprint 1에서는 일정별 개별 공유를 위한 데이터 구조를 먼저 준비합니다.
          이후 기념일마다 공유 대상과 알림 수신자를 고르게 됩니다.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {members.map((member) => (
            <div key={member} className="rounded-soft border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 text-sm text-[var(--text-secondary)]">
              {member}
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
