"use client";

import { useEffect, useState } from "react";
import { useBoothStore } from "@/store/boothStore";

export default function ResultPage() {
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
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-zinc-600">No photo found.</p>
        </div>
      </div>
    );
  }

  function handleDownload() {
    const link = document.createElement("a");
    link.href = previewUrl;
    link.download = "photobooth.png";
    link.click();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-zinc-50 to-zinc-100 relative overflow-hidden">
      {/* Celebratory gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-emerald-300/40 to-cyan-300/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-violet-300/30 to-fuchsia-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-blue-300/30 to-cyan-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header with celebration */}
        <div className="text-center mb-10 animate-fadeIn">
          <div className="inline-block mb-4 animate-bounce">
            <div className="text-6xl">🎉</div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 bg-clip-text text-transparent">
            Your Photo is Ready!
          </h1>
          <p className="text-lg text-zinc-600">
            Looking great! Download or share your masterpiece
          </p>
        </div>

        {/* Photo Display */}
        <div className="mb-10 flex justify-center animate-slideUp" style={{ animationDelay: "200ms" }}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-2xl shadow-zinc-900/20 ring-1 ring-zinc-900/5">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={previewUrl}
                  alt="Final result"
                  className="max-w-full max-h-[60vh] object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 animate-fadeIn" style={{ animationDelay: "400ms" }}>
          <button
            onClick={handleDownload}
            className="group relative overflow-hidden rounded-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold text-lg shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/40 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Photo
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            disabled
            className="rounded-full px-8 py-4 bg-white/60 text-zinc-400 font-semibold text-lg shadow-lg shadow-zinc-900/5 cursor-not-allowed backdrop-blur-sm ring-1 ring-zinc-900/5"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              QR Code (Coming Soon)
            </span>
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-zinc-900/5 animate-fadeIn" style={{ animationDelay: "600ms" }}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-cyan-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 mb-1">
                100% Privacy Protected
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Your photo is processed entirely in your browser. Nothing is uploaded to any server or stored anywhere unless you choose to download it. Your memories stay yours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}