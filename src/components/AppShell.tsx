import type { ReactNode } from "react";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { BottomNav } from "./BottomNav";

type AppShellProps = {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
};

export function AppShell({ children, title = "달새김", eyebrow, action }: AppShellProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-5 pb-24 pt-7">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          {eyebrow ? (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl font-semibold tracking-normal text-[var(--text-primary)]">
            {title}
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {action}
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-soft border border-[var(--border-subtle)] bg-card px-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--bg-card-hover)] hover:text-gold"
          >
            <UserRound aria-hidden size={17} />
            로그인
          </Link>
        </div>
      </header>
      {children}
      <BottomNav />
    </main>
  );
}
