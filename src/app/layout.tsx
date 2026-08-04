import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/store-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ToastContainer } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: {
    default: "Shri Krishna Coaching Center | Best Coaching in Kadipur, Sultanpur UP",
    template: "%s | Shri Krishna Coaching Center Kadipur",
  },
  description:
    "Shri Krishna Coaching Center (Established 2021) at Mudila Bazar, Kadipur, Sultanpur. Professional coaching for Classes 6 to 12 in Physics, Chemistry, Mathematics, Biology & English Grammar at ₹250 per subject.",
  keywords: [
    "Shri Krishna Coaching Center",
    "Shri Krishna Coaching Classes Kadipur",
    "Coaching Center Kadipur Sultanpur",
    "Tuition Kadipur UP",
    "Tuition Sultanpur",
    "Class 10 Coaching Sultanpur",
    "Class 12 Coaching Kadipur",
    "Physics Chemistry Maths Tuition Sultanpur",
    "Board Exam Coaching Kadipur",
    "Krishna Sir Coaching Kadipur",
    "Priyanshu Sir Coaching",
    "Mudila Bazar Coaching Center",
    "Akhand Nagar Road Coaching",
    "Class 6 to 12 Tuition UP",
    "Affordable Coaching Sultanpur",
    "Fee 250 per subject coaching",
    "Best Coaching Center Kadipur",
    "UP Board Coaching Sultanpur",
  ],
  authors: [{ name: "Krishna Sir (B.Com, LL.B.)" }],
  metadataBase: new URL("https://shri-krishna-coaching-center.vercel.app"),
  openGraph: {
    title: "Shri Krishna Coaching Center | Established 2021",
    description:
      "Handcrafted academic excellence for Classes 6 to 12 in Sultanpur & Kadipur. White Board Teaching, Doubt Clearance & Weekly Test Series.",
    url: "https://shri-krishna-coaching-center.vercel.app",
    siteName: "Shri Krishna Coaching Center",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Shri Krishna Coaching Center",
  foundingDate: "2021",
  founders: [
    {
      "@type": "Person",
      name: "Krishna Sir",
      jobTitle: "Founder & Faculty",
      qualification: "B.Com, LL.B.",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mohan Book Depo, Mudila Bazar, Akhand Nagar Road",
    addressLocality: "Kadipur",
    addressRegion: "Sultanpur, Uttar Pradesh",
    postalCode: "228145",
    addressCountry: "IN",
  },
  telephone: "+91-6389647711",
  priceRange: "₹250 per subject",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Coaching Classes",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Class 6 to 12 Physics, Chemistry, Math, Biology, English Grammar",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#27272A]">
        <StoreProvider>
          <Navbar />
          <main className="flex-grow pt-24">{children}</main>
          <Footer />
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
