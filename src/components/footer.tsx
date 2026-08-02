"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, MapPin, Phone, MessageSquare, ArrowUpRight, ShieldCheck } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin/")) return null;

  return (
    <footer className="bg-[#18181B] text-[#FAF8F5] pt-20 pb-12 border-t border-zinc-800 relative overflow-hidden">
      {/* Soft Background Accent Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C48A2A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-zinc-800">
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#09090B] border border-[#C48A2A]/50 p-1 shadow-xl flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Shri Krishna Coaching Logo" 
                  className="w-full h-full object-contain scale-140" 
                />
              </div>
              <div>
                <span className="block text-2xl font-bold font-editorial text-white tracking-tight">
                  Shri Krishna
                </span>
                <span className="text-xs uppercase font-semibold tracking-widest text-[#C48A2A]">
                  Coaching Center • Est. 2021
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
              A premier educational institute in Sultanpur dedicated to conceptual clarity, academic excellence, and continuous guidance for students in Classes 6 through 12.
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400">
              <span className="px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-[#C48A2A]">
                ₹250 Per Subject
              </span>
              <span className="px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700">
                100+ Active Students
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C48A2A]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Founder & Mission</Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-white transition-colors">Faculty Roster</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">Courses & Fee Structure</Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-white transition-colors">Campus Facilities</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">Visual Gallery</Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-white transition-colors">Notice Board</Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C48A2A]">
              Classes & Subjects
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>Class 6 to 8 Foundation</li>
              <li>Class 9 & 10 Board Prep</li>
              <li>Class 11 & 12 Advanced</li>
              <li className="pt-2 text-xs text-zinc-500 font-medium">Subjects:</li>
              <li className="text-xs text-zinc-300">Physics • Chemistry • Mathematics</li>
              <li className="text-xs text-zinc-300">Biology • English Grammar</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C48A2A]">
              Visit & Contact
            </h4>
            <ul className="space-y-3.5 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C48A2A] shrink-0 mt-0.5" />
                <span className="text-xs text-zinc-300 leading-relaxed">
                  Mohan Book Depot, Mudila Bazar, Akhand Nagar Road, Kadipur, Sultanpur, Uttar Pradesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C48A2A] shrink-0" />
                <a href="tel:6389647711" className="text-xs text-zinc-300 hover:text-white font-medium">
                  +91 6389647711
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#C48A2A] shrink-0" />
                <a
                  href="https://wa.me/916389647711"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-300 hover:text-white font-medium flex items-center gap-1"
                >
                  WhatsApp Direct Inquiry
                  <ArrowUpRight className="w-3 h-3 text-[#C48A2A]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Admin shortcut */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Shri Krishna Coaching Center. Handcrafted for Academic Distinction.</p>

          <div className="flex items-center gap-6">
            <Link href="/admission" className="hover:text-white transition-colors">
              Online Admission
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Google Maps Location
            </Link>
            <Link href="/admin" className="hover:text-[#C48A2A] transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
