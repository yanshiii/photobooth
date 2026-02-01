"use client";

import { motion } from "framer-motion";
import { FRAME_RATIO } from "@/styles/frame";

export default function CaptureButton({
  videoRef,
  onCapture,
  isMirrored,
  disabled = false,
}) {
  function handleCapture() {
    if (disabled) return;

    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return;

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const videoAspect = vw / vh;

    let sx, sy, sw, sh;

    if (videoAspect > FRAME_RATIO) {
      // Video too wide → crop sides
      sh = vh;
      sw = sh * FRAME_RATIO;
      sx = (vw - sw) / 2;
      sy = 0;
    } else {
      // Video too tall → crop top/bottom
      sw = vw;
      sh = sw / FRAME_RATIO;
      sx = 0;
      sy = (vh - sh) / 2;
    }

    const canvas = document.createElement("canvas");
    canvas.width = sw;
    canvas.height = sh;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh);

    canvas.toBlob(
      (blob) => {
        if (blob) onCapture(blob);
      },
      "image/png",
      1
    );
  }

  return (
    <motion.button
      type="button"
      onClick={handleCapture}
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.92 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        relative
        h-20 w-20
        rounded-full
        focus:outline-none
        ${disabled ? "opacity-40 cursor-not-allowed" : ""}
      `}
      aria-label="Capture photo"
      disabled={disabled}
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
        whileTap={!disabled ? { scale: 0.9 } : undefined}
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
