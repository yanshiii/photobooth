"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useBoothStore } from "@/store/boothStore";
import KonvaStage from "./KonvaStage";
import StickerPicker from "./StickerPicker";
import { useKonvaExport } from "./useKonvaExport";
import Button from "@/components/ui/Button";

export default function EditorPage() {
  const router = useRouter();
  const stageRef = useRef(null);

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
        <p>No images captured</p>
      </div>
    );
  }

  const { exportImage } = useKonvaExport(stageRef);

  async function handleDone() {
    const blob = await exportImage();
    setFinalImage(blob);
    router.push("/result");
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* HEADER */}
      <header className="px-6 pt-12 pb-10 text-center">
        <h1 className="font-display text-4xl sm:text-5xl mb-3">
          Customize your strip
        </h1>
        <p className="text-white/50 text-sm">
          Add stickers and refine your final look.
        </p>
      </header>

      {/* MAIN */}
      <main className="flex-1 px-6 pb-8">
        <div
          className="
            h-full
            max-w-[1200px]
            mx-auto
            grid grid-cols-1
            lg:grid-cols-[420px_1fr]
            gap-16
            items-center
          "
        >
          {/* LEFT: PHOTO STRIP */}
          <section className="relative flex justify-center items-center h-full">
            {/* Halo */}
            <div className="absolute -inset-16 bg-rose-950/15 blur-3xl -z-10" />

            {/* TRUE bounded viewport */}
            <div className="h-full max-h-[calc(100vh-220px)] flex items-center justify-center">
              <KonvaStage
                stageRef={stageRef}
                frames={frames}
                stickers={stickers}
                onUpdate={updateSticker}
                selectedStickerId={selectedStickerId}
                onSelect={selectSticker}
                onClearSelection={clearSelection}
                onDelete={deleteSticker}
              />
            </div>
          </section>

          {/* RIGHT — STICKERS */}
          <aside className="flex flex-col gap-8">
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <h3 className="font-display text-lg mb-6">Stickers</h3>
              <StickerPicker onAdd={addSticker} selectSticker={selectSticker} />
            </div>

            <div className="hidden lg:flex flex-col gap-4">
              <Button variant="ghost" onClick={() => router.back()}>
                Back
              </Button>
              <Button variant="primary" onClick={handleDone}>
                Continue
              </Button>
            </div>
          </aside>
        </div>
      </main>

      {/* MOBILE ACTIONS */}
      <footer className="lg:hidden py-8 flex justify-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          Back
        </Button>
        <Button variant="primary" onClick={handleDone}>
          Continue
        </Button>
      </footer>
    </div>
  );
}