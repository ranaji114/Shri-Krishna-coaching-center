"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/context/store-context";
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  Bell,
  MessageSquare,
  LogOut,
  GraduationCap,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ADMIN_NAV = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Admissions", href: "/admin/admissions", icon: Users },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Notice Board", href: "/admin/notices", icon: Bell },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdminAuthenticated, logoutAdmin } = useStore();

  const isLoginPage = pathname === "/admin";

  useEffect(() => {
    if (!isLoginPage && !isAdminAuthenticated) {
      router.push("/admin");
    }
  }, [isAdminAuthenticated, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <ShieldAlert className="w-12 h-12 text-[#C48A2A] mx-auto" />
          <h2 className="text-2xl font-bold font-editorial">Authentication Required</h2>
          <p className="text-xs text-zinc-600">Please log in to access the administrative dashboard.</p>
          <Link href="/admin">
            <Button variant="primary">Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#18181B] text-[#FAF8F5] p-6 flex flex-col justify-between border-r border-zinc-800 shrink-0">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#09090B] border border-[#C48A2A]/50 p-1 shadow-md flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src="/logo.png" 
                alt="Shri Krishna Coaching Logo" 
                className="w-full h-full object-contain scale-140" 
              />
            </div>
            <div>
              <span className="block text-base font-bold font-editorial text-white">
                Shri Krishna
              </span>
              <span className="text-[10px] uppercase font-semibold text-[#C48A2A] block">
                Admin Console
              </span>
            </div>
          </Link>

          {/* Admin Nav */}
          <nav className="space-y-1.5">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-[14px] text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#C48A2A] text-white shadow-md"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-zinc-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-zinc-400 hover:text-white flex items-center justify-between px-2"
          >
            <span>View Public Site</span>
            <span>↗</span>
          </Link>
          <button
            onClick={() => {
              logoutAdmin();
              router.push("/admin");
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-[14px] bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-amber-500" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Dashboard Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-[1280px] mx-auto space-y-8">{children}</div>
      </main>
    </div>
  );
}
