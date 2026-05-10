import Link from "next/link";
import { CalendarDays, Home, Repeat, Settings } from "lucide-react";

const navItems = [
  { href: "/", label: "홈", Icon: Home },
  { href: "/calendar", label: "달력", Icon: CalendarDays },
  { href: "/converter", label: "변환", Icon: Repeat },
  { href: "/settings", label: "설정", Icon: Settings },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-[var(--border-subtle)] bg-[rgba(15,17,23,0.92)] backdrop-blur">
      <div className="mx-auto grid h-16 max-w-3xl grid-cols-4">
        {navItems.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center gap-1 text-[11px] font-medium text-[var(--text-secondary)] transition hover:text-gold"
          >
            <Icon aria-hidden size={20} strokeWidth={1.8} />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
