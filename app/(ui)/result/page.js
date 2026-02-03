"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBoothStore } from "@/store/boothStore";
import Button from "@/components/ui/Button";
import RubyBackground from "@/components/ui/RubyBackground";

export default function ResultPage() {
  const router = useRouter();
  const { finalImage } = useBoothStore();
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!finalImage) return;

    const url = URL.createObjectURL(finalImage);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [finalImage]);

  if (!finalImage) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/60">
        <p>No final image found.</p>
      </div>
    );
  }

  function handleDownload() {
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = "photobooth-strip.png";
    a.click();
  }

  function handleEditAgain() {
    router.push("/editor");
  }

  function handleStartOver() {
    router.push("/choose-layout");
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* 🔴 Ruby background (same as other pages) */}
      <RubyBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="font-display text-4xl sm:text-5xl mb-3">
            Your strip is ready
          </h1>
          <p className="text-white/60">
            Download it, or make one last tweak
          </p>
        </header>

        {/* Final Image */}
        <div className="flex justify-center mb-14">
          <div className="relative">
            <div className="absolute -inset-8 bg-rose-900/30 blur-3xl rounded-full" />
            <img
              src={previewUrl}
              alt="Final photo strip"
              className="relative max-h-[70vh] w-auto shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" onClick={handleDownload}>
            Download
          </Button>

          <Button variant="secondary" onClick={handleEditAgain}>
            Edit again
          </Button>

          <Button variant="ghost" onClick={handleStartOver}>
            Start over
          </Button>
        </div>
      </div>
    </div>
  );
}