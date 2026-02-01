"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCamera } from "./useCamera";
import CameraView from "./CameraView";
import CaptureButton from "./CaptureButton";
import CameraSurface from "../../../components/ui/CameraSurface";
import Surface from "../../../components/ui/Surface";
import Button from "../../../components/ui/Button";
import { Title, Subtitle, Body, Meta } from "../../../components/ui/Typography";
import { fadeUp } from "../../../components/ui/motion";
import { useBoothStore } from "@/store/boothStore";
import PhotoStrip from "@/components/ui/PhotoStrip";

export default function BoothPage() {
  const router = useRouter();
  const { videoRef } = useCamera();
  const [flash, setFlash] = useState(false);

  const {
    layout,
    capturedImages,
    activeIndex,
    addCapturedImage,
    setActiveIndex,
    retakeActive,
    toggleMirror,
    isMirrored,
  } = useBoothStore();

  // ⛔ Safety: no layout → go back
  useEffect(() => {
    if (!layout) {
      router.replace("/choose-layout");
    }
  }, [layout, router]);

  if (!layout) return null;

  function handleCapture(blob) {
    setFlash(true);
    setTimeout(() => setFlash(false), 120);

    addCapturedImage(blob);

    const nextImages = [...capturedImages];
    nextImages[activeIndex] = blob;

    const isDone = nextImages.every(Boolean);
    if (isDone) {
      router.push("/editor");
    }
  }

  return (
    <div className="relative min-h-screen bg-[#111827] text-white overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-40, 40], x: [-20, 20] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
          className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-emerald-500/12 blur-3xl rounded-full"
        />
        <motion.div
          animate={{ y: [30, -30], x: [20, -20] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "mirror" }}
          className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-cyan-500/12 blur-3xl rounded-full"
        />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.header
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Meta>
            Step {activeIndex + 1} · Capture ({layout.slots})
          </Meta>

          <Subtitle>
            Take photo {activeIndex + 1} of {layout.slots}
          </Subtitle>
        </motion.header>

        {/* Photo Strip */}
        <div className="mb-10">
          <PhotoStrip
            images={capturedImages}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            onRetake={retakeActive}
          />
        </div>

        {/* Camera Preview */}
        <div className="flex justify-center mb-16">
          <CameraSurface>
            <CameraView videoRef={videoRef} isMirrored={isMirrored} />
          </CameraSurface>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6">
          <Button variant="ghost" onClick={toggleMirror}>
            {isMirrored ? "Disable mirror" : "Enable mirror"}
          </Button>

          <Surface className="p-5 rounded-full bg-white/15">
            <CaptureButton
              videoRef={videoRef}
              isMirrored={isMirrored}
              onCapture={handleCapture}
            />
          </Surface>

          <Body>
            Photo {activeIndex + 1} of {layout.slots}
          </Body>
        </div>

        {flash && (
          <div className="fixed inset-0 bg-white/90 pointer-events-none z-50" />
        )}
      </main>
    </div>
  );
}
