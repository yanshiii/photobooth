"use client";

import { HexColorPicker } from "react-colorful";
import { useBoothStore } from "@/store/boothStore";
import { useState } from "react";

export default function StripColorPicker() {
  const stripBackground = useBoothStore((s) => s.stripBackground);
  const setStripBackground = useBoothStore((s) => s.setStripBackground);
  const [copied, setCopied] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleCopyHex = () => {
    navigator.clipboard.writeText(stripBackground);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-3">
      <p className="text-[11px] uppercase tracking-[0.25em] text-white/50 font-medium">
        Strip color
      </p>

      {/* COLOR PREVIEW */}
      <button
        onClick={() => setShowColorPicker(!showColorPicker)}
        className="flex items-center gap-3 w-full cursor-pointer group"
      >
        <div
          className="w-6 h-6 rounded-lg border-2 border-white/30 shadow-lg transition-all group-hover:border-white/50 group-hover:scale-110"
          style={{ background: stripBackground }}
        />
        <span className="text-xs font-mono tracking-wider text-white/60 group-hover:text-white/80 transition-colors">
          {stripBackground.toUpperCase()}
        </span>
      </button>

      {/* COLOR PICKER - shows when clicked */}
      {showColorPicker && (
        <div
          className="
            relative
            rounded-3xl
            bg-gradient-to-br from-neutral-950/90 to-neutral-900/80
            border border-rose-900/40
            p-5
            shadow-[0_0_60px_rgba(127,29,29,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)]
            backdrop-blur-xl
            transition-all duration-300
            hover:shadow-[0_0_80px_rgba(127,29,29,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]
            hover:border-rose-800/50
          "
        >
          {/* Glow effect matching current color */}
          <div
            className="absolute inset-0 rounded-3xl opacity-20 blur-2xl transition-all duration-300"
            style={{ background: stripBackground }}
          />

          <div className="relative">
            <HexColorPicker
              color={stripBackground}
              onChange={setStripBackground}
              className="!w-full"
            />

            {/* Enhanced HEX readout */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={handleCopyHex}
                className="
                  flex-1
                  flex items-center justify-between
                  px-4 py-2.5
                  rounded-xl
                  bg-neutral-900/60
                  border border-white/10
                  hover:border-white/20
                  transition-all duration-200
                  group
                  cursor-pointer
                "
              >
                <span className="text-sm font-mono tracking-wider text-white/90 group-hover:text-white transition-colors">
                  {stripBackground.toUpperCase()}
                </span>
                
                <span className="text-[10px] text-white/40 group-hover:text-white/60 transition-colors uppercase tracking-widest">
                  {copied ? "Copied!" : "Copy"}
                </span>
              </button>

              {/* Color preview swatch */}
              <div className="relative">
                <div
                  className="
                    h-10 w-10
                    rounded-xl
                    border-2 border-white/30
                    shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)]
                    transition-all duration-200
                    hover:scale-110
                    hover:border-white/50
                  "
                  style={{ background: stripBackground }}
                />
                {/* Inner glow */}
                <div
                  className="absolute inset-0 rounded-xl blur-md opacity-60"
                  style={{ background: stripBackground }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}