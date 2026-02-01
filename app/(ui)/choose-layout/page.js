"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LayoutCard from "./LayoutCard";
import { useBoothStore } from "@/store/boothStore";

export default function ChooseLayoutPage() {
  const router = useRouter();
  const [layouts, setLayouts] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadLayouts() {
      try {
        const res = await fetch("/api/layouts");
        if (!res.ok) throw new Error("Failed to load layouts");

        const data = await res.json();
        setLayouts(data.layouts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLayouts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading layouts…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Multi-layered gradient orbs with depth */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-300/20 via-teal-200/15 to-cyan-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-gradient-to-bl from-cyan-200/15 to-blue-300/10 rounded-full blur-2xl" />
      
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-violet-300/15 via-purple-200/10 to-fuchsia-200/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute bottom-20 left-20 w-[350px] h-[350px] bg-gradient-to-tl from-blue-200/10 to-indigo-300/15 rounded-full blur-2xl" />
      
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/30 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 sm:py-28">
        {/* Hero Section with enhanced typography */}
        <div className="text-center mb-20 animate-fadeIn">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200/50 text-sm font-medium text-emerald-700 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Step 1 of 3
            </span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent leading-[1.1]">
            Choose Your
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Perfect Layout
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Select the format that brings your vision to life.
            <br className="hidden sm:block" />
            Each layout is crafted for <span className="font-medium text-slate-700">maximum creative impact</span>.
          </p>
        </div>

        {/* Layout Grid with staggered animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-slideUp">
          {layouts.map((layout, index) => (
            <div
              key={layout.id}
              style={{ 
                animationDelay: `${index * 150}ms`,
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              <LayoutCard
                layout={layout}
                selected={selectedLayout?.id === layout.id}
                onSelect={setSelectedLayout}
              />
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="flex flex-col items-center gap-6 animate-fadeIn" style={{ animationDelay: "500ms" }}>
        <button
          disabled={!selectedLayout}
          onClick={async () => {
            if (!selectedLayout) return;

            const res = await fetch("/api/session", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ layoutId: selectedLayout.id }),
            });

            if (!res.ok) {
              // TODO: show error UI
              return;
            }

            const session = await res.json();

            setLayout({
              ...selectedLayout,
              sessionId: session.sessionId,
              slots: session.slots,
            });

            router.push("/booth");
          }}
            className="group relative overflow-hidden rounded-2xl px-10 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white font-semibold text-lg shadow-2xl shadow-slate-900/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-500 hover:shadow-3xl hover:shadow-slate-900/40 hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <span className="relative z-10 flex items-center gap-3">
              Continue to Camera
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          
          {/* Subtle helper text */}
          {!selectedLayout && (
            <p className="text-sm text-slate-500 animate-pulse">
              👆 Select a layout to continue
            </p>
          )}
        </div>

        {/* Decorative bottom gradient line */}
        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    </div>
  );
}