"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Users,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Phone,
  MapPin,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Pin,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { useStore } from "@/context/store-context";
import { FACULTY_ROSTER, COURSES_LIST, FACILITIES_LIST } from "@/lib/initial-data";

export default function HomePage() {
  const { notices, gallery } = useStore();

  const pinnedNotices = notices.slice(0, 3);
  const previewGallery = gallery.slice(0, 4);

  return (
    <div className="space-y-24 md:space-y-36 pb-20">
      {/* 1. CINEMATIC ASYMMETRICAL 100vh HERO */}
      <section className="relative min-h-[92vh] flex items-center pt-8 pb-16 overflow-hidden">
        {/* Subtle Luxury Background Vignette & Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#F5F2EB] to-[#EFECE4] -z-10" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#C48A2A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-zinc-900/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Asymmetrical Editorial Left Column */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E7E5E4] shadow-xs">
                <Sparkles className="w-4 h-4 text-[#C48A2A]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-800">
                  Established 2021 • Sultanpur & Kadipur
                </span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold font-editorial text-[#18181B] leading-[1.08] tracking-tight">
                Architecting Academic <br />
                <span className="text-[#C48A2A] italic font-serif">Excellence</span> & Integrity.
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
                Shri Krishna Coaching Center offers rigorous conceptual coaching for Classes 6 to 12. Founded by Krishna Sir (B.Com, LL.B.), we combine disciplined whiteboard instruction with personalized doubt resolution.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/admission">
                  <Button variant="primary" size="lg" className="group">
                    Enroll for Session 2026-27
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button variant="outline" size="lg">
                    Explore Curriculum
                  </Button>
                </Link>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.5}>
              <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-6 text-xs text-zinc-600">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C48A2A]" />
                  ₹250 Per Subject
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C48A2A]" />
                  Classes 6 to 12
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C48A2A]" />
                  Weekly & Monthly Test Series
                </div>
              </div>
            </Reveal>
          </div>

          {/* Asymmetrical Right Column - Luxury Photographic Showcase */}
          <div className="lg:col-span-5 relative">
            <Reveal direction="left" delay={0.3}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-[20px] overflow-hidden border border-[#E7E5E4] shadow-2xl bg-white aspect-[4/5]">
                  <img
                    src="/hero-sirji.png"
                    alt="Shri Krishna Coaching Center - Faculty & Learning"
                    className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <Badge variant="gold" className="bg-[#C48A2A] text-white border-none">
                      White Board Teaching
                    </Badge>
                    <h3 className="text-xl font-bold font-editorial text-white">
                      Focused Classroom Atmosphere
                    </h3>
                    <p className="text-xs text-zinc-300">
                      Located at Mudila Bazar, Akhand Nagar Road, Kadipur
                    </p>
                  </div>
                </div>

                {/* Floating Prestige Badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-[#18181B] text-white p-5 rounded-[20px] border border-zinc-800 shadow-2xl hidden sm:flex items-center gap-4 max-w-xs"
                >
                  <div className="w-12 h-12 rounded-[14px] bg-[#C48A2A] flex items-center justify-center text-white shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm font-editorial">100+ Active Students</span>
                    <span className="text-[11px] text-zinc-400">High Success Rate in Board Exams</span>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. ANIMATED STATISTICS BAR */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-[#E7E5E4] p-8 md:p-12 rounded-[20px] shadow-sm">
          <div className="space-y-1 text-center md:text-left border-r border-stone-100 last:border-none pr-4">
            <Counter end={100} suffix="+" className="text-3xl md:text-5xl text-[#18181B]" />
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mt-1">
              Active Enrolled Students
            </p>
          </div>
          <div className="space-y-1 text-center md:text-left border-r border-stone-100 last:border-none pr-4">
            <Counter end={5} suffix="+" className="text-3xl md:text-5xl text-[#C48A2A]" />
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mt-1">
              Years Teaching Experience
            </p>
          </div>
          <div className="space-y-1 text-center md:text-left border-r border-stone-100 last:border-none pr-4">
            <Counter end={250} prefix="₹" className="text-3xl md:text-5xl text-[#18181B]" />
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mt-1">
              Transparent Fee / Subject
            </p>
          </div>
          <div className="space-y-1 text-center md:text-left">
            <Counter end={7} suffix=" Classes" className="text-3xl md:text-5xl text-[#C48A2A]" />
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mt-1">
              Classes 6 to 12 Covered
            </p>
          </div>
        </div>
      </section>

      {/* 3. FOUNDER & ABOUT SPOTLIGHT */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Reveal direction="right">
              <div className="group relative rounded-[20px] overflow-hidden border border-[#E7E5E4] bg-white aspect-square shadow-lg">
                <img
                  src={FACULTY_ROSTER[0].photo}
                  alt="Krishna Sir - Founder of Shri Krishna Coaching Center"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold font-editorial">Krishna Sir</h3>
                  <p className="text-xs text-[#C48A2A] font-medium uppercase tracking-wider mt-0.5">
                    Founder • B.Com, LL.B.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <Reveal direction="up">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C48A2A]">
                Founder's Vision
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-editorial text-[#18181B] mt-2">
                "Quality Education Should Not Be a Luxury, But a Structured Promise."
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
                Founded in 2021 by Krishna Sir (B.Com, LL.B.), Shri Krishna Coaching Center was established to bridge the gap between basic schooling and competitive academic comprehension for students in Kadipur and Sultanpur.
              </p>
              <p className="text-sm md:text-base text-zinc-600 leading-relaxed mt-4">
                We believe that every student possesses unique potential that can be unlocked through disciplined whiteboard teaching, regular test evaluations, and genuine mentorship.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="pt-4 flex items-center gap-4">
                <Link href="/about">
                  <Button variant="secondary" size="md">
                    Read Full Story & Mission
                  </Button>
                </Link>
                <Link href="/faculty">
                  <Button variant="outline" size="md">
                    Meet Our Faculty
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. FACULTY ROSTER PREVIEW */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C48A2A]">
              Experienced Mentors
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-editorial text-[#18181B] mt-1">
              Distinction in Every Subject
            </h2>
          </div>
          <Link href="/faculty">
            <Button variant="outline" size="sm" className="w-fit">
              View All Faculty Details <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FACULTY_ROSTER.map((fac) => (
            <Card key={fac.id} className="p-8 space-y-6 flex flex-col justify-between">
              <div className="flex items-start gap-6">
                <div className="group w-24 h-24 rounded-[16px] overflow-hidden border border-[#E7E5E4] shrink-0">
                  <img
                    src={fac.photo}
                    alt={fac.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                </div>
                <div className="space-y-1">
                  <Badge variant="gold">{fac.qualification}</Badge>
                  <h3 className="text-xl font-bold font-editorial text-[#18181B] pt-1">{fac.name}</h3>
                  <p className="text-xs font-semibold text-[#C48A2A]">{fac.role}</p>
                  <p className="text-xs text-zinc-500">{fac.experience}</p>
                </div>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3">
                {fac.bio}
              </p>

              <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-2">
                {fac.subjects.map((sub) => (
                  <span key={sub} className="px-2.5 py-1 rounded-full bg-stone-100 text-[11px] font-medium text-zinc-700">
                    {sub}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. COURSES & PRICING PREVIEW */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="gold">Structured Academic Curricula</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-editorial text-[#18181B]">
            Classes 6 to 12 • Flat ₹250 Per Subject
          </h2>
          <p className="text-sm text-zinc-600">
            No hidden costs. Comprehensive board-level coaching with study materials and test series included.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES_LIST.slice(3, 7).map((c) => (
            <Card key={c.classLevel} className="p-6 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-num font-bold text-[#C48A2A] uppercase tracking-wider block">
                  Secondary Program
                </span>
                <h3 className="text-2xl font-bold font-editorial text-[#18181B] mt-1">
                  {c.classLevel}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed mt-2">
                  {c.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-sm font-num font-bold text-[#18181B]">₹250 / Sub</span>
                <Link href="/admission">
                  <span className="text-xs font-semibold text-[#C48A2A] hover:underline flex items-center gap-1">
                    Apply <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link href="/courses">
            <Button variant="secondary" size="md">
              Explore Complete Fee Structure & All Batches
            </Button>
          </Link>
        </div>
      </section>

      {/* 6. FACILITIES GRID */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C48A2A]">
            Infrastructure & Student Support
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-editorial text-[#18181B]">
            Built for Focused Learning
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FACILITIES_LIST.slice(0, 6).map((fac) => (
            <Card key={fac.title} className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-[14px] bg-[#C48A2A]/10 text-[#C48A2A] flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <h3 className="text-lg font-bold font-editorial text-[#18181B]">{fac.title}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">{fac.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 7. GALLERY TEASER */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C48A2A]">
              Life at Shri Krishna
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-editorial text-[#18181B] mt-1">
              Visual Gallery
            </h2>
          </div>
          <Link href="/gallery">
            <Button variant="outline" size="sm">
              View Full Gallery <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewGallery.map((img) => (
            <div key={img.id} className="group relative rounded-[20px] overflow-hidden border border-[#E7E5E4] aspect-square bg-zinc-900 shadow-md">
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <Badge variant="gold" className="text-[9px] mb-1">{img.category}</Badge>
                <p className="text-xs font-medium font-editorial line-clamp-1">{img.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. LATEST NOTICES */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C48A2A]">
              Important Updates
            </span>
            <h2 className="text-3xl font-bold font-editorial text-[#18181B] mt-1">
              Notice Board
            </h2>
          </div>
          <Link href="/notices">
            <Button variant="outline" size="sm">
              All Announcements
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pinnedNotices.map((n) => (
            <Card key={n.id} className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={n.is_pinned ? "gold" : "stone"}>
                    {n.is_pinned ? "Pinned Notice" : n.category}
                  </Badge>
                  <span className="text-[11px] text-zinc-400 font-num">{n.date}</span>
                </div>
                <h3 className="text-base font-bold font-editorial text-[#18181B] leading-snug">
                  {n.title}
                </h3>
                <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                  {n.content}
                </p>
              </div>

              <Link href="/notices" className="text-xs font-semibold text-[#C48A2A] hover:underline flex items-center gap-1 pt-2 border-t border-stone-100">
                Read full notice <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* 9. LOCATION & CONTACT CTA */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="bg-[#18181B] text-[#FAF8F5] rounded-[20px] p-8 md:p-16 border border-zinc-800 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <Badge variant="gold">Visit Our Campus</Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-editorial text-white leading-tight">
              Ready to Transform Your Academic Journey?
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
              Visit our coaching center at Mudila Bazar, Kadipur or call us directly to schedule a demo class or enroll for the new session.
            </p>

            <div className="space-y-3 pt-2 text-xs text-zinc-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C48A2A] shrink-0 mt-0.5" />
                <span>Mohan Book Depot, Mudila Bazar, Akhand Nagar Road, Kadipur, Sultanpur, Uttar Pradesh</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C48A2A] shrink-0" />
                <a href="tel:6389647711" className="hover:text-white font-medium text-sm">
                  +91 6389647711
                </a>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link href="/admission">
                <Button variant="primary" size="lg">
                  Submit Admission Form
                </Button>
              </Link>
              <a href="https://wa.me/916389647711" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800 hover:border-[#C48A2A]">
                  <MessageSquare className="w-4 h-4 mr-2 text-[#C48A2A]" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative z-10">
            <div className="bg-zinc-900 border border-zinc-800 rounded-[20px] p-6 space-y-4 shadow-2xl">
              <h3 className="text-xl font-bold font-editorial text-white">Coaching Timings</h3>
              <div className="space-y-2 text-xs text-zinc-300 border-t border-zinc-800 pt-4">
                <div className="flex justify-between py-1 border-b border-zinc-800/60">
                  <span>Morning Batches:</span>
                  <span className="font-num text-[#C48A2A]">6:30 AM - 9:30 AM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800/60">
                  <span>Evening Batches:</span>
                  <span className="font-num text-[#C48A2A]">3:30 PM - 6:30 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800/60">
                  <span>Sunday Doubt Classes:</span>
                  <span className="font-num text-[#C48A2A]">8:00 AM - 11:00 AM</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.app.goo.gl/rVJBWrLrpXegVhCy8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="dark" size="sm" className="w-full bg-zinc-800 hover:bg-zinc-700">
                    Open Directions on Google Maps
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
