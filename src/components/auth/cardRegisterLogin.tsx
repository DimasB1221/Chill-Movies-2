"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import handleSubmitLogin from "@/src/hooks/auth/useLogin";
import handleSubmitRegister from "@/src/hooks/auth/useRegister";

interface CardRegisterLoginProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function CardRegisterLogin({ className, ...props }: CardRegisterLoginProps) {
  const pathname = usePathname();
  const isRegisterPage = pathname === "/register";
  const isLoginPage = pathname === "/login";

  // useActionState untuk login dan register
  const [loginState, loginFormAction, isLoginPending] = React.useActionState(
    handleSubmitLogin,
    "",
  );
  const [registerState, registerFormAction, isRegisterPending] =
    React.useActionState(handleSubmitRegister, "");

  // Pilih state, action, dan pending yang sesuai
  const state = isLoginPage ? loginState : registerState;
  const formAction = isLoginPage ? loginFormAction : registerFormAction;
  const isPending = isLoginPage ? isLoginPending : isRegisterPending;

  // Conditional content based on pathname
  const content = {
    title: isRegisterPage ? "Daftar" : "Masuk",
    subtitle: isRegisterPage ? "Selamat datang!" : "Selamat datang kembali!",
    buttonText: isRegisterPage ? "Daftar" : "Masuk",
    footerText: isRegisterPage ? "Sudah punya akun?" : "Belum punya akun?",
    footerLinkText: isRegisterPage ? "Masuk" : "Daftar",
    footerLinkHref: isRegisterPage ? "/login" : "/register",
  };

  return (
    <section
      className={cn(
        "w-full sm:max-w-md rounded-2xl bg-gradient-to-b from-black/80 to-black/50 p-8 backdrop-blur-md border border-white/10 shadow-2xl relative",
        className,
      )}
      {...props}
    >
      {/* Logo */}
      <div className="flex items-center justify-center mb-5">
        <Image
          src="/Chill-Logo.png"
          alt="Logo"
          width={250}
          height={200}
          className="absolute top-0"
        />
      </div>

      {/* Title & Subtitle */}
      <div className="mb-8 text-center relative top-10">
        <h6 className=" font-semibold text-white md:text-[32px]">
          {content.title}
        </h6>
        <p className="mt-1  text-white/60">{content.subtitle}</p>
      </div>

      {/* Form */}
      <form
        action={formAction}
        className={`space-y-5 ${isLoginPage ? "mt-15" : "mt-0"}`}
      >
        {/* Error/Success Message */}
        {state && (
          <div
            className={`flex items-start gap-2 p-3 rounded-lg border ${
              state.includes("berhasil")
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {state.includes("berhasil") ? (
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <p className="text-sm flex-1">{state}</p>
          </div>
        )}

        {/* Email Input */}
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Masukkan email"
          required
          disabled={isPending}
        />

        {/* Password Input */}
        <Input
          type="password"
          name="password"
          label="Kata Sandi"
          placeholder="Masukkan kata sandi"
          required
          disabled={isPending}
        />

        {/* Confirm Password Input - Only on Register */}
        {isRegisterPage && (
          <Input
            type="password"
            name="confirmPassword"
            label="Konfirmasi Kata Sandi"
            placeholder="Masukkan kata sandi"
            required
            disabled={isPending}
          />
        )}

        {/* Footer Link */}
        <p className=" text-white/60 md:text-base">
          {content.footerText}{" "}
          <Link
            href={content.footerLinkHref}
            className="font-semibold text-white hover:underline"
          >
            {content.footerLinkText}
          </Link>
        </p>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          size="lg"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Memproses...</span>
            </div>
          ) : (
            content.buttonText
          )}
        </Button>

        <div className="flex justify-center text-xs md:text-[14px]">
          <span className="bg-transparent px-2 text-white/40">Atau</span>
        </div>

        {/* Google OAuth Button */}
        <Button
          type="button"
          variant="google"
          className="w-full"
          size="lg"
          disabled={isPending}
        >
          <svg className="h-5 w-5" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          {content.buttonText} dengan Google
        </Button>
      </form>
    </section>
  );
}

export default CardRegisterLogin;
