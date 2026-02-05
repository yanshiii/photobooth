"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useBoothStore } from "@/store/boothStore";
import FloatingStripPreview from "@/components/ui/FloatingStripPreview";

const layouts = [
  {
    id: "single",
    slots: 1,
    label: "1 Photo",
    description: "A clean, classic portrait",
  },
  {
    id: "double",
    slots: 2,
    label: "2 Photos",
    description: "Perfect for before & after",
  },
  {
    id: "triple",
    slots: 3,
    label: "3 Photos",
    description: "The full photo booth strip",
  },
];

export default function ChooseLayoutPage() {
  const router = useRouter();
  const { setLayout } = useBoothStore();

  async function handleSelect(layout) {
    const res = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ layoutId: layout.id }),
    });

    if (!res.ok) {
      console.error("Failed to create session");
      return;
    }

    const data = await res.json();

    setLayout({
      id: data.layoutId,
      slots: data.slots,
      sessionId: data.sessionId,
    });

    router.push("/booth");
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* =========================
          REFINED BACKGROUND LAYERS
          ========================= */}
      
      {/* 1. The Main Ruby Animated Gradient */}
      <div className="ruby-animated-bg" />
      {/* Soft ruby wash to keep mood consistent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_0%,rgba(122,46,53,0.22),rgba(13,7,6,0.9))]" />

      {/* 2. Concentric Ruby Circles (Concentric animation) */}
      <div className="ruby-circles">
        <div className="ruby-circle xl ruby-950 -top-1/4 -left-1/4" />
        <div className="ruby-circle lg ruby-900 top-0 right-0" />
        <div className="ruby-circle md ruby-800 bottom-0 left-1/4" />
        <div className="ruby-circle sm ruby-700 top-1/2 right-1/4" />
      </div>

      {/* 3. Film Grain Overlay */}
      <div className="film-grain" />

      {/* 4. Soft Top Radial Highlight (Keeps the header readable) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(252,217,166,0.08),rgba(0,0,0,0))]" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-20 items-center">
            {/* LEFT — Text + Cards */}
            <div>
              {/* HEADER */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="text-center mb-16 lg:mb-20"
              >
                <h1
                  style={{
                    WebkitTextFillColor: "#F5F5DC",
                    background: "none",
                  }}
                >
                  <span>Frame&nbsp;</span>
                  <span className="h1-soft">your memory</span>
                </h1>
                <p className="subtitle mx-auto text-[#F5F5DC] text-[clamp(1.1rem,1.8vw,1.5rem)]">
                  Choose how many moments you want to keep.
                </p>

                <p className="font-body text-white/55 text-sm mt-4 tracking-wide">
                  You can take your time with each one.
                </p>

                <p className="label-text text-white/50 mt-6">
                  Step 1 of 4 — Choose your layout
                </p>

                <p className="font-body text-white/40 text-xs mt-2 tracking-wide">
                  You can still retake photos before finalizing.
                </p>
              </motion.div>

              {/* LAYOUT CARDS - Swapped for your new glass-card-refined class */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 mt-10">
                {layouts.map((layout, index) => (
                  <motion.button
                    key={layout.id}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 1.1,
                      delay: 0.25 + index * 0.12,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -5, scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(layout)}
                    className="group glass-card-refined text-left focus-visible:outline-none"
                  >
                    {/* Light-catch border */}
                    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
                    <div className="pointer-events-none absolute inset-[1px] rounded-3xl bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0)_35%)] opacity-40" />
                    {/* SLOT PREVIEW */}
                    <div className="relative mb-6 flex gap-2">
                      {Array.from({ length: layout.slots }).map((_, i) => (
                        <div
                          key={i}
                          className="
                            relative
                            w-full
                            h-24
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)]
                            transition-all
                            duration-500
                            group-hover:border-white/25
                            group-hover:bg-white/10
                          "
                        />
                      ))}
                    </div>

                    <h3 className="font-accent text-lg text-[#F5F5DC] mb-2 tracking-wide">
                      {layout.label}
                    </h3>

                    <p className="font-body text-[0.95rem] text-[#F5F5DC]/60 leading-relaxed">
                      {layout.description}
                    </p>

                    {/* ARROW */}
                    <div className="absolute bottom-6 right-6 w-9 h-9 flex items-center justify-center bg-[#ad2831]/20 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1">
                      <svg className="w-4 h-4 text-[#e7a4ab]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* FOOTER NOTE */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <p className="font-body text-white/35 text-xs tracking-wide">
                  Choose wisely — this sets the feel of your final strip.
                </p>
              </motion.div>
            </div>

            {/* RIGHT — FLOATING STRIP */}
            <div className="relative flex justify-end lg:pr-5">
              {/* Photostrip glow */}
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(55%_55%_at_60%_40%,rgba(242,217,166,0.18),rgba(122,46,53,0.18),rgba(0,0,0,0))] blur-3xl" />
              <FloatingStripPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
