import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notice Board | Shri Krishna Coaching Center Kadipur",
  description: "Latest notices, exam schedules, holiday announcements and admission updates from Shri Krishna Coaching Center, Kadipur, Sultanpur, Uttar Pradesh.",
};

export default function NoticesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
