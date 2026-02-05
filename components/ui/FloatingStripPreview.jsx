"use client";

import { motion } from "framer-motion";

/**
 * FloatingStripPreview
 * - Retro film strip vibe with sprocket holes
 * - Squared edges, warm ruby/cream palette (no black)
 */

export default function FloatingStripPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, rotate: 2 }}
      animate={{ opacity: 1, x: 0, rotate: 5 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative hidden lg:block pr-12"
    >
      {/* Burgundy ambient glow */}
      <div
        className="
          absolute
          -inset-40
          blur-[140px]
          bg-[#6b1f28]/20
        "
      />

      {/* Main Paper strip */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [5, 4, 5] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative
          w-[270px]
          p-[2px]
          bg-[#fdfaf7]
          border-x border-[#e8d5c8]/40
          shadow-[25px_40px_80px_-20px_rgba(0,0,0,0.4),0_10px_30px_-10px_rgba(62,18,28,0.2)]
        "
      >
        {/* Paper grain */}
        <div
          className="
            absolute inset-0
            pointer-events-none
            opacity-[0.06]
            mix-blend-multiply
            bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.12),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(0,0,0,0.1),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(0,0,0,0.08),transparent_45%)]
          "
        />

        {/* Frames Container */}
        <div className="relative flex flex-col gap-2 px-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
                relative
                -right-0.5
                -left-0.5
                aspect-[1/1.2]
                overflow-hidden
                bg-[#1a0d11]
                shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]
              "
            >
              {/* Emulsion color grade */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6b1f28]/10 via-transparent to-white/5" />

              {/* Glossy reflection */}
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.06)_65%)]" />

              {/* Inner frame border */}
              <div className="absolute inset-[1px] border border-white/5" />
            </div>
          ))}
        </div>

        {/* Footer info: printed timestamp */}
        <div className="mt-4 flex justify-center items-center px-1 opacity-50 grayscale">
          <span className="text-[8px] font-mono tracking-widest text-[#6b1f28]">
            04 FEB 2026
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
