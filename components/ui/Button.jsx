"use client";

import { motion } from "framer-motion";

/**
 * Button — Romantic Luxe System
 *
 * Variants:
 * - primary: ceremonial cream glow
 * - secondary: glass outline
 * - ghost: minimal utility
 * - destructive: muted crimson
 */

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}) {
  const base =
    "relative inline-flex items-center justify-center transition-all focus-visible:outline-none overflow-hidden";

  const sizes = {
    sm: "px-5 py-2 text-xs",
    md: "px-7 py-3 text-sm",
    lg: "px-9 py-3.5 text-base",
  };

  const variants = {
    primary: `
      bg-[radial-gradient(circle_at_30%_30%,#f2d9a6_0%,#d9b67a_35%,#a46a4e_70%,#7a2e35_100%)]
      text-[#1a0d11]
      shadow-[0_12px_30px_rgba(173,40,49,0.35),0_2px_10px_rgba(242,217,166,0.3)]
      border border-[#f2d9a6]/40
      hover:shadow-[0_16px_40px_rgba(173,40,49,0.45),0_4px_14px_rgba(242,217,166,0.35)]
    `,
    secondary: `
      bg-white/5
      text-[#F5F5DC]
      border border-white/15
      backdrop-blur-sm
      hover:bg-white/10
      hover:border-white/25
    `,
    ghost: `
      bg-transparent
      text-white/70
      border border-transparent
      hover:text-white
      hover:bg-white/5
    `,
    destructive: `
      bg-[#3a0f14]
      text-[#f2d9a6]
      border border-[#a9363f]/40
      hover:bg-[#4a1419]
      shadow-[0_10px_24px_rgba(122,46,53,0.35)]
    `,
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      className={`
        ${base}
        ${sizes[size]}
        ${variants[variant]}
        ${disabled ? "opacity-40 pointer-events-none" : ""}
        rounded-xl
        ${className}
      `}
    >
      {/* Soft light sweep for primary */}
      {variant === "primary" && (
        <span
          className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />
      )}

      <span className="relative z-10 tracking-[0.18em] uppercase font-display">
        {children}
      </span>
    </motion.button>
  );
}
