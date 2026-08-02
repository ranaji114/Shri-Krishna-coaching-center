import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, GraduationCap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-[16px] bg-[#18181B] text-[#C48A2A] mx-auto flex items-center justify-center shadow-lg">
          <GraduationCap className="w-8 h-8" />
        </div>

        <Badge variant="gold">404 Error • Page Not Found</Badge>

        <h1 className="text-4xl font-bold font-editorial text-[#18181B]">
          Route Does Not Exist
        </h1>

        <p className="text-sm text-zinc-600 leading-relaxed">
          The requested page URL could not be located on the Shri Krishna Coaching Center server. Please return to home or navigate using the main menu.
        </p>

        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" size="md">
              <ArrowLeft className="w-4 h-4 mr-2" /> Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
