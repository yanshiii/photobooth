"use client";

import { motion } from "framer-motion";
import { STRIP } from "@/styles/stripGeometry";
import { useState } from "react";

export default function CaptureButton({
  videoRef,
  onCapture,
  isMirrored,
  filter = "none",
  disabled = false,
}) {
  const [isCapturing, setIsCapturing] = useState(false);

  function handleCapture() {
    if (disabled || !videoRef?.current || isCapturing) return;

    const video = videoRef.current;
    if (!video.videoWidth || !video.videoHeight) return;

    setIsCapturing(true);
    setTimeout(() => setIsCapturing(false), 300);

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const videoAspect = vw / vh;

    const FRAME_ASPECT = STRIP.FRAME_ASPECT; // ✅ single source of truth

    let sx, sy, sw, sh;

    if (videoAspect > FRAME_ASPECT) {
      sh = vh;
      sw = sh * FRAME_ASPECT;
      sx = (vw - sw) / 2;
      sy = 0;
    } else {
      sw = vw;
      sh = sw / FRAME_ASPECT;
      sx = 0;
      sy = (vh - sh) / 2;
    }

    const canvas = document.createElement("canvas");
    canvas.width = sw;
    canvas.height = sh;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.filter = filter;

    if (isMirrored) {
      ctx.translate(sw, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh);

    canvas.toBlob((blob) => {
      if (blob) onCapture(blob);
    }, "image/png");
  }

  return (
    <div className="relative">
      {/* Outer pulsing ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-ruby-500/40"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute inset-2 rounded-full border border-ruby-400/30"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
      />

      {/* Main button */}
      <motion.button
        onClick={handleCapture}
        disabled={disabled || isCapturing}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative h-20 w-20 rounded-full
          bg-gradient-to-br from-ruby-500 via-ruby-600 to-ruby-700
          shadow-[0_0_30px_rgba(173,40,49,0.6),0_0_60px_rgba(173,40,49,0.3)]
          border-4 border-white/20
          ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
          transition-all duration-300
        `}
      >
        {/* Inner white circle */}
        <motion.div
          className="absolute inset-3 rounded-full bg-white shadow-inner"
          animate={isCapturing ? { scale: [1, 0.7, 1] } : {}}
          transition={{ duration: 0.3 }}
        />

        {/* Flash overlay */}
        {isCapturing && (
          <motion.div
            className="absolute inset-0 rounded-full bg-white"
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.button>
    </div>
  );
}
