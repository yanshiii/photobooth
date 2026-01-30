"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCamera } from "./useCamera";
import CameraView from "./CameraView";
import CaptureButton from "./CaptureButton";
import CameraSurface from "../../../components/ui/CameraSurface";
import Surface from "../../../components/ui/Surface";
import Button from "../../../components/ui/Button";
import { Title, Subtitle, Body, Meta } from "../../../components/ui/Typography";
import { fadeUp } from "../../../components/ui/motion";
import { useBoothStore } from "@/store/boothStore";
import { useState } from "react";

export default function BoothPage() {
  const router = useRouter();
  const { videoRef } = useCamera();
  const { isMirrored, toggleMirror, setRawImage } = useBoothStore();
  const [flash, setFlash] = useState(false);

  function handleCapture(blob) {
    setFlash(true);
    setTimeout(() => setFlash(false), 120);
    setRawImage(blob);
    router.push("/editor");
  }

  return (
    <div className="relative min-h-screen bg-[#111827] text-white overflow-hidden">
      {/* Atmospheric background (motion-driven) */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [-40, 40], x: [-20, 20] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-emerald-500/12 blur-3xl rounded-full"
        />

        <motion.div
          animate={{ y: [30, -30], x: [20, -20] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-cyan-500/12 blur-3xl rounded-full"
        />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Context */}
        <motion.header
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <Meta>Step 1 · Capture</Meta>
          <Title className="mt-4">Set up your shot</Title>
          <Subtitle>
            We’ll take a clean, centered photo that you can edit next.
          </Subtitle>
        </motion.header>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-start">
          {/* Capture action */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col items-center gap-4 relative z-20"
          >
            <Surface className="p-5 rounded-full bg-white/20">
              <CaptureButton
                videoRef={videoRef}
                isMirrored={isMirrored}
                onCapture={handleCapture}
              />
            </Surface>

            <Body className="text-white/50 text-center">
              Press when you’re ready. You can retake if needed.
            </Body>
          </motion.div>

          {/* Guidance (lightweight, non-surface) */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="max-w-xl mx-auto mt-12 text-center"
          >
            <Meta>Guidelines</Meta>

            <Body className="mt-3 text-white/55">
              Position your face inside the frame. Make sure your eyes are visible and lighting is even.
            </Body>

            <div className="mt-6 flex justify-center">
              <Button variant="ghost" onClick={toggleMirror}>
                {isMirrored ? "Disable mirror" : "Enable mirror"}
              </Button>
            </div>
          </motion.aside>
        </div>

        {/* Capture action */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-col items-center gap-3 relative z-30"
        >
          <Surface className="p-5 rounded-full bg-white/20">
            <CaptureButton
              videoRef={videoRef}
              isMirrored={isMirrored}
              onCapture={handleCapture}
            />
          </Surface>

          <Body className="text-white/45 text-center">
            Press when you’re ready.
          </Body>
        </motion.div>

        {flash && (
          <div className="fixed inset-0 bg-white/90 pointer-events-none z-50" />
        )}
      </main>
    </div>
  );
}
