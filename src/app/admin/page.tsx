"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStore } from "@/context/store-context";
import { ShieldCheck, User, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAdmin, isAdminAuthenticated } = useStore();
  
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isAdminAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAdminAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim() || !password) return;

    setIsSubmitting(true);
    setErrorMsg("");

    const result = await loginAdmin(userId, password);
    setIsSubmitting(false);

    if (result.success) {
      router.push("/admin/dashboard");
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md p-8 md:p-10 space-y-8 bg-white border border-[#E7E5E4] shadow-2xl rounded-[24px]">
        <div className="text-center space-y-3">
          <div className="mx-auto flex justify-center">
            <div className="w-28 h-28 rounded-full bg-[#18181B] border border-[#C48A2A]/50 p-2 shadow-2xl flex items-center justify-center overflow-hidden">
              <img 
                src="/logo.png" 
                alt="Shri Krishna Coaching Logo" 
                className="w-full h-full object-contain scale-140" 
              />
            </div>
          </div>
          <Badge variant="gold">Encrypted Admin Access</Badge>
          <h1 className="text-3xl font-bold font-editorial text-[#18181B]">
            Management Portal
          </h1>
          <p className="text-xs text-zinc-500">
            Shri Krishna Coaching Center • Secure Sign In
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-[14px] bg-red-50 border border-red-200 text-red-800 text-xs font-medium text-center space-y-1">
            <p className="font-semibold">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            label="Admin User ID *"
            type="text"
            required
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setErrorMsg("");
            }}
          />

          <Input
            label="Admin Password *"
            type="password"
            required
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMsg("");
            }}
          />

          <div className="p-3 rounded-[12px] bg-stone-50 border border-stone-100 text-[11px] text-zinc-500 space-y-1">
            <p className="flex items-center gap-1.5 font-medium text-zinc-700">
              <Lock className="w-3.5 h-3.5 text-[#C48A2A]" /> SHA-256 Protected Portal
            </p>
            <p className="text-[10px] text-zinc-400">
              Session is protected with 4-hour automatic logout & brute-force rate-limiting.
            </p>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Secure Sign In <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-stone-100">
          <a href="/" className="text-xs text-zinc-500 hover:text-zinc-900 font-medium transition-colors">
            ← Return to Main Website
          </a>
        </div>
      </Card>
    </div>
  );
}
