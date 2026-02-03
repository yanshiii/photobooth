"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useBoothStore } from "@/store/boothStore";
import KonvaStage from "./KonvaStage";
import StickerPicker from "./StickerPicker";
import { useKonvaExport } from "./useKonvaExport";
import Button from "@/components/ui/Button";
import StripColorPicker from "@/components/ui/StripColorPicker";
import StripTextControls from "@/components/ui/StripTextControls";

export default function EditorPage() {
  const router = useRouter();
  const stageRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const {
    frames,
    stickers,
    addSticker,
    updateSticker,
    setFinalImage,
    selectedStickerId,
    selectSticker,
    clearSelection,
    deleteSticker,
  } = useBoothStore();

  if (!frames || frames.every((img) => img === null)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/60">
        No images captured
      </div>
    );
  }

  const { exportImage } = useKonvaExport(stageRef);

  async function handleDone() {
    if (!stageRef.current) {
      console.error("Stage ref missing");
      return;
    }

    setIsExporting(true);
    await new Promise((r) => requestAnimationFrame(r));

    const blob = await exportImage();
    if (!blob) {
      console.error("Export failed");
      setIsExporting(false);
      return;
    }

    setFinalImage(blob);
    setIsExporting(false);
    router.push("/result");
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* HEADER */}
      <header className="px-6 pt-10 pb-8 text-center">
        <h1 className="font-display text-4xl sm:text-5xl mb-2">
          Customize your strip
        </h1>
        <p className="text-white/50 text-sm">
          Add stickers and refine your final look.
        </p>
      </header>

      {/* MAIN */}
      <main className="px-4 pb-10">
        <div
          className="
            max-w-[1200px]
            mx-auto
            grid
            grid-cols-1
            lg:grid-cols-[420px_1fr]
            gap-12
            items-start
          "
        >
          {/* LEFT — STRIP */}
          <section className="flex justify-center">
            <div className="max-h-[calc(100vh-220px)] flex items-center justify-center">
              <KonvaStage
                stageRef={stageRef}
                frames={frames}
                stickers={stickers}
                onUpdate={updateSticker}
                selectedStickerId={selectedStickerId}
                onSelect={selectSticker}
                onClearSelection={clearSelection}
                onDelete={deleteSticker}
                isExporting={isExporting}
              />
            </div>
          </section>

          {/* RIGHT — CONTROLS */}
          <aside className="flex flex-col gap-8">
            {/* STRIP COLOR */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <StripColorPicker />
            </div>

            {/* TEXT / DATE */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4">
                Text Style
              </h3>
              <StripTextControls />
            </div>

            {/* STICKERS */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4">
                Stickers
              </h3>

              {/* Scroll only on small screens */}
              <div className="max-h-[260px] sm:max-h-none overflow-y-auto scrollbar-hide pr-1">
                <StickerPicker
                  onAdd={addSticker}
                  selectSticker={selectSticker}
                />
              </div>
            </div>

            {/* DESKTOP ACTIONS */}
            <div className="hidden lg:flex flex-col gap-3 pt-2">
              <Button variant="primary" onClick={handleDone}>
                Continue
              </Button>
              <Button variant="ghost" onClick={() => router.back()}>
                Back
              </Button>
            </div>
          </aside>

        </div>
      </main>

      {/* MOBILE ACTIONS */}
      <footer className="lg:hidden fixed bottom-0 inset-x-0 bg-black/40 backdrop-blur-md border-t border-white/10 px-4 py-4 flex gap-3">
        <Button variant="ghost" onClick={() => router.back()} className="flex-1">
          Back
        </Button>
        <Button variant="primary" onClick={handleDone} className="flex-1">
          Continue
        </Button>
      </footer>
    </div>
  );
}
