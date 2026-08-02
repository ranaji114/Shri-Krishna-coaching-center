"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, value, defaultValue, onChange, onFocus, onBlur, placeholder, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = Boolean(value || defaultValue);
    const isFloated = isFocused || hasValue;

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          // Only show placeholder when label has floated up (so they never overlap)
          placeholder={isFloated ? (placeholder ?? "") : ""}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            "w-full pt-6 pb-2 px-4 bg-white border border-[#E7E5E4] rounded-[16px] text-sm text-[#27272A] transition-all duration-200 outline-none",
            "focus:border-[#C48A2A] focus:ring-2 focus:ring-[#C48A2A]/20",
            error && "border-amber-600 focus:border-amber-600 focus:ring-amber-600/20",
            className
          )}
          {...props}
        />
        <label
          className={cn(
            "absolute left-4 pointer-events-none transition-all duration-200 font-medium",
            isFloated
              ? "top-2 text-[10px] uppercase tracking-wider text-[#C48A2A]"
              : "top-4 text-sm text-zinc-500",
            error && "text-amber-600"
          )}
        >
          {label}
        </label>
        {error && <p className="mt-1 text-xs text-amber-700 font-medium px-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, value, defaultValue, onChange, onFocus, onBlur, placeholder, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = Boolean(value || defaultValue);
    const isFloated = isFocused || hasValue;

    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={isFloated ? (placeholder ?? "") : ""}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            "w-full pt-6 pb-2 px-4 bg-white border border-[#E7E5E4] rounded-[16px] text-sm text-[#27272A] transition-all duration-200 outline-none min-h-[120px]",
            "focus:border-[#C48A2A] focus:ring-2 focus:ring-[#C48A2A]/20",
            error && "border-amber-600 focus:border-amber-600 focus:ring-amber-600/20",
            className
          )}
          {...props}
        />
        <label
          className={cn(
            "absolute left-4 pointer-events-none transition-all duration-200 font-medium",
            isFloated
              ? "top-2 text-[10px] uppercase tracking-wider text-[#C48A2A]"
              : "top-4 text-sm text-zinc-500",
            error && "text-amber-600"
          )}
        >
          {label}
        </label>
        {error && <p className="mt-1 text-xs text-amber-700 font-medium px-1">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
