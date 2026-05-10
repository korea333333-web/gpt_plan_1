import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { AuthStatus } from "./AuthStatus";

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
          <AuthStatus />
        </div>
      </header>
      {children}
      <BottomNav />
    </main>
  );
}
