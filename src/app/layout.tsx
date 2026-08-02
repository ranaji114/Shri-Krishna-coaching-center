import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/store-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ToastContainer } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: {
    default: "Shri Krishna Coaching Center | Premier Tuition Institute in Kadipur, Sultanpur",
    template: "%s | Shri Krishna Coaching Center",
  },
  description:
    "Shri Krishna Coaching Center (Established 2021) at Mudila Bazar, Kadipur, Sultanpur. Professional coaching for Classes 6 to 12 in Physics, Chemistry, Mathematics, Biology & English Grammar at ₹250 per subject.",
  keywords: [
    "Shri Krishna Coaching Center",
    "Coaching Center Kadipur",
    "Tuition Sultanpur",
    "Class 10 Physics Chemistry Math",
    "Class 12 Board Coaching Kadipur",
    "Krishna Sir Coaching",
    "Priyanshu Sir Coaching",
    "Mudila Bazar Coaching",
    "Fee 250 per subject",
  ],
  authors: [{ name: "Krishna Sir (B.Com, LL.B.)" }],
  metadataBase: new URL("https://shrikrishnacoaching.com"),
  openGraph: {
    title: "Shri Krishna Coaching Center | Established 2021",
    description:
      "Handcrafted academic excellence for Classes 6 to 12 in Sultanpur & Kadipur. White Board Teaching, Doubt Clearance & Weekly Test Series.",
    url: "https://shrikrishnacoaching.com",
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
    streetAddress: "Mohan Book Depot, Mudila Bazar, Akhand Nagar Road",
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
