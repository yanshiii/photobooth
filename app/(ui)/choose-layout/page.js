"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useBoothStore } from "@/store/boothStore";
import { Title, Subtitle, Body } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import FloatingStripPreview from "@/components/ui/FloatingStripPreview";

/**
 * Choose Layout Page - Photography-Centric Tone
 *
 * Copy (DO NOT CHANGE):
 * - Heading: "Frame your memory"
 * - Subheading: "Select how many frames your strip will hold."
 * - Helper: "Each frame can be retaken before editing."
 *
 * Layout Cards:
 * - 1 Photo: "A clean, classic portrait"
 * - 2 Photos: "Perfect for before & after"
 * - 3 Photos: "The full photo booth strip"
 */

const layouts = [
  {
    id: "1-photo",
    slots: 1,
    label: "1 Photo",
    description: "A clean, classic portrait",
  },
  {
    id: "2-photos",
    slots: 2,
    label: "2 Photos",
    description: "Perfect for before & after",
  },
  {
    id: "3-photos",
    slots: 3,
    label: "3 Photos",
    description: "The full photo booth strip",
  },
];

export default function ChooseLayoutPage() {
  const router = useRouter();
  const { setLayout } = useBoothStore();

  function handleSelect(layout) {
    setLayout({
      id: layout.id,
      slots: layout.slots,
      sessionId: Date.now(),
    });
    router.push("/booth");
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-6xl">
          {/* TWO-COLUMN COMPOSITION */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-20 items-center">
            {/* LEFT — Text + Cards */}
            <div>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <Title className="text-white mb-4 font-display">
                  Frame your memory
                </Title>

                <Subtitle className="text-white/60 mb-3 font-body">
                  Select how many frames your strip will hold.
                </Subtitle>

                <Body className="text-white/40 text-xs font-body">
                  Each frame can be retaken before editing.
                </Body>
              </motion.div>

              {/* Layout Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {layouts.map((layout, index) => (
                  <motion.button
                    key={layout.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(layout)}
                    className="
                      group
                      relative
                      bg-white/5
                      backdrop-blur-sm
                      border
                      border-white/10
                      rounded-2xl
                      p-8
                      text-left
                      transition-all
                      duration-300
                      hover:bg-white/8
                      hover:border-white/20
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#ad2831]
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-[#0d0706]
                    "
                  >
                    {/* Slot Preview */}
                    <div className="mb-6 flex gap-2">
                      {Array.from({ length: layout.slots }).map((_, i) => (
                        <div
                          key={i}
                          className="
                            w-full
                            h-24
                            bg-white/10
                            rounded-lg
                            border
                            border-white/20
                            transition-all
                            duration-300
                            group-hover:bg-white/15
                            group-hover:border-white/30
                          "
                        />
                      ))}
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2 font-accent">
                      {layout.label}
                    </h3>

                    <p className="text-sm text-white/50 font-body">
                      {layout.description}
                    </p>

                    {/* Arrow Indicator */}
                    <div
                      className="
                        absolute
                        bottom-6
                        right-6
                        w-8
                        h-8
                        flex
                        items-center
                        justify-center
                        bg-[#ad2831]/20
                        rounded-full
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    >
                      <svg
                        className="w-4 h-4 text-[#ad2831]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Footer Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <Body className="text-white/30 text-xs font-body">
                  Choose wisely — this sets the feel of your final strip.
                </Body>
              </motion.div>
            </div>

            {/* RIGHT — Floating Visual Strip */}
            <FloatingStripPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
