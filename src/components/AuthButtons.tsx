"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";

type Provider = "kakao" | "google";

export function AuthButtons() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextError = params.get("error");

    if (nextError) {
      setError(nextError);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  async function signIn(provider: Provider) {
    setError(null);

    if (provider === "kakao") {
      window.location.href = "/api/auth/kakao/start";
      return;
    }

    try {
      const supabase = getSupabaseClient();
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
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
