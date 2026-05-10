import { AppShell } from "@/components/AppShell";
import { builtinAnniversaries } from "@/lib/builtin-anniversaries";

const channels = [
  { name: "카카오톡 나에게 보내기", status: "연결 전", enabled: true },
  { name: "텔레그램 봇", status: "연결 전", enabled: true },
  { name: "구글 캘린더", status: "종일 일정 생성", enabled: true },
];

export default function SettingsPage() {
  return (
    <AppShell eyebrow="Settings" title="설정">
      <section className="space-y-5">
        <div className="rounded-soft border border-[var(--border-subtle)] bg-card p-5">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">알림 채널</h2>
          <div className="mt-4 space-y-3">
            {channels.map((channel) => (
              <label key={channel.name} className="flex items-center justify-between gap-3">
                <span>
                  <span className="block text-sm text-[var(--text-primary)]">{channel.name}</span>
                  <span className="text-xs text-[var(--text-tertiary)]">{channel.status}</span>
                </span>
                <input type="checkbox" defaultChecked={channel.enabled} className="h-4 w-4 accent-[#c9a96e]" />
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-soft border border-[var(--border-subtle)] bg-card p-5">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">기본 알림 시점</h2>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">오전 9시 · 7일 전 · 3일 전 · 당일</p>
        </div>

        <div className="rounded-soft border border-[var(--border-subtle)] bg-card p-5">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">기본 내장 기념일</h2>
          <div className="mt-4 space-y-3">
            {builtinAnniversaries.map((item) => (
              <label key={item.key} className="flex items-center justify-between gap-3 text-sm text-[var(--text-secondary)]">
                {item.name}
                <input type="checkbox" defaultChecked={item.enabledByDefault} className="h-4 w-4 accent-[#c9a96e]" />
              </label>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
