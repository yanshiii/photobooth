// "use client";

// import { useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useBoothStore } from "@/store/boothStore";
// import KonvaStage from "./KonvaStage";
// import StickerPicker from "./StickerPicker";
// import { useKonvaExport } from "./useKonvaExport";
// import Button from "@/components/ui/Button";
// import StripColorPicker from "@/components/ui/StripColorPicker";
// import StripTextControls from "@/components/ui/StripTextControls";

// export default function EditorPage() {
//   const router = useRouter();
//   const stageRef = useRef(null);
//   const [isExporting, setIsExporting] = useState(false);
//   const [openPanel, setOpenPanel] = useState("color");

//   const {
//     frames,
//     stickers,
//     addSticker,
//     updateSticker,
//     setFinalImage,
//     selectedStickerId,
//     selectSticker,
//     clearSelection,
//     deleteSticker,
//   } = useBoothStore();

//   if (!frames || frames.every((img) => img === null)) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white/60 font-body">
//         No images captured
//       </div>
//     );
//   }

//   const { exportImage } = useKonvaExport(stageRef);

//   async function exportAndUpload() {
//     const blob = await exportImage();
//     if (!blob) return {};

//     const formData = new FormData();
//     formData.append("image", blob);

//     let res;
//     try {
//       res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });
//     } catch (err) {
//       return {};
//     }

//     if (!res.ok) return {};
//     return await res.json();
//   }

//   async function handleDone() {
//     setIsExporting(true);
//     await new Promise((r) => requestAnimationFrame(r));
//     const { key } = await exportAndUpload();
//     if (!key) {
//       setIsExporting(false);
//       return;
//     }
//     setFinalImage(key);
//     setIsExporting(false);
//     router.push("/result");
//   }

//   return (
//     <div className="h-screen flex flex-col text-white relative overflow-hidden bg-[#0d0706]">
//       {/* Subtle ruby gradient (no concentric circles) */}
//       <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_40%_0%,rgba(122,46,53,0.22),rgba(13,7,6,0.9))]" />
//       <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,7,6,0.2),rgba(13,7,6,0.95))]" />

//       {/* Mobile heading */}
//       <header className="flex-none px-6 pt-6 pb-2 text-center lg:hidden">
//         <h1 className="font-display text-3xl uppercase tracking-wider mb-2 text-[#F5F5DC]">
//           Customize Your Strip
//         </h1>
//         <p className="font-accent text-[#F5F5DC]/70 text-sm tracking-wide">
//           Refine your strip with color, text, and stickers.
//         </p>
//       </header>

//       <main className="flex-1 min-h-0 px-4 pb-24 lg:pb-8 pt-2 lg:overflow-hidden">
//         <div
//           className="
//             max-w-[1400px]
//             mx-auto
//             grid
//             grid-cols-1
//             lg:grid-cols-[1.45fr_360px]
//             gap-8
//             lg:gap-12
//             items-stretch
//             h-full
//             min-h-0
//           "
//         >
//           {/* LEFT — STRIP (SCALED HERO CONTAINER) */}
//           <section className="flex justify-center items-center h-full min-h-0 relative order-2 lg:order-1">
//             <div className="w-full h-full max-h-full flex items-center justify-center p-2">
//                <div className="relative w-full h-full flex items-center justify-center">
//                 <KonvaStage
//                   stageRef={stageRef}
//                   frames={frames}
//                   stickers={stickers}
//                   onUpdate={updateSticker}
//                   selectedStickerId={selectedStickerId}
//                   onSelect={selectSticker}
//                   onClearSelection={clearSelection}
//                   onDelete={deleteSticker}
//                   isExporting={isExporting}
//                 />
//                </div>
//             </div>
//           </section>

//           {/* RIGHT — CONTROLS */}
//           <aside className="relative z-10 flex flex-col gap-4 min-h-0 overflow-hidden order-1 lg:order-2">
//             {/* Right column heading (desktop) */}
//             <div className="hidden lg:block pb-2">
//               <p className="label-text text-white/60 mb-2">Final Touches</p>
//               <h2 className="font-display text-2xl uppercase tracking-wider text-[#F5F5DC] mb-1">
//                 Customize Your Strip
//               </h2>
//               <p className="font-accent text-[#F5F5DC]/70 text-sm">
//                 Edit color, text, and stickers below.
//               </p>
//             </div>
//             <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 flex flex-col gap-4">
              
