"use client";

import { motion } from "framer-motion";

/**
 * Button — Ruby System with Shimmer Effect
 *
 * Variants:
 * - primary: Continue (shimmer sweep, ceremonial)
 * - secondary: Retake
 * - ghost: Utility
 * - destructive: Start over
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
    "relative inline-flex items-center justify-center font-semibold transition-all focus-visible:outline-none overflow-hidden";

  const sizes = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-7 py-3.5 text-sm",
    lg: "px-9 py-4.5 text-base",
  };

  const variants = {
    primary: `
      bg-gradient-to-r from-ruby-700 via-ruby-600 to-ruby-700
      text-white
      shadow-ruby
      bg-[length:200%_100%]
      hover:bg-[position:100%_0]
      transition-[background-position]
      duration-500
    `,
    secondary: `
      bg-transparent
      text-ruby-200
      border border-ruby-800/70
      hover:border-ruby-700
      hover:bg-ruby-900/20
    `,
    ghost: `
      bg-transparent
      text-white/60
      hover:text-white/90
      hover:bg-white/5
    `,
    destructive: `
      bg-transparent
      text-rose-400
      border border-rose-500/40
      hover:bg-rose-900/30
      shadow-[0_3px_12px_rgba(244,63,94,0.2)]
    `,
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.96 } : undefined}
      className={`
        ${base}
        ${sizes[size]}
        ${variants[variant]}
        ${disabled ? "opacity-40 pointer-events-none" : ""}
        rounded-lg
        ${className}
      `}
    >
      {/* Shimmer light sweep - ONLY for primary */}
      {variant === "primary" && (
        <span 
          className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      )}
      
      {/* Subtle glow for secondary on hover */}
      {variant === "secondary" && (
        <span className="absolute inset-0 rounded-lg bg-ruby-700/0 hover:bg-ruby-700/10 transition-all duration-300" />
      )}
      
      <span className="relative z-10 tracking-wider uppercase font-bold">
        {children}
      </span>
    </motion.button>
  );
}