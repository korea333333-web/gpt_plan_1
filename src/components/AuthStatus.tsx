"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, UserRound } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase";

export function AuthStatus() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const supabase = getSupabaseClient();

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) {
        return;
      }

      setSession(data.session);
      setReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setReady(true);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    setSession(null);
  }

  if (!ready) {
    return (
      <span className="inline-flex h-10 w-20 animate-pulse rounded-soft border border-[var(--border-subtle)] bg-card" />
    );
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-soft border border-[var(--border-subtle)] bg-card px-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--bg-card-hover)] hover:text-gold"
      >
        <UserRound aria-hidden size={17} />
        로그인
      </Link>
    );
  }

  const label =
    session.user.user_metadata?.name ??
    session.user.user_metadata?.full_name ??
    session.user.email ??
    "내 계정";

  return (
    <div className="flex items-center gap-2">
      <span className="hidden max-w-36 truncate rounded-soft border border-[var(--border-subtle)] bg-card px-3 py-2 text-xs font-semibold text-gold sm:inline">
        {label}
      </span>
      <button
        type="button"
        onClick={signOut}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-soft border border-[var(--border-subtle)] bg-card px-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--bg-card-hover)] hover:text-gold"
      >
        <LogOut aria-hidden size={17} />
        로그아웃
      </button>
    </div>
  );
}
