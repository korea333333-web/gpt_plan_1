"use client";

import { useState } from "react";
import { authRedirectTo, getSupabaseClient } from "@/lib/supabase";

type Provider = "kakao" | "google";

export function AuthButtons() {
  const [error, setError] = useState<string | null>(null);

  async function signIn(provider: Provider) {
    setError(null);

    try {
      const supabase = getSupabaseClient();
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: authRedirectTo,
          scopes: provider === "kakao" ? "profile_nickname account_email talk_message" : undefined,
        },
      });

      if (signInError) {
        setError(signInError.message);
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "로그인 설정을 확인해 주세요.");
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        className="h-12 w-full rounded-soft bg-[#FEE500] px-4 text-sm font-semibold text-[#191919] transition hover:brightness-95"
        onClick={() => signIn("kakao")}
      >
        카카오로 로그인
      </button>
      <button
        type="button"
        className="h-12 w-full rounded-soft border border-[var(--border-subtle)] bg-card px-4 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-card-hover)]"
        onClick={() => signIn("google")}
      >
        구글로 로그인
      </button>
      {error ? <p className="text-xs text-[var(--accent-red)]">{error}</p> : null}
    </div>
  );
}
