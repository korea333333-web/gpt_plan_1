import { AppShell } from "@/components/AppShell";

export default function EditAnniversaryPage() {
  return (
    <AppShell eyebrow="Edit" title="기념일 수정">
      <section className="rounded-soft border border-[var(--border-subtle)] bg-card p-5">
        <p className="text-sm leading-6 text-[var(--text-secondary)]">
          Sprint 1에서는 수정 화면 라우트와 데이터 계약을 먼저 준비했습니다.
          Sprint 2에서 저장된 기념일을 불러와 수정/삭제 동작을 붙입니다.
        </p>
      </section>
    </AppShell>
  );
}
