import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Admission Form | Shri Krishna Coaching Kadipur",
  description: "Apply online for admission at Shri Krishna Coaching Center, Kadipur, Sultanpur. Classes 6 to 12, Physics, Chemistry, Mathematics, Biology at ₹250 per subject. Session 2026-27 open.",
};

export default function AdmissionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
