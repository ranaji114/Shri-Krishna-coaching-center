import React from "react";
import Metadata from "next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { GraduationCap, Award, BookOpen, Target, HeartHandshake, CheckCircle2 } from "lucide-react";
import { FACULTY_ROSTER } from "@/lib/initial-data";

export const metadata = {
  title: "About Us | Shri Krishna Coaching Center",
  description: "Learn about the founding story, mission, and vision of Shri Krishna Coaching Center established in 2021 by Krishna Sir (B.Com, LL.B.).",
};

export default function AboutPage() {
  const founder = FACULTY_ROSTER[0];

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 space-y-24">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <Badge variant="gold">Est. 2021 • Kadipur, Sultanpur</Badge>
        <h1 className="text-4xl md:text-6xl font-bold font-editorial text-[#18181B] leading-tight">
          Nurturing Academic Potential Through Discipline & Clarity.
        </h1>
        <p className="text-base md:text-lg text-zinc-600 leading-relaxed">
          Shri Krishna Coaching Center was established in 2021 to provide structured, affordable, and high-impact educational guidance for students in Classes 6 through 12.
        </p>
      </div>

      {/* Founder Bio Spotlight */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white border border-[#E7E5E4] rounded-[20px] p-8 md:p-12 shadow-sm">
        <div className="lg:col-span-5">
          <div className="relative rounded-[16px] overflow-hidden border border-[#E7E5E4] aspect-[4/5] bg-stone-100">
            <img
              src={founder.photo}
              alt={founder.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs text-[#C48A2A] font-bold uppercase tracking-wider block">Founder</span>
              <h3 className="text-2xl font-bold font-editorial">{founder.name}</h3>
              <p className="text-xs text-zinc-300 font-num">{founder.qualification} • {founder.experience}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <Badge variant="gold">Leadership Spotlight</Badge>
          <h2 className="text-3xl font-bold font-editorial text-[#18181B]">
            A Message From Krishna Sir
          </h2>
          <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
            "When I completed my B.Com and LL.B., I recognized that many talented students in Kadipur struggled in higher secondary exams simply because they lacked strong foundational clarity in early classes. Shri Krishna Coaching Center was built to solve this exact problem."
          </p>
          <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
            "We do not teach shortcuts; we teach understanding. Our whiteboard lectures, weekly tests, and individual doubt sessions ensure that every student gains genuine confidence before walking into any exam hall."
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4 border-t border-stone-100 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-[#18181B]">Qualification</span>
              <p className="text-zinc-500">B.Com, LL.B.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#18181B]">Experience</span>
              <p className="text-zinc-500">5+ Years Active Teaching</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 space-y-4">
          <div className="w-12 h-12 rounded-[14px] bg-[#C48A2A]/10 text-[#C48A2A] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-editorial text-[#18181B]">Our Mission</h3>
          <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
            To provide top-tier academic coaching across Mathematics, Science, and Humanities at an accessible fee structure (₹250 per subject), ensuring no student is left behind due to financial barriers.
          </p>
        </Card>

        <Card className="p-8 space-y-4">
          <div className="w-12 h-12 rounded-[14px] bg-[#18181B] text-[#C48A2A] flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-editorial text-[#18181B]">Our Vision</h3>
          <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
            To be recognized as Sultanpur’s most trusted center of academic integrity, where conceptual understanding, character building, and exam readiness come together seamlessly.
          </p>
        </Card>
      </section>

      {/* Core Principles */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge variant="gold">Why Choose Us</Badge>
          <h2 className="text-3xl font-bold font-editorial text-[#18181B]">
            Our Educational Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3">
            <CheckCircle2 className="w-6 h-6 text-[#C48A2A]" />
            <h4 className="text-lg font-bold font-editorial text-[#18181B]">Traditional Whiteboard Mastery</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Step-by-step mathematical derivations and physics problem solving on whiteboards for maximum clarity.
            </p>
          </Card>
          <Card className="p-6 space-y-3">
            <CheckCircle2 className="w-6 h-6 text-[#C48A2A]" />
            <h4 className="text-lg font-bold font-editorial text-[#18181B]">Rigorous Weekly Tests</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Every Sunday test evaluates weekly chapter comprehension, teaching exam speed and accuracy.
            </p>
          </Card>
          <Card className="p-6 space-y-3">
            <CheckCircle2 className="w-6 h-6 text-[#C48A2A]" />
            <h4 className="text-lg font-bold font-editorial text-[#18181B]">Transparent ₹250 Fee</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Fair, flat-rate pricing per subject ensures high quality without commercial inflation.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
