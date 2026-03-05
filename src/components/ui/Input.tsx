"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPasswordType = type === "password";
    const inputType = isPasswordType && showPassword ? "text" : type;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm md:text-lg font-normal text-white">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={inputType}
            className={cn(
              "flex h-12 w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm md:text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            ref={ref}
            {...props}
          />
          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
