import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export function Card({ className, children, hoverEffect = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[20px] bg-white border border-[#E7E5E4] p-6 shadow-[0_10px_30px_-10px_rgba(24,24,27,0.04)]",
        hoverEffect &&
          "transition-all duration-300 hover:border-[#C48A2A]/40 hover:shadow-[0_20px_40px_-15px_rgba(24,24,27,0.08)] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
