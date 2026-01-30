"use client";

import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
}) {
  const variants = {
    primary:
      "bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-[0_10px_30px_-10px_rgba(16,185,129,0.6)]",
    secondary:
      "bg-white/10 text-white border border-white/20 backdrop-blur",
    ghost:
      "bg-transparent text-white/70 hover:text-white",
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
      className={`
        px-5 py-3
        rounded-xl
        text-sm font-medium
        transition-shadow
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
