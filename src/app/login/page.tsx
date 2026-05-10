import { AuthButtons } from "@/components/AuthButtons";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-10">
      <div className="mb-10">
        <div className="mb-7 h-16 w-16 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f0ece4_0%,#c9a96e_42%,rgba(201,169,110,0.24)_72%,transparent_100%)]" />
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--text-tertiary)]">
          DalSaeGim
        </p>
        <h1 className="text-4xl font-semibold tracking-normal text-[var(--text-primary)]">
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
