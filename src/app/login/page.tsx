import { AuthButtons } from "@/components/AuthButtons";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-10">
      <div className="mb-10">
        <div className="mb-7 h-24 w-24 rounded-soft border border-[rgba(201,169,110,0.2)] bg-[linear-gradient(135deg,rgba(201,169,110,0.22),rgba(18,20,28,0.72)),url('/images/anniversary-system-bg.png')] bg-[length:420px_auto] bg-[position:16%_12%] shadow-[0_22px_58px_rgba(0,0,0,0.36)]" />
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--text-tertiary)]">
          DalSaeGim
        </p>
        <h1 className="text-4xl font-semibold tracking-normal text-[var(--text-primary)] drop-shadow-[0_3px_24px_rgba(0,0,0,0.55)]">
          소중한 날을
          <br />
          달에 새겨요
        </h1>
        <p className="mt-5 text-sm leading-6 text-[var(--text-secondary)]">
          카카오 또는 구글로 로그인하고, 음력과 양력 기념일을 가족과 함께
          놓치지 않게 관리하세요.
        </p>
      </div>
      <AuthButtons />
    </main>
  );
}
