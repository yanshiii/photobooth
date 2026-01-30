"use client";

import { motion } from "framer-motion";

export default function CaptureButton({ videoRef, onCapture, isMirrored }) {
  function handleCapture() {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0);
    canvas.toBlob((blob) => blob && onCapture(blob), "image/png");
  }

  return (
    <motion.button
      onClick={handleCapture}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="
        relative
        h-20 w-20
        rounded-full
        focus:outline-none
      "
      aria-label="Capture photo"
    >
      {/* OUTER RING */}
      <div
        className="
          absolute inset-0
          rounded-full
          bg-white/10
          border border-white/30
          shadow-[0_10px_40px_-15px_rgba(255,255,255,0.25)]
        "
      />

      {/* INNER RING */}
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="
          absolute inset-2
          rounded-full
          bg-white
          flex items-center justify-center
        "
      >
        
        {/* SHUTTER CORE */}
        <div className="h-2.5 w-2.5 rounded-full bg-black" />
      </motion.div>
    </motion.button>
  );
}
