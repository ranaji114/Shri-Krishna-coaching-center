"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-[20px] focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none select-none tracking-wide cursor-pointer";

    const variants = {
      primary:
        "bg-[#C48A2A] text-white hover:bg-[#A87420] shadow-[0_4px_20px_rgba(196,138,42,0.3)] hover:shadow-[0_8px_30px_rgba(196,138,42,0.45)] border border-[#C48A2A]",
      secondary:
        "bg-[#18181B] text-[#FAF8F5] hover:bg-zinc-800 shadow-[0_4px_20px_rgba(24,24,27,0.2)] hover:shadow-[0_8px_30px_rgba(24,24,27,0.35)] border border-zinc-800",
      dark:
        "bg-zinc-900 text-zinc-100 hover:bg-black border border-zinc-800",
      outline:
        "border border-[#E7E5E4] bg-white text-[#27272A] hover:bg-[#FAF8F5] hover:border-[#C48A2A] hover:text-[#C48A2A] shadow-sm",
      ghost:
        "bg-transparent text-[#27272A] hover:bg-zinc-200/50 hover:text-[#18181B]",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs rounded-[16px]",
      md: "px-6 py-3 text-sm rounded-[20px]",
      lg: "px-8 py-4 text-base rounded-[20px]",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