//               <div className="flex-none bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-4">
//                 <button
//                   type="button"
//                   onClick={() => setOpenPanel(openPanel === "color" ? "" : "color")}
//                   className="w-full flex items-center justify-between text-left"
//                 >
//                   <span className="label-text text-white/60 font-accent uppercase tracking-tighter">Strip Color</span>
//                   <span className="text-white/40 text-[10px] tracking-widest font-mono">
//                     {openPanel === "color" ? "CLOSE" : "EDIT"}
//                   </span>
//                 </button>
//                 <div className={`transition-all duration-500 ${openPanel === "color" ? "max-h-96 opacity-100 pt-4 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"}`}>
//                   <div className="pr-1">
//                     <StripColorPicker />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex-none bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-4">
//                 <button
//                   type="button"
//                   onClick={() => setOpenPanel(openPanel === "text" ? "" : "text")}
//                   className="w-full flex items-center justify-between text-left"
//                 >
//                   <span className="label-text text-white/60 font-accent uppercase tracking-tighter">Text Style</span>
//                   <span className="text-white/40 text-[10px] tracking-widest font-mono">
//                     {openPanel === "text" ? "CLOSE" : "EDIT"}
//                   </span>
//                 </button>
//                 <div className={`transition-all duration-500 ${openPanel === "text" ? "max-h-[300px] opacity-100 pt-4 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"}`}>
//                   <div className="pr-1">
//                     <StripTextControls />
//                   </div>
//                 </div>
//               </div>

//               <div className={`flex-1 min-h-0 bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-4 flex flex-col transition-all duration-300 ${openPanel === "stickers" ? "grow" : "grow-0"}`}>
//                 <button
//                   type="button"
//                   onClick={() => setOpenPanel(openPanel === "stickers" ? "" : "stickers")}
//                   className="w-full flex items-center justify-between text-left flex-none"
//                 >
//                   <span className="label-text text-white/60 font-accent uppercase tracking-tighter">Stickers</span>
//                   <span className="text-white/40 text-[10px] tracking-widest font-mono">
//                     {openPanel === "stickers" ? "CLOSE" : "EDIT"}
//                   </span>
//                 </button>
//                 <div className={`flex-1 min-h-0 transition-all duration-500 ${openPanel === "stickers" ? "opacity-100 pt-4" : "max-h-0 opacity-0 overflow-hidden"}`}>
//                   <div className="max-h-[280px] lg:max-h-[220px] overflow-y-auto scrollbar-hide pr-1">
//                     <StickerPicker onAdd={addSticker} selectSticker={selectSticker} />
//                   </div>
//                 </div>
//               </div>

//             </div>

//             <div className="hidden lg:flex flex-none flex-col gap-3 pt-4 border-t border-white/5">
//               <Button variant="primary" onClick={handleDone}>Continue</Button>
//               <Button variant="ghost" onClick={() => router.back()}>Back</Button>
//             </div>
//           </aside>
//         </div>
//       </main>

