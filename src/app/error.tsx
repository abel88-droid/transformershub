"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-ink">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-ember/10 border border-ember/30 flex items-center justify-center mx-auto mb-8">
          <AlertTriangle size={32} className="text-ember-light" />
        </div>
        <span className="foil-seal inline-block mb-4">SYSTEM ERROR</span>
        <h1 className="font-display text-3xl sm:text-4xl uppercase text-bone leading-tight">
          Something Strained
        </h1>
        <p className="text-graphite mt-4">
          An unexpected error interrupted this page. Try again, or head back to the
          homepage.
        </p>
        <div className="mt-9 flex justify-center gap-4">
          <Button variant="primary" onClick={() => reset()}>
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
