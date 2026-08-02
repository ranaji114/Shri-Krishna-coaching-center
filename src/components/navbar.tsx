"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, ChevronRight, Phone, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Faculty", href: "/faculty" },
  { name: "Courses", href: "/courses" },
  { name: "Facilities", href: "/facilities" },
  { name: "Gallery", href: "/gallery" },
  { name: "Notices", href: "/notices" },
  { name: "Admission", href: "/admission" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Hide nav on admin dashboard nested routes for full workspace focus
  const isAdminDashboardRoute = pathname.startsWith("/admin/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdminDashboardRoute) return null;

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50">
        <div
          className="h-full bg-[#C48A2A] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "py-3 glass-nav shadow-lg" : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#18181B] border border-[#C48A2A]/60 p-1 shadow-xl flex items-center justify-center group-hover:scale-105 transition-all group-hover:border-[#C48A2A] overflow-hidden shrink-0">
              <img 
                src="/logo.png" 
                alt="Shri Krishna Coaching Logo" 
                className="w-full h-full object-contain scale-[1.7]" 
              />
            </div>
            <div>
              <span className="block text-lg md:text-xl font-bold font-editorial text-[#18181B] tracking-tight leading-none">
                Shri Krishna
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C48A2A] block mt-0.5">
                Coaching Center • Est. 2021
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-md border border-[#E7E5E4] px-4 py-1.5 rounded-[24px] shadow-sm">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                    isActive ? "text-[#C48A2A]" : "text-[#3F3F46] hover:text-[#18181B]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#C48A2A] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Admin Quick Link */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1 px-3 py-2 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C48A2A]" />
              Admin
            </Link>
            <Link href="/admission">
              <Button variant="primary" size="sm" className="shadow-md">
                Enroll Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-[14px] bg-white border border-[#E7E5E4] text-[#18181B] shadow-sm hover:border-[#C48A2A] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#C48A2A]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 pt-24 pb-8 px-6 bg-[#FAF8F5]/98 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C48A2A] mb-2 px-3">
                Navigation Menu
              </span>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-[16px] text-base font-semibold transition-all ${
                      isActive
                        ? "bg-[#18181B] text-[#FAF8F5] shadow-md"
                        : "text-[#27272A] hover:bg-stone-200/50"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? "text-[#C48A2A]" : "text-zinc-400"}`} />
                  </Link>
                );
              })}
            </div>

            <div className="pt-6 border-t border-stone-200 flex flex-col gap-3">
              <Link href="/admission" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="lg" className="w-full">
                  Enroll Now
                </Button>
              </Link>

              <div className="flex items-center justify-between px-2 pt-2">
                <a
                  href="tel:6389647711"
                  className="flex items-center gap-2 text-xs font-semibold text-zinc-700 hover:text-[#C48A2A]"
                >
                  <Phone className="w-4 h-4 text-[#C48A2A]" />
                  6389647711
                </a>

                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 flex items-center gap-1"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C48A2A]" />
                  Admin Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
