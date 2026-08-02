import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "zinc" | "stone" | "success" | "warning";
  className?: string;
}

export function Badge({ children, variant = "gold", className }: BadgeProps) {
  const variants = {
    gold: "bg-[#C48A2A]/10 text-[#C48A2A] border-[#C48A2A]/30",
    zinc: "bg-[#18181B] text-[#FAF8F5] border-zinc-800",
    stone: "bg-stone-200/60 text-zinc-700 border-stone-300",
    success: "bg-amber-100/70 text-amber-900 border-amber-300",
    warning: "bg-amber-200/50 text-amber-900 border-amber-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
