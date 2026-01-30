"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useBoothStore } from "@/store/boothStore";
import KonvaStage from "./KonvaStage";
import StickerPicker from "./StickerPicker";
import { useKonvaExport } from "./useKonvaExport";

export default function EditorPage() {
  const router = useRouter();
  const stageRef = useRef(null);

  const {
    rawImage,
    stickers,
    addSticker,
    updateSticker,
    setFinalImage,
    selectedStickerId,
    selectSticker,
    clearSelection,
    deleteSticker,
  } = useBoothStore();

  const { exportImage } = useKonvaExport(stageRef);

  async function handleDone() {
    const blob = await exportImage();
    setFinalImage(blob);
    router.push("/result");
  }

  if (!rawImage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-zinc-600">No image captured</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-zinc-50 to-zinc-100 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent">
            Customize Your Photo
          </h1>
          <p className="text-zinc-600">Add stickers and make it uniquely yours</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 animate-slideUp">
          {/* Canvas Container */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-900/5">
                <KonvaStage
                  stageRef={stageRef}
                  imageBlob={rawImage}
                  stickers={stickers}
                  onUpdate={updateSticker}
                  selectedStickerId={selectedStickerId}
                  onSelect={selectSticker}
                  onClearSelection={clearSelection}
                  onDelete={deleteSticker}
                />
              </div>
            </div>
          </div>

          {/* Sticker Picker Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg shadow-zinc-900/5 animate-fadeIn" style={{ animationDelay: "200ms" }}>
            <h3 className="font-semibold text-lg text-zinc-900 mb-4">Add Stickers</h3>
            <StickerPicker onAdd={addSticker} />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 animate-fadeIn" style={{ animationDelay: "300ms" }}>
            <button
              onClick={() => router.back()}
              className="rounded-full px-6 py-3 bg-white text-zinc-700 font-medium shadow-lg shadow-zinc-900/5 hover:shadow-xl hover:bg-zinc-50 transition-all duration-300 ring-1 ring-zinc-900/5"
            >
              ← Back
            </button>
            
            <button
              onClick={handleDone}
              className="group relative overflow-hidden rounded-full px-8 py-3 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white font-medium shadow-lg shadow-zinc-900/20 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/30 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Continue
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}