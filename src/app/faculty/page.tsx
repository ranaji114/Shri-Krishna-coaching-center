import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Award, CheckCircle2, Phone, MessageSquare } from "lucide-react";
import { FACULTY_ROSTER } from "@/lib/initial-data";
import Link from "next/link";

export const metadata = {
  title: "Faculty Roster | Shri Krishna Coaching Center",
  description: "Meet our distinguished faculty: Krishna Sir (B.Com, LL.B.) & Priyanshu Singh Sir (B.Sc.). 5+ years of teaching experience in Kadipur & Sultanpur.",
};

export default function FacultyPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 space-y-16">
      <div className="max-w-2xl space-y-3">
        <Badge variant="gold">Experienced Educators</Badge>
        <h1 className="text-4xl md:text-5xl font-bold font-editorial text-[#18181B]">
          Meet Our Academic Mentors
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed">
          Our faculty members combine strong academic credentials with years of practical classroom experience to mentor students across Classes 6 to 12.
        </p>
      </div>

      <div className="space-y-12">
        {FACULTY_ROSTER.map((fac, idx) => (
          <Card key={fac.id} className="p-8 md:p-12 overflow-hidden border border-[#E7E5E4]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4">
                <div className="group relative rounded-[20px] overflow-hidden border border-[#E7E5E4] aspect-[4/5] bg-stone-100 shadow-md">
                  <img
                    src={fac.photo}
                    alt={fac.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <Badge variant="gold" className="bg-[#C48A2A] text-white border-none mb-1">
                      {fac.role}
                    </Badge>
                    <h3 className="text-2xl font-bold font-editorial">{fac.name}</h3>
                    <p className="text-xs text-zinc-300 font-num">{fac.qualification}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="zinc">{fac.experience}</Badge>
                    <Badge variant="stone">{fac.qualification}</Badge>
                  </div>
                  <h2 className="text-3xl font-bold font-editorial text-[#18181B]">{fac.name}</h2>
                  <p className="text-xs font-semibold text-[#C48A2A] uppercase tracking-wider">{fac.role}</p>
                </div>

                <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
                  {fac.bio}
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#18181B]">
                    Specialized Subjects Taught:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {fac.subjects.map((sub) => (
                      <span key={sub} className="px-3 py-1 rounded-full bg-[#18181B] text-white text-xs font-medium">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-4">
                  <Link href="/admission">
                    <Button variant="primary" size="sm">
                      Enroll Under {fac.name}
                    </Button>
                  </Link>
                  <a href="https://wa.me/916389647711" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2 text-[#C48A2A]" />
                      Ask Subject Inquiry
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
