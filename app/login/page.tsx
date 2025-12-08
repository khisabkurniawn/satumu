import { LoginForm } from "@/app/login/login-form";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="text-center font-bold font-el-messiri text-2xl bg-linear-to-tl from-[#2f318b] to-[#01612e] bg-clip-text text-transparent">
          SatuMu
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
