import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { COURSES_LIST } from "@/lib/initial-data";
import Link from "next/link";

export const metadata = {
  title: "Courses & Fee Structure | Coaching Kadipur Sultanpur",
  description: "Class 6 to 12 coaching in Physics, Chemistry, Mathematics, Biology, English Grammar at ₹250 per subject. Shri Krishna Coaching Center, Mudila Bazar, Kadipur, Sultanpur UP.",
};

const SUBJECTS_DETAIL = [
  { name: "Physics", icon: "⚛️", desc: "Mechanics, Optics, Electricity, Magnetism & Practical Numericals." },
  { name: "Chemistry", icon: "🧪", desc: "Physical, Organic reaction mechanisms & Inorganic concepts." },
  { name: "Mathematics", icon: "📐", desc: "Algebra, Geometry, Trigonometry, Calculus & Board Problem Drills." },
  { name: "Biology", icon: "🧬", desc: "Botany, Zoology, Human Physiology & Diagrammatic representation." },
  { name: "English Grammar", icon: "📚", desc: "Tenses, Syntax, Essay Writing, Active/Passive voice & Comprehension." },
];

export default function CoursesPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-2xl space-y-4">
        <Badge variant="gold">Classes 6 to 12 • Transparent Pricing</Badge>
        <h1 className="text-4xl md:text-5xl font-bold font-editorial text-[#18181B]">
          Comprehensive Academic Programs
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed">
          Structured board-aligned coaching with flat ₹250 per subject pricing. No hidden registration surcharges. Study material and weekly test series included.
        </p>
      </div>

      {/* Pricing Spotlight */}
      <div className="bg-[#18181B] text-[#FAF8F5] rounded-[20px] p-8 md:p-12 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="space-y-2">
          <Badge variant="gold">Flat Fee Structure</Badge>
          <h2 className="text-3xl font-bold font-editorial text-white">
            ₹250 <span className="text-base font-normal text-zinc-400">/ Subject / Month</span>
          </h2>
          <p className="text-xs text-zinc-400 max-w-md">
            Pay only for the subjects you enroll in. Includes whiteboard lectures, doubt clearance, and Sunday test evaluations.
          </p>
        </div>
        <Link href="/admission">
          <Button variant="primary" size="lg">
            Apply For Admission <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Class Level Grid */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold font-editorial text-[#18181B]">
          Classes & Curricula Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES_LIST.map((c) => (
            <Card key={c.classLevel} className="p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="gold">{c.classLevel}</Badge>
                  <span className="text-xs font-num font-bold text-[#18181B]">₹250 / Subject</span>
                </div>
                <h3 className="text-2xl font-bold font-editorial text-[#18181B]">{c.classLevel} Coaching Batch</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{c.description}</p>
              </div>

              <div className="space-y-2 pt-4 border-t border-stone-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Available Subjects:</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Physics", "Chemistry", "Math", "Biology", "English"].map((sub) => (
                    <span key={sub} className="px-2 py-0.5 rounded bg-stone-100 text-[10px] font-medium text-zinc-700">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <Link href="/admission">
                <Button variant="outline" size="sm" className="w-full justify-between mt-2">
                  Enroll in {c.classLevel}
                  <ArrowRight className="w-4 h-4 text-[#C48A2A]" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Subjects Taught */}
      <div className="space-y-8 pt-8">
        <h2 className="text-2xl font-bold font-editorial text-[#18181B]">
          Subjects Specialization Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECTS_DETAIL.map((s) => (
            <Card key={s.name} className="p-6 space-y-3">
              <div className="text-2xl">{s.icon}</div>
              <h3 className="text-xl font-bold font-editorial text-[#18181B]">{s.name}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
