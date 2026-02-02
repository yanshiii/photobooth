"use client";

import { motion } from "framer-motion";

export default function FilterStrip({ activeFilter, onChange }) {
  const FILTERS = [
    { id: "natural", label: "Natural", icon: "●" },
    { id: "bw", label: "Black & White", icon: "◐" },
    { id: "vintage", label: "Vintage Film", icon: "✦" },
    { id: "retro", label: "Retro Fade", icon: "◌" },
    { id: "cool", label: "Cool Night", icon: "❄" },
  ];

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {FILTERS.map((f) => {
        const isActive = activeFilter === f.id;

        return (
          <motion.button
            key={f.id}
            onClick={() => onChange(f.id)}
            whileTap={{ scale: 0.94 }}
            animate={{ scale: isActive ? 1.06 : 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className={`
              relative px-5 py-2 rounded-full text-sm
              flex items-center gap-2 transition-all
              ${
                isActive
                  ? "bg-ruby-900/80 text-white shadow-lg shadow-ruby-950/40"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }
            `}
          >
            <span className={`text-xs ${isActive ? "text-white" : "text-white/40"}`}>
              {f.icon}
            </span>
            <span className="font-medium">{f.label}</span>

            {isActive && (
              <span className="absolute inset-0 rounded-full ring-1 ring-ruby-500/40 pointer-events-none" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
