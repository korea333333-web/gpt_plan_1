import { AppShell } from "@/components/AppShell";

const notificationDays = [7, 3, 0];

export default function AddAnniversaryPage() {
  return (
    <AppShell eyebrow="New" title="기념일 추가">
      <form className="space-y-5 rounded-soft border border-[var(--border-subtle)] bg-card p-5">
        <label className="block">
          <span className="text-xs font-semibold text-[var(--text-tertiary)]">기념일 이름</span>
          <input
            className="mt-2 h-11 w-full rounded-soft border border-[var(--border-subtle)] bg-[var(--bg-input)] px-3 text-sm outline-none ring-gold/0 transition focus:ring-2"
            placeholder="어머니 생신"
          />
        </label>

        <div>
          <span className="text-xs font-semibold text-[var(--text-tertiary)]">날짜 기준</span>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button type="button" className="h-11 rounded-soft bg-[var(--accent-lunar-dim)] text-sm font-semibold text-lunar">
              음력
            </button>
            <button type="button" className="h-11 rounded-soft border border-[var(--border-subtle)] text-sm font-semibold text-[var(--text-secondary)]">
              양력
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label>
            <span className="text-xs font-semibold text-[var(--text-tertiary)]">월</span>
            <input className="mt-2 h-11 w-full rounded-soft border border-[var(--border-subtle)] bg-[var(--bg-input)] px-3 text-sm outline-none" defaultValue="3" />
          </label>
          <label>
            <span className="text-xs font-semibold text-[var(--text-tertiary)]">일</span>
            <input className="mt-2 h-11 w-full rounded-soft border border-[var(--border-subtle)] bg-[var(--bg-input)] px-3 text-sm outline-none" defaultValue="27" />
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <input type="checkbox" className="h-4 w-4 accent-[#c9a96e]" />
          윤달 기념일
        </label>

        <div>
          <span className="text-xs font-semibold text-[var(--text-tertiary)]">알림 설정</span>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {notificationDays.map((day) => (
              <label key={day} className="flex h-11 items-center justify-center gap-2 rounded-soft border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)]">
                <input type="checkbox" defaultChecked className="accent-[#c9a96e]" />
                {day === 0 ? "당일" : `${day}일 전`}
              </label>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold text-[var(--text-tertiary)]">공유 대상</span>
          <div className="mt-2 rounded-soft border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 text-sm text-[var(--text-secondary)]">
            가족 구성원별 공유와 알림 수신 여부를 일정마다 선택합니다.
          </div>
        </div>

        <button type="button" className="h-12 w-full rounded-soft bg-gold text-sm font-semibold text-[#17130b]">
          저장
        </button>
      </form>
    </AppShell>
  );
}
