import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Shri Krishna Coaching Center Kadipur",
  description: "Photo gallery of Shri Krishna Coaching Center, Mudila Bazar, Kadipur, Sultanpur — classrooms, campus, student events and achievements.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
