import Link from "next/link";
import { Bell, CalendarCheck2, Plus, Radio, Users } from "lucide-react";
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-soft border border-[var(--border-subtle)] bg-card text-[var(--text-secondary)] shadow-[0_12px_34px_rgba(0,0,0,0.25)] backdrop-blur-xl transition hover:text-gold"
          aria-label="알림 설정"
        >
          <Bell aria-hidden size={18} />
        </Link>
      }
    >
      <section className="mb-6 overflow-hidden rounded-soft border border-[rgba(201,169,110,0.18)] bg-[linear-gradient(135deg,rgba(201,169,110,0.14),rgba(23,25,34,0.72)_42%,rgba(18,21,29,0.82))] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-soft bg-[var(--accent-gold-dim)] text-gold ring-1 ring-[rgba(201,169,110,0.18)]">
            <Users aria-hidden size={19} />
          </span>
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              가족 기념일 시스템
            </p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              음력과 양력 날짜를 변환하고, 세 번의 알림 지점을 함께 관리해요.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-soft border border-[var(--border-subtle)] bg-black/[0.16] px-3 py-2">
                <CalendarCheck2 aria-hidden className="mb-2 text-gold" size={16} />
                <p className="text-[11px] font-semibold text-[var(--text-primary)]">5개 예정</p>
              </div>
              <div className="rounded-soft border border-[var(--border-subtle)] bg-black/[0.16] px-3 py-2">
                <Radio aria-hidden className="mb-2 text-lunar" size={16} />
                <p className="text-[11px] font-semibold text-[var(--text-primary)]">3회 알림</p>
              </div>
              <div className="rounded-soft border border-[var(--border-subtle)] bg-black/[0.16] px-3 py-2">
                <Bell aria-hidden className="mb-2 text-solar" size={16} />
                <p className="text-[11px] font-semibold text-[var(--text-primary)]">09:00</p>
              </div>
            </div>
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
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-soft bg-[linear-gradient(135deg,#e3c783,#b9924e)] px-4 text-sm font-semibold text-[#17130b] shadow-[0_18px_44px_rgba(201,169,110,0.22)] transition hover:brightness-105"
      >
        <Plus aria-hidden size={18} />
        기념일 추가
      </Link>
    </AppShell>
  );
}
