"use client";

import { motion } from "framer-motion";

/**
 * Button — Ruby System
 *
 * Variants:
 * - primary: Continue (animated, ripple, ceremonial)
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
    "relative inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none";

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary: `
      bg-gradient-to-br from-ruby-500 to-ruby-700
      text-white
      shadow-ruby
      overflow-hidden
    `,
    secondary: `
      bg-transparent
      text-ruby-400
      border border-ruby-500/40
      hover:bg-ruby-500/10
    `,
    ghost: `
      bg-transparent
      text-white/50
      hover:text-white/80
    `,
    destructive: `
      bg-transparent
      text-ruby-300
      border border-ruby-900/40
      hover:bg-ruby-900/30
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
        rounded-md
        ${className}
      `}
    >
      {/* Ripple ONLY for primary */}
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-full animate-rubyRipple" />
      )}

      <span className="relative z-10 tracking-wide uppercase">
        {children}
      </span>
    </motion.button>
  );
}
