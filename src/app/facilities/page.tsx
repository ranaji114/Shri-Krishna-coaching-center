import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FACILITIES_LIST } from "@/lib/initial-data";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Campus Facilities | Shri Krishna Coaching Center",
  description: "Discover our learning infrastructure: Whiteboard Teaching, Doubt Classes, Weekly/Monthly Tests, WhatsApp Support, Parking, and Ventilated Classrooms.",
};

export default function FacilitiesPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 space-y-16">
      <div className="max-w-2xl space-y-4">
        <Badge variant="gold">Campus & Academic Infrastructure</Badge>
        <h1 className="text-4xl md:text-5xl font-bold font-editorial text-[#18181B]">
          Facilities Designed For Deep Focus
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed">
          From structured whiteboard instruction to dedicated evening WhatsApp doubt clearing, every facility at Shri Krishna Coaching Center supports student success.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FACILITIES_LIST.map((fac, idx) => (
          <Card key={fac.title} className="p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-[14px] bg-[#C48A2A]/10 text-[#C48A2A] flex items-center justify-center font-num font-bold text-lg">
                0{idx + 1}
              </div>
              <h3 className="text-2xl font-bold font-editorial text-[#18181B]">{fac.title}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">{fac.desc}</p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold text-[#C48A2A]">
              <CheckCircle2 className="w-4 h-4" />
              Available for All Batches
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-[#18181B] text-[#FAF8F5] rounded-[20px] p-8 md:p-12 border border-zinc-800 text-center space-y-6">
        <h2 className="text-3xl font-bold font-editorial text-white">
          Experience Our Facilities in Person
        </h2>
        <p className="text-xs md:text-sm text-zinc-400 max-w-xl mx-auto">
          Visit Mudila Bazar campus for a tour and a free demo session with Krishna Sir & Priyanshu Sir.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/admission">
            <Button variant="primary" size="lg">
              Book Demo Class
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800">
              Get Campus Directions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
