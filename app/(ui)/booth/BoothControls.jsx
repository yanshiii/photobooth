"use client";

import { motion } from "framer-motion";
import Button from "../../../components/ui/Button";
import CaptureButton from "./CaptureButton";

export default function BoothControls({
  videoRef,
  isMirrored,
  isComplete,
  hasAnyPhoto,
  onCapture,
  onRetakeCurrent,
  onRetakeAll,
  onToggleMirror,
  onNext,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`
        flex flex-col items-center gap-4
        ${className}
      `}
    >
      {/* Primary Action */}
      {!isComplete && (
        <CaptureButton
          videoRef={videoRef}
          isMirrored={isMirrored}
          onCapture={onCapture}
        />
      )}

      {/* Secondary Actions */}
      <div className="flex gap-3 flex-wrap justify-center">
        {/* Mirror Toggle (always available) */}
        <Button variant="ghost" onClick={onToggleMirror} size="sm">
          {isMirrored ? "Disable mirror" : "Enable mirror"}
        </Button>

        {/* Retake Current (only after first photo) */}
        {hasAnyPhoto && (
          <Button
            variant="ghost"
            onClick={onRetakeCurrent}
            disabled={!hasAnyPhoto}
            size="sm"
          >
            Retake current
          </Button>
        )}

        {/* Retake All (only after first photo) */}
        {hasAnyPhoto && (
          <Button
            variant="ghost"
            onClick={onRetakeAll}
            disabled={!hasAnyPhoto}
            size="sm"
          >
            Retake all
          </Button>
        )}

        {/* Next / Proceed (only when complete) */}
        {isComplete && (
          <Button onClick={onNext} variant="primary">
            Next → Edit
          </Button>
        )}
      </div>
    </motion.div>
  );
}