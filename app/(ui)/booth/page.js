"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCamera } from "./useCamera";
import CameraView from "./CameraView";
import CaptureButton from "./CaptureButton";
import CameraSurface from "@/components/ui/CameraSurface";
import PhotoStrip from "@/components/ui/PhotoStrip";
import Button from "@/components/ui/Button";
import { useBoothStore } from "@/store/boothStore";
import FilterStrip from "@/components/ui/FilterStrip";

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

  useEffect(() => {
    console.log("LAYOUT:", layout);
  }, [layout]);

  if (!layout) return null;

  const isComplete = frames.every(Boolean);
  const hasAnyPhoto = frames.some(Boolean);
  const photoCount = frames.filter(Boolean).length;

  async function handleCapture(blob) {
    if (!blob) return;

    addCapturedImage(blob);

    if (!layout?.sessionId) {
      console.warn("No sessionId — capture stored locally only");
      return;
    }

    const formData = new FormData();
    formData.append("index", activeIndex);
    formData.append("image", blob);

    try {
      const res = await fetch(`/api/session/${layout.sessionId}/capture`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Capture upload failed", text);
        return;
      }

      const data = await res.json();

      if (data.done) {
        router.push("/editor");
      }
    } catch (err) {
      console.error("Capture upload failed", err);
    }
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background layers */}
      <div className="ruby-animated-bg" />
      <div className="ruby-circles">
        <div className="ruby-circle xl ruby-950 -top-1/4 -left-1/4" />
        <div className="ruby-circle lg ruby-900 top-0 right-0" />
        <div className="ruby-circle md ruby-800 bottom-0 left-1/4" />
        <div className="ruby-circle sm ruby-700 top-1/2 right-1/4" />
      </div>
      <div className="film-grain" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(252,217,166,0.08),rgba(0,0,0,0))]" />

      {/* HEADER */}
      <header className="relative z-10 px-4 pt-10 pb-8 text-center">
        <p className="label-text text-[#F5F5DC]/70 mb-3 tracking-[0.18em]">
          {isComplete
            ? "KEEPSAKE READY"
            : `FRAME ${photoCount + 1} OF ${layout.slots}`}
        </p>
        <p className="subtitle mx-auto text-[#F5F5DC]/80 text-[clamp(1rem,1.6vw,1.25rem)]">
          Try filters before capturing.
        </p>
        <p className="label-text text-white/50 mt-4">
          Step 2 of 4 — Capture your frames
        </p>
        <p className="font-body text-white/40 text-xs mt-2 tracking-wide">
          Each capture advances to the next frame automatically.
        </p>
      </header>

      {/* MAIN */}
      <main className="relative z-10 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 items-start">
          {/* STRIP */}
          <section className="order-2 lg:order-1 flex justify-center">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.7)]">
              <PhotoStrip
                frames={frames}
                activeIndex={activeIndex}
                slots={layout.slots}
              />
            </div>
          </section>

          {/* CAMERA */}
          <section className="order-1 lg:order-2 flex flex-col items-center gap-7 lg:pt-8">
            <div className="relative w-full max-w-xl">
              {/* Soft glow behind live camera */}
              <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-[radial-gradient(60%_60%_at_50%_30%,rgba(242,217,166,0.18),rgba(122,46,53,0.18),rgba(0,0,0,0))] blur-2xl" />
              <CameraSurface>
                <CameraView
                  videoRef={videoRef}
                  isMirrored={isMirrored}
                  filter={FILTER_CSS_MAP[activeFilterId]}
                />
              </CameraSurface>
            </div>

            {/* FILTER STRIP */}
            <FilterStrip
              activeFilter={activeFilterId}
              onChange={setActiveFilterId}
            />

            {!isComplete && (
              <div className="flex flex-col items-center gap-8">
                <CaptureButton
                  videoRef={videoRef}
                  isMirrored={isMirrored}
                  filter={FILTER_CSS_MAP[activeFilterId]}
                  onCapture={handleCapture}
                />
              </div>
            )}

            {/* CONTROLS */}
            <div className="mt-4 flex gap-2 flex-wrap justify-center">
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

      {/* FOOTER */}
      {isComplete && (
        <footer className="relative z-10 py-6 flex justify-center">
          <Button variant="primary" onClick={() => router.push("/editor")}> 
            Continue
          </Button>
        </footer>
      )}
    </div>
  );
}
