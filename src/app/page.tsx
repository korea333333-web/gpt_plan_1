import Link from "next/link";
import { Bell, Plus, Users } from "lucide-react";
import { AnniversaryCard } from "@/components/AnniversaryCard";
import { AppShell } from "@/components/AppShell";
import { today, upcomingAnniversaries } from "@/lib/demo-data";

export default function Home() {
  return (
    <AppShell
      eyebrow={`${today.year}년 ${today.month}월`}
      title="다가오는 날"
      action={
        <Link
          href="/settings"
          className="inline-flex h-10 w-10 items-center justify-center rounded-soft border border-[var(--border-subtle)] bg-card text-[var(--text-secondary)] transition hover:text-gold"
          aria-label="알림 설정"
        >
          <Bell aria-hidden size={18} />
        </Link>
      }
    >
      <section className="mb-6 rounded-soft border border-[var(--border-subtle)] bg-[rgba(201,169,110,0.08)] p-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-soft bg-[var(--accent-gold-dim)] text-gold">
            <Users aria-hidden size={19} />
          </span>
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              가족 기념일을 일정별로 공유
            </p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              카카오, 텔레그램, 구글 캘린더 알림은 복수 선택할 수 있어요.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        {upcomingAnniversaries.map((item) => (
          <AnniversaryCard key={item.anniversary.id ?? item.anniversary.name} {...item} />
        ))}
      </section>

      <Link
        href="/add"
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-soft bg-gold px-4 text-sm font-semibold text-[#17130b] transition hover:brightness-105"
      >
        <Plus aria-hidden size={18} />
        기념일 추가
      </Link>
    </AppShell>
  );
}
