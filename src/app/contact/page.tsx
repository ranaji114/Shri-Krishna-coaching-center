"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStore } from "@/context/store-context";
import { MapPin, Phone, MessageSquare, Send, CheckCircle2, Clock } from "lucide-react";

export default function ContactPage() {
  const { addMessage } = useStore();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    setIsSubmitting(true);
    await addMessage({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-2xl space-y-4">
        <Badge variant="gold">Get in Touch</Badge>
        <h1 className="text-4xl md:text-5xl font-bold font-editorial text-[#18181B]">
          Contact & Location Details
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed">
          Have questions regarding batch timings, fee structures, or demo sessions? Reach out to Founder Krishna Sir directly or visit our Mudila Bazar campus.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info Cards & Map */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-8 space-y-6">
            <h3 className="text-xl font-bold font-editorial text-[#18181B]">
              Campus Information
            </h3>

            <div className="space-y-4 text-xs text-zinc-600">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-[#C48A2A]/10 text-[#C48A2A] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#18181B] block">Address</span>
                  <p className="leading-relaxed mt-0.5">
                    Mohan Book Depot, Mudila Bazar, Akhand Nagar Road, Kadipur, Sultanpur, Uttar Pradesh - 228145
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-[#18181B] text-[#C48A2A] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#18181B] block">Direct Phone</span>
                  <a href="tel:6389647711" className="text-sm font-bold text-[#18181B] hover:text-[#C48A2A]">
                    +91 6389647711
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-amber-100/70 text-amber-900 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#18181B] block">WhatsApp Action</span>
                  <a
                    href="https://wa.me/916389647711"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#C48A2A] hover:underline"
                  >
                    Click here to open WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Interactive Map Container */}
          <Card className="p-4 space-y-3">
            <h4 className="text-sm font-bold font-editorial text-[#18181B] px-2">Interactive Location Map</h4>
            <div className="w-full h-64 rounded-[14px] overflow-hidden border border-[#E7E5E4] bg-stone-100 relative">
              <iframe
                title="Shri Krishna Coaching Center Google Map Location"
                src="https://maps.google.com/maps?q=26.1793424,82.4637253&t=&z=17&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
            <div className="px-2 pt-1 flex justify-between items-center text-xs">
              <span className="text-zinc-500">Mudila Bazar, Kadipur, UP</span>
              <a
                href="https://maps.app.goo.gl/rVJBWrLrpXegVhCy8"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#C48A2A] hover:underline"
              >
                Open Directions on Google Maps →
              </a>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Card className="p-8 md:p-12 space-y-6">
            <div>
              <h3 className="text-2xl font-bold font-editorial text-[#18181B]">
                Send Direct Message
              </h3>
              <p className="text-xs text-zinc-600 mt-1">
                Your message will be transmitted directly to the Admin Dashboard.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center space-y-4 bg-stone-50 rounded-[16px] border border-stone-200">
                <CheckCircle2 className="w-10 h-10 text-[#C48A2A] mx-auto" />
                <h4 className="text-xl font-bold font-editorial text-[#18181B]">Message Sent!</h4>
                <p className="text-xs text-zinc-600">
                  Thank you for reaching out. Founder Krishna Sir will review your message shortly.
                </p>
                <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Your Full Name *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />

                  <Input
                    label="Phone Number *"
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Email Address (Optional)"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />

                  <Input
                    label="Subject *"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <Textarea
                  label="Your Detailed Message or Query *"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Transmitting..." : "Send Message to Admin"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
