"use client";

import { motion } from "framer-motion";

/**
 * FloatingStripPreview
 *
 * Purpose:
 * - Emotional preview of the final photo strip
 * - Matches real photobooth paper aesthetic
 * - Introduces ruby/burgundy palette tastefully
 *
 * Rules:
 * - NO real images
 * - NO logic
 * - NO state
 * - Visual only
 */

export default function FloatingStripPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -4 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative hidden lg:block"
    >
      {/* Burgundy ambient glow */}
      <div
        className="
          absolute
          -inset-24
          rounded-full
          blur-[140px]
          bg-[#5c1a1f]/30
        "
      />

      {/* Paper strip */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative
          bg-neutral-50
          p-3.5
          shadow-[0_35px_90px_-22px_rgba(0,0,0,0.55),0_12px_40px_-10px_rgba(45,21,32,0.3)]
          w-[260px]
        "
      >
        {/* Frames */}
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
                relative
                aspect-[3/4]
                overflow-hidden
                bg-gradient-to-br
                /* ⬇️ CHANGE FRAME COLORS HERE ⬇️ */
                from-[#3d2428]  /* dark wine-brown */
                to-[#2a1820]    /* deeper burgundy-black */
                /* ⬆️ CHANGE FRAME COLORS HERE ⬆️ */
              "
            >
              {/* Inner photographic feel */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-br
                  from-black/0
                  via-black/20
                  to-black/40
                "
              />

              {/* Subtle vignette */}
              <div
                className="
                  absolute inset-0
                  shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]
                "
              />

              {/* Burgundy marker on last frame only */}
              {i === 3 && (
                <div
                  className="
                    absolute
                    bottom-3
                    right-3
                    w-2.5
                    h-2.5
                    rounded-full
                    bg-[#7a2e35]
                    opacity-75
                    shadow-[0_0_8px_rgba(122,46,53,0.6)]
                  "
                />
              )}
            </div>
          ))}
        </div>

        {/* Paper edge highlight */}
        <div
          className="
            absolute inset-0
            pointer-events-none
            shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)]
          "
        />
      </motion.div>
    </motion.div>
  );
}