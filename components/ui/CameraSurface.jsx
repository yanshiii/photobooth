"use client";

import { STRIP } from "@/styles/stripGeometry";

/**
 * CameraSurface Component
 *
 * Visual:
 * - Clean, minimal border
 * - Subtle ruby accent ring
 * - 3:4 aspect ratio
 * - Deep shadow
 */

export default function CameraSurface({ children }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: STRIP.WIDTH, // ✅ single source of truth
        boxShadow: `
          0 16px 64px -12px rgba(0, 0, 0, 0.6),
          0 8px 32px -8px rgba(100, 13, 20, 0.2)
        `,
      }}
      className="
        relative
        mx-auto
        aspect-[3/4]
        overflow-hidden
        bg-black
        ring-1
        ring-white/10
      "
    >
      {children}
    </div>
  );
}