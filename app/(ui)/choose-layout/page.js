"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { layouts } from "./layouts";
import LayoutCard from "./LayoutCard";

export default function ChooseLayoutPage() {
  const router = useRouter();
  const [selectedLayout, setSelectedLayout] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-zinc-50 to-zinc-100 relative overflow-hidden">
      {/* Gradient orbs for visual interest */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200/30 to-cyan-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-violet-200/20 to-blue-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 bg-clip-text text-transparent">
            Choose Your Layout
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Select the perfect format for your photo booth experience. 
            Each layout is optimized for maximum creativity.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-slideUp">
          {layouts.map((layout, index) => (
            <div
              key={layout.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-fadeInUp"
            >
              <LayoutCard
                layout={layout}
                selected={selectedLayout?.id === layout.id}
                onSelect={setSelectedLayout}
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center animate-fadeIn" style={{ animationDelay: "400ms" }}>
          <button
            disabled={!selectedLayout}
            onClick={() => router.push("/booth")}
            className="group relative overflow-hidden rounded-full px-8 py-4 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white font-medium text-lg shadow-lg shadow-zinc-900/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/30 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Continue to Camera
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}