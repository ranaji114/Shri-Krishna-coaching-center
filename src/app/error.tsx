"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, AlertOctagon } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime exception caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-[16px] bg-amber-100 text-amber-900 mx-auto flex items-center justify-center shadow-lg">
          <AlertOctagon className="w-8 h-8 text-[#C48A2A]" />
        </div>

        <Badge variant="warning">500 Application Exception</Badge>

        <h1 className="text-3xl font-bold font-editorial text-[#18181B]">
          Something Went Unexpectedly Wrong
        </h1>

        <p className="text-xs text-zinc-600 leading-relaxed">
          An unexpected application error occurred. We have logged the trace details. Please try reloading the component.
        </p>

        <div className="flex justify-center gap-4 pt-2">
          <Button variant="primary" size="md" onClick={reset}>
            <RefreshCw className="w-4 h-4 mr-2" /> Try Reloading
          </Button>
          <Link href="/">
            <Button variant="outline" size="md">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
