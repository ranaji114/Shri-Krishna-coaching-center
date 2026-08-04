import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Shri Krishna Coaching Center Kadipur",
  description: "Contact Shri Krishna Coaching Center at Mudila Bazar, Akhand Nagar Road, Kadipur, Sultanpur UP. Call +91 6389647711 or WhatsApp for batch timings and demo class.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
