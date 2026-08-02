"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStore } from "@/context/store-context";
import { CheckCircle2, ArrowRight, Sparkles, Send } from "lucide-react";
import Link from "next/link";

const CLASS_OPTIONS = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

const SUBJECT_OPTIONS = [
  "Physics",
  "Chemistry",
  "Mathematics",
  "Biology",
  "English Grammar",
];

export default function AdmissionPage() {
  const { addAdmission } = useStore();

  const [formData, setFormData] = useState({
    student_name: "",
    father_name: "",
    mother_name: "",
    phone: "",
    address: "",
    target_class: "Class 10",
    school_name: "",
  });

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    "Physics",
    "Chemistry",
    "Mathematics",
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubjectToggle = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.student_name || !formData.father_name || !formData.phone || !formData.school_name) {
      setErrorMsg("Please fill in all required student and parent fields.");
      return;
    }

    if (selectedSubjects.length === 0) {
      setErrorMsg("Please select at least one subject for admission.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    await addAdmission({
      student_name: formData.student_name,
      father_name: formData.father_name,
      mother_name: formData.mother_name || "N/A",
      phone: formData.phone,
      address: formData.address || "Kadipur / Sultanpur",
      target_class: formData.target_class,
      subjects: selectedSubjects,
      school_name: formData.school_name,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 space-y-12">
      <div className="max-w-2xl space-y-4">
        <Badge variant="gold">Session 2026-27 Registration</Badge>
        <h1 className="text-4xl md:text-5xl font-bold font-editorial text-[#18181B]">
          Online Admission Form
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed">
          Complete the official student application form below. Approved registrations will receive direct batch time confirmation via phone and WhatsApp.
        </p>
      </div>

      {isSubmitted ? (
        <Card className="p-12 text-center max-w-2xl mx-auto space-y-6 bg-white border border-[#E7E5E4] shadow-xl">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-[#C48A2A] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-editorial text-[#18181B]">
              Application Submitted Successfully!
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Thank you, <strong className="text-[#18181B]">{formData.student_name}</strong>. Your registration for <strong className="text-[#18181B]">{formData.target_class}</strong> has been transmitted to our administrative office at Mudila Bazar.
            </p>
          </div>
          <div className="p-4 rounded-[14px] bg-stone-50 text-xs text-zinc-600 space-y-1">
            <p><strong>Total Subjects Selected:</strong> {selectedSubjects.length} ({selectedSubjects.join(", ")})</p>
            <p><strong>Estimated Monthly Fee:</strong> ₹{selectedSubjects.length * 250} (₹250/subject)</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button variant="primary" onClick={() => setIsSubmitted(false)}>
              Submit Another Application
            </Button>
            <Link href="/">
              <Button variant="outline">Return to Home</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8">
            {errorMsg && (
              <div className="p-4 rounded-[14px] bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            {/* Student Info */}
            <Card className="p-8 space-y-6">
              <h3 className="text-xl font-bold font-editorial text-[#18181B]">
                1. Student & Parent Personal Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Student Full Name *"
                  required
                  value={formData.student_name}
                  onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                />

                <Input
                  label="Phone / Mobile Number *"
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />

                <Input
                  label="Father's Name *"
                  required
                  value={formData.father_name}
                  onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                />

                <Input
                  label="Mother's Name"
                  value={formData.mother_name}
                  onChange={(e) => setFormData({ ...formData, mother_name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <Input
                  label="Current School Name *"
                  required
                  value={formData.school_name}
                  onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                />

                <Input
                  label="Full Residential Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </Card>

            {/* Academic Selection */}
            <Card className="p-8 space-y-6">
              <h3 className="text-xl font-bold font-editorial text-[#18181B]">
                2. Academic Class & Subject Choices
              </h3>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block">
                  Select Target Class Level *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CLASS_OPTIONS.map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setFormData({ ...formData, target_class: cls })}
                      className={`p-3 rounded-[14px] text-xs font-semibold border transition-all cursor-pointer ${
                        formData.target_class === cls
                          ? "bg-[#18181B] text-[#FAF8F5] border-[#18181B] shadow-md"
                          : "bg-white text-zinc-700 border-[#E7E5E4] hover:border-[#C48A2A]"
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-100">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block">
                  Select Subjects (Flat ₹250 Per Subject) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SUBJECT_OPTIONS.map((sub) => {
                    const isSelected = selectedSubjects.includes(sub);
                    return (
                      <div
                        key={sub}
                        onClick={() => handleSubjectToggle(sub)}
                        className={`p-4 rounded-[14px] border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? "bg-stone-100 border-[#C48A2A] text-[#18181B] shadow-xs"
                            : "bg-white border-[#E7E5E4] text-zinc-600 hover:border-stone-300"
                        }`}
                      >
                        <span className="text-xs font-bold">{sub}</span>
                        <span className="text-[11px] font-num font-semibold text-[#C48A2A]">
                          {isSelected ? "✓ Enrolled" : "+ Add (₹250)"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting Application..." : "Submit Admission Registration"}
            </Button>
          </form>

          {/* Side Info */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-8 space-y-4 bg-[#18181B] text-[#FAF8F5] border-zinc-800">
              <Badge variant="gold">Fee Breakdown</Badge>
              <h4 className="text-2xl font-bold font-editorial text-white">Transparent Tuition</h4>

              <div className="space-y-2 text-xs text-zinc-300 border-t border-zinc-800 pt-4">
                <div className="flex justify-between py-1 border-b border-zinc-800/60">
                  <span>Selected Subjects:</span>
                  <span className="font-num font-bold text-[#C48A2A]">{selectedSubjects.length}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800/60">
                  <span>Fee Per Subject:</span>
                  <span className="font-num font-bold text-white">₹250</span>
                </div>
                <div className="flex justify-between py-2 text-sm font-bold text-white">
                  <span>Total Monthly Tuition:</span>
                  <span className="font-num text-[#C48A2A]">₹{selectedSubjects.length * 250}</span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 leading-relaxed pt-2">
                Includes physical whiteboard lectures, weekly Sunday tests, past 10-year question bank analysis, and evening WhatsApp doubt resolution.
              </p>
            </Card>

            <Card className="p-6 space-y-3">
              <h4 className="text-sm font-bold font-editorial text-[#18181B]">Need Immediate Assistance?</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Contact Founder Krishna Sir directly at <a href="tel:6389647711" className="font-bold text-[#18181B] hover:text-[#C48A2A]">6389647711</a> or visit our Mudila Bazar office.
              </p>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
