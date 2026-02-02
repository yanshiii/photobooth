"use client";

import { motion } from "framer-motion";
import { FRAME_RATIO } from "@/styles/frame";

export default function CaptureButton({
  videoRef,
  onCapture,
  isMirrored,
  filter = "none",
  disabled = false,
}) {
  function handleCapture() {
    if (disabled || !videoRef?.current) return;

    const video = videoRef.current;
    if (!video.videoWidth || !video.videoHeight) return;

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const videoAspect = vw / vh;

    let sx, sy, sw, sh;

    if (videoAspect > FRAME_RATIO) {
      sh = vh;
      sw = sh * FRAME_RATIO;
      sx = (vw - sw) / 2;
      sy = 0;
    } else {
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
    <motion.button
      onClick={handleCapture}
      whileTap={{ scale: 0.9 }}
      className="relative h-20 w-20 rounded-full bg-white"
    />
  );
}
