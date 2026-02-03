"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useBoothStore } from "@/store/boothStore";

/* Font options */
const FONTS = [
  { label: "Classic", value: "Arial" },
  { label: "Modern", value: "Inter" },
  { label: "Retro", value: "Courier New" },
];

/* Text presets */
const TEXT_PRESETS = [
  {
    id: "classic",
    label: "Classic",
    config: {
      font: "Arial",
      allCaps: false,
      color: "#000000",
      showDate: true,
    },
  },
  {
    id: "vintage",
    label: "Vintage",
    config: {
      font: "Courier New",
      allCaps: true,
      color: "#2b2b2b",
      showDate: true,
    },
  },
  {
    id: "modern",
    label: "Modern",
    config: {
      font: "Inter",
      allCaps: false,
      color: "#111111",
      showDate: false,
    },
  },
];

export default function StripTextControls() {
  const {
    /* message */
    memoryText,
    setMemoryText,

    /* date */
    memoryDateEnabled,
    toggleMemoryDate,

    /* color */
    memoryTextColor,
    setMemoryTextColor,

    /* font style */
    memoryFont,
    setMemoryFont,
    memoryAllCaps,
    toggleMemoryAllCaps,

    /* preset helper */
    applyTextPreset,
  } = useBoothStore();

  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="space-y-7">

      {/* ───────── PRESETS ───────── */}
      <div className="space-y-2">
        <p className="text-shadow-2xs uppercase tracking-widest text-white/50">
        Quick Styles
        </p>
        <p className="text-xs tracking-widest text-white/50">
          Apply a style, then customize below
        </p>

        <div className="flex flex-wrap gap-2">
          {TEXT_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => applyTextPreset(p.config)}
              className="
                px-3 py-1.5
                rounded-full
                text-xs
                border
                transition
                bg-neutral-900/40
                border-white/10
                text-white/70
                hover:bg-rose-900/70
                hover:text-white
              "
              style={{ fontFamily: p.config.font }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ───────── MESSAGE INPUT ───────── */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-white/50">
          Message (optional)
        </label>

        <input
          type="text"
          value={memoryText}
          onChange={(e) => setMemoryText(e.target.value)}
          maxLength={25}
          placeholder="Our first date"
          className="
            w-full
            px-4 py-3 mt-2
            rounded-xl
            bg-neutral-950/60
            border border-white/10
            text-white
            placeholder:text-white/30
            focus:outline-none
            focus:ring-2
            focus:ring-rose-800/60
          "
        />

        <div className="text-[10px] text-white/40 text-right">
          {memoryText.length} / 25
        </div>
      </div>

      {/* ───────── DATE TOGGLE ───────── */}
      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-sm text-white/70">Show date</span>
        <button
          onClick={toggleMemoryDate}
          className={`w-11 h-6 rounded-full relative transition ${
            memoryDateEnabled ? "bg-rose-600" : "bg-neutral-700"
          }`}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
              memoryDateEnabled ? "right-0.5" : "left-0.5"
            }`}
          />
        </button>
      </label>

      {/* ───────── TEXT COLOR ───────── */}
      {(memoryText || memoryDateEnabled) && (
        <div className="space-y-3">
          <button
            onClick={() => setShowColorPicker((s) => !s)}
            className="flex items-center gap-3"
          >
            <div
              className="w-6 h-6 rounded-lg border border-white/30"
              style={{ background: memoryTextColor }}
            />
            <span className="text-xs font-mono text-white/60">
              {memoryTextColor.toUpperCase()}
            </span>
          </button>

          {showColorPicker && (
            <HexColorPicker
              color={memoryTextColor}
              onChange={setMemoryTextColor}
              className="!w-full"
            />
          )}
        </div>
      )}

      {/* ───────── FONT SELECT ───────── */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-white/50">
          Font
        </p>

        <div className="flex flex-wrap gap-2">
          {FONTS.map((f) => (
            <button
              key={f.value}
              onClick={() => setMemoryFont(f.value)}
              className={`px-3 py-1.5 rounded-full text-xs border transition
                ${
                  memoryFont === f.value
                    ? "bg-rose-900/80 border-rose-700 text-white"
                    : "bg-neutral-900/40 border-white/10 text-white/60 hover:text-white"
                }
              `}
              style={{ fontFamily: f.value }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ───────── ALL CAPS ───────── */}
      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-sm text-white/70">ALL CAPS</span>
        <button
          onClick={toggleMemoryAllCaps}
          className={`w-11 h-6 rounded-full relative transition ${
            memoryAllCaps ? "bg-rose-600" : "bg-neutral-700"
          }`}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
              memoryAllCaps ? "right-0.5" : "left-0.5"
            }`}
          />
        </button>
      </label>
    </div>
  );
}
