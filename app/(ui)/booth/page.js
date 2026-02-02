"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCamera } from "./useCamera";
import CameraView from "./CameraView";
import CaptureButton from "./CaptureButton";
import CameraSurface from "@/components/ui/CameraSurface";
import PhotoStrip from "@/components/ui/PhotoStrip";
import Button from "@/components/ui/Button";
import { Meta, Subtitle } from "@/components/ui/Typography";
import { useBoothStore } from "@/store/boothStore";
import FilterStrip from "@/components/ui/FilterStrip";

/* ───────── FILTER CSS MAP ───────── */

const FILTER_CSS_MAP = {
  natural: "brightness(1.08) contrast(1.05) saturate(1.1)",
  bw: "grayscale(1) contrast(1.25) brightness(1.1)",
  vintage: "sepia(0.6) contrast(1.2) brightness(0.9) saturate(1.4)",
  retro:
    "sepia(0.3) contrast(1.3) brightness(0.8) saturate(1.5) hue-rotate(-20deg)",
  cool: "brightness(1.05) contrast(1.15) saturate(0.85) hue-rotate(10deg)",
};

export default function BoothPage() {
  const router = useRouter();
  const { videoRef } = useCamera();
  const [activeFilterId, setActiveFilterId] = useState("natural");

  const {
    layout,
    frames,
    activeIndex,
    addCapturedImage,
    retakeCurrent,
    retakeAll,
    toggleMirror,
    isMirrored,
  } = useBoothStore();

  useEffect(() => {
    if (!layout) router.replace("/choose-layout");
  }, [layout, router]);

  if (!layout) return null;

  const isComplete = frames.every(Boolean);
  const hasAnyPhoto = frames.some(Boolean);
  const photoCount = frames.filter(Boolean).length;

  function handleCapture(blob) {
    if (blob) addCapturedImage(blob);
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* ───────── HEADER ───────── */}
      <header className="px-4 pt-8 pb-6 text-center">
        <Meta className="mb-2">
          {isComplete
            ? "Keepsake ready"
            : `Frame ${photoCount + 1} of ${layout.slots}`}
        </Meta>

        <Subtitle className="text-white/60">
          Try filters before capturing.
        </Subtitle>
      </header>

      {/* ───────── MAIN ───────── */}
      <main className="flex items-center justify-center px-4 pb-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 items-center">
          {/* STRIP */}
          <section className="order-2 lg:order-1 flex justify-center">
            <PhotoStrip
              frames={frames}
              activeIndex={activeIndex}
              slots={layout.slots}
            />
          </section>

          {/* CAMERA */}
          <section className="order-1 lg:order-2 flex flex-col items-center gap-6">
            <CameraSurface>
              <CameraView
                videoRef={videoRef}
                isMirrored={isMirrored}
                filter={FILTER_CSS_MAP[activeFilterId]}
              />
            </CameraSurface>

            {/* FILTER STRIP */}
            <FilterStrip
              activeFilter={activeFilterId}
              onChange={setActiveFilterId}
            />

            {!isComplete && (
              <CaptureButton
                videoRef={videoRef}
                isMirrored={isMirrored}
                filter={FILTER_CSS_MAP[activeFilterId]}
                onCapture={handleCapture}
              />
            )}

            {/* CONTROLS */}
            <div className="flex gap-2 flex-wrap justify-center">
              <Button variant="ghost" size="sm" onClick={toggleMirror}>
                {isMirrored ? "Disable mirror" : "Enable mirror"}
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={retakeCurrent}
                disabled={!hasAnyPhoto || isComplete}
              >
                Retake
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={retakeAll}
                disabled={!hasAnyPhoto}
              >
                Start over
              </Button>
            </div>
          </section>
        </div>
      </main>

      {/* ───────── FOOTER ───────── */}
      {isComplete && (
        <footer className="py-6 flex justify-center">
          <Button
            variant="primary"
            onClick={() => router.push("/editor")}
          >
            Continue
          </Button>
        </footer>
      )}
    </div>
  );
}