//       <footer className="lg:hidden fixed bottom-0 inset-x-0 bg-black/60 backdrop-blur-xl border-t border-white/10 px-4 py-4 flex gap-3 z-50">
//         <Button variant="ghost" onClick={() => router.back()} className="flex-1">Back</Button>
//         <Button variant="primary" onClick={handleDone} className="flex-1">Continue</Button>
//       </footer>
//     </div>
//   );
// }

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
  const [openPanel, setOpenPanel] = useState("color");

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
      <div className="min-h-screen flex items-center justify-center text-white/60 font-body">
        No images captured
      </div>
    );
  }

  const { exportImage } = useKonvaExport(stageRef);

  async function exportAndUpload() {
    const blob = await exportImage();
    if (!blob) return {};

    const formData = new FormData();
    formData.append("image", blob);

    let res;
    try {
      res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      return {};
    }

    if (!res.ok) return {};
    return await res.json();
  }

  async function handleDone() {
    setIsExporting(true);
    await new Promise((r) => requestAnimationFrame(r));
    const { key } = await exportAndUpload();
    if (!key) {
      setIsExporting(false);
      return;
    }
    setFinalImage(key);
    setIsExporting(false);
    router.push("/result");
  }

  return (
<div className="h-screen flex flex-col text-white relative overflow-hidden bg-[#0d0706]">
  
  {/* 1. Base Image & Heart Glow */}
  <div
    className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(70%_60%_at_50%_35%,rgba(242,217,166,0.15),rgba(122,46,53,0.25),transparent)]"
    style={{
      backgroundImage: "url('/backgrounds/editorbg.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundBlendMode: "overlay", // Merges the gradient and image for depth
    }}
  />
  {/* 2. ENHANCED VINTAGE GRAIN LAYER */}
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-screen"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
    }}
  />

  {/* 3. SECONDARY TEXTURE (Dust & Scratches feel) */}
  <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

  {/* 4. Deep Vignette - Enhanced to dim background more */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(13,7,6,0)_20%,rgba(13,7,6,0.65)_60%,rgba(13,7,6,0.9)_100%)]" />
  {/* Film rails: topmost decorative layer */}
  <div className="film-rail left z-[5]" />
  <div className="film-rail right z-[5]" />
      {/* Mobile heading */}
      <header className="flex-none px-6 pt-10 pb-4 text-center lg:hidden relative z-10">
        <h1 className="font-display text-3xl uppercase tracking-wider mb-2 text-[#F5F5DC]">
          Customize Your Strip
        </h1>
        <p className="font-accent text-[#F5F5DC]/70 text-sm tracking-wide">
          Refine your strip with color, text, and stickers.
        </p>
      </header>

      <main className="flex-1 min-h-0 px-4 pb-24 lg:pb-8 pt-6 lg:pt-6 lg:overflow-hidden relative z-10">
        <div
          className="
            max-w-[1400px]
            mx-auto
            grid
            grid-cols-1
            lg:grid-cols-[0.9fr_360px]
            gap-8
            lg:gap-12
            items-stretch
            h-full
            min-h-0
          "
        >
          {/* LEFT — STRIP (SCALED HERO CONTAINER) */}
          <section className="flex justify-center items-center h-full min-h-0 relative order-2 lg:order-1">
            <div className="w-full h-full max-h-full flex items-center justify-center p-2">
               <div className="relative w-full h-full flex items-center justify-center">
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
            </div>
          </section>

          {/* RIGHT — CONTROLS */}
          <aside className="relative z-10 flex flex-col gap-4 min-h-0 overflow-hidden order-1 lg:order-2">
            {/* Right column heading (desktop) */}
            <div className="hidden lg:block text-left">
              <h2 className="h2 tracking-wider text-[#F5F5DC] mb-1">
                Customize Your Strip
              </h2>
              <p className="subtitle text-[#F5F5DC]/65 text-xs">
                color, text, and stickers
              </p>
              <p className="font-body text-white/45 text-xs mt-2">
                Step 3 of 4 — Style your strip
              </p>
              <p className="font-body text-white/35 text-xs mt-1">
                Tip: pick a style first, then add stickers.
              </p>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 flex flex-col gap-4">
              
              <div className="flex-none bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-4">
                <button
                  type="button"
                  onClick={() => setOpenPanel(openPanel === "color" ? "" : "color")}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="label-text text-white/60 font-accent uppercase tracking-tighter">Strip Color</span>
                  <span className="text-white/40 text-[10px] tracking-widest font-mono">
                    {openPanel === "color" ? "CLOSE" : "EDIT"}
                  </span>
                </button>
                <div className={`transition-all duration-500 ${openPanel === "color" ? "max-h-96 opacity-100 pt-4 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"}`}>
                  <div className="pr-1">
                    <StripColorPicker />
                  </div>
                </div>
              </div>

              <div className="flex-none bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-4">
                <button
                  type="button"
                  onClick={() => setOpenPanel(openPanel === "text" ? "" : "text")}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="label-text text-white/60 font-accent uppercase tracking-tighter">Text Style</span>
                  <span className="text-white/40 text-[10px] tracking-widest font-mono">
                    {openPanel === "text" ? "CLOSE" : "EDIT"}
                  </span>
                </button>
                <div className={`transition-all duration-500 ${openPanel === "text" ? "max-h-[300px] opacity-100 pt-4 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"}`}>
                  <div className="pr-1">
                    <StripTextControls />
                  </div>
                </div>
              </div>

              <div className="flex-none bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-4">
                <button
                  type="button"
                  onClick={() => setOpenPanel(openPanel === "stickers" ? "" : "stickers")}
                  className="w-full flex items-center justify-between text-left flex-none"
                >
                  <span className="label-text text-white/60 font-accent uppercase tracking-tighter">Stickers</span>
                  <span className="text-white/40 text-[10px] tracking-widest font-mono">
                    {openPanel === "stickers" ? "CLOSE" : "EDIT"}
                  </span>
                </button>
                <div className={`transition-all duration-500 ${openPanel === "stickers" ? "max-h-[320px] opacity-100 pt-4 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"}`}>
                  <div className="pr-1">
                    <StickerPicker onAdd={addSticker} selectSticker={selectSticker} />
                  </div>
                </div>
              </div>

            </div>

            <div className="hidden lg:flex flex-none flex-col gap-3 pt-4 border-t border-white/5">
              <Button variant="primary" onClick={handleDone}>Continue</Button>
              <Button variant="ghost" onClick={() => router.back()}>Back</Button>
            </div>
          </aside>
        </div>
      </main>

      <footer className="lg:hidden fixed bottom-0 inset-x-0 bg-black/60 backdrop-blur-xl border-t border-white/10 px-4 py-4 flex gap-3 z-50">
        <Button variant="ghost" onClick={() => router.back()} className="flex-1">Back</Button>
        <Button variant="primary" onClick={handleDone} className="flex-1">Continue</Button>
      </footer>
    </div>
  );
}
