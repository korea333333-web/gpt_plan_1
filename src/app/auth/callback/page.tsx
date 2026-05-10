"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState("로그인 정보를 확인하고 있어요.");

  useEffect(() => {
    let mounted = true;
    const supabase = getSupabaseClient();

    async function finishLogin() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const errorDescription =
        params.get("error_description") ?? params.get("error") ?? null;

      if (errorDescription) {
        setMessage(`로그인 오류: ${errorDescription}`);
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!mounted) {
          return;
        }

        if (error) {
          setMessage(`세션 교환 실패: ${error.message}`);
          return;
        }
      }

      const { data, error } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      if (error) {
        setMessage(error.message);
        return;
      }

      if (data.session) {
        router.replace("/");
        return;
      }

      setMessage(
        "로그인 세션을 찾지 못했어요. Supabase Redirect URLs에 /auth/callback 주소가 들어갔는지 확인해 주세요.",
      );
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/");
      }
    });

    finishLogin();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-10">
      <div className="rounded-soft border border-[var(--border-subtle)] bg-card p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--text-tertiary)]">
          Login
        </p>
        <h1 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">
          로그인 확인 중
        </h1>
        <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{message}</p>
      </div>
    </main>
  );
}
