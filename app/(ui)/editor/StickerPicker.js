"use client";

import { useState } from "react";
import { STRIP } from "@/styles/stripGeometry";
import { useBoothStore } from "@/store/boothStore";

const STICKERS = [
  { src: "/stickers/bouquet.png", category: "Nature" },
  { src: "/stickers/bowRed.png", category: "Fun" },
  { src: "/stickers/catWithGlasses.png", category: "Animals" },
  { src: "/stickers/club.png", category: "Symbols" },
  { src: "/stickers/diamond.png", category: "Symbols" },
  { src: "/stickers/discoBall.png", category: "Fun" },
  { src: "/stickers/dolphin.png", category: "Animals" },
  { src: "/stickers/fish.png", category: "Animals" },
  { src: "/stickers/flamingo.png", category: "Animals" },
  { src: "/stickers/flower.png", category: "Nature" },
  { src: "/stickers/flowerPink.png", category: "Nature" },
  { src: "/stickers/guitar.png", category: "Music" },
  { src: "/stickers/halloweenGhost.png", category: "Objects" },
  { src: "/stickers/headphones.png", category: "Music" },
  { src: "/stickers/heart.png", category: "Symbols" },
  { src: "/stickers/jellyFish.png", category: "Animals" },
  { src: "/stickers/koala.png", category: "Animals" },
  { src: "/stickers/koalaBear.png", category: "Animals" },
  { src: "/stickers/magicWand.png", category: "Fun" },
  { src: "/stickers/musicNote.png", category: "Music" },
  { src: "/stickers/musicTune.png", category: "Music" },
  { src: "/stickers/penguin.png", category: "Animals" },
  { src: "/stickers/rabbit.png", category: "Animals" },
  { src: "/stickers/snowman.png", category: "Objects" },
  { src: "/stickers/stars.png", category: "Nature" },
  { src: "/stickers/turtle.png", category: "Animals" },
  { src: "/stickers/Unicorn.png", category: "Animals" },
  { src: "/stickers/Watermelon.png", category: "Objects" },
];

const CATEGORIES = ["Fun", "Animals", "Nature", "Music", "Symbols", "Objects"];

function StickerRecentRow({ recent, onAdd }) {
  if (!recent.length) return null;

  return (
    <div className="space-y-2">
      <p className="label-text text-white/50">Recently used</p>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {recent.map((src) => (
          <button
            key={src}
            onClick={() => onAdd(src)}
            className="
              h-12 w-12
              flex-shrink-0
              rounded-xl
              bg-white/5
              border border-white/10
              flex items-center justify-center
              hover:bg-white/10
              transition
            "
          >
            <img
              src={src}
              alt="recent sticker"
              className="w-[70%] h-[70%] object-contain"
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function StickerPicker({ onAdd, selectSticker }) {
  const [activeCategory, setActiveCategory] = useState("Fun");
  const [recent, setRecent] = useState([]);

  const { frames } = useBoothStore();
  const frameCount = frames?.length || 3;

  function getStickerBaseSize() {
    if (frameCount === 1) return STRIP.WIDTH * 0.42;
    if (frameCount === 2) return STRIP.WIDTH * 0.32;
    return STRIP.WIDTH * 0.24;
  }

  function handleAdd(src) {
    const id = crypto.randomUUID();
    const BASE = getStickerBaseSize();

    onAdd({
      id,
      src,
      x: STRIP.WIDTH / 2 - BASE / 2,
      y: 80,
      width: BASE,
      height: BASE,
      rotation: 0,
    });

    setRecent((prev) => [src, ...prev.filter((s) => s !== src)].slice(0, 8));

    requestAnimationFrame(() => selectSticker?.(id));
  }

  const visible = STICKERS.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-5">
      {/* CATEGORIES */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs transition border ${
              activeCategory === cat
                ? "bg-[#ad2831]/30 text-[#F5F5DC] border-[#f2d9a6]/40"
                : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <StickerRecentRow recent={recent} onAdd={handleAdd} />

      {/* STICKER GRID */}
      <div className="grid grid-cols-5 sm:grid-cols-4 gap-3 sm:gap-5">
        {visible.map(({ src }) => (
          <button
            key={src}
            onClick={() => handleAdd(src)}
            className="
              aspect-square
              rounded-xl
              bg-white/5
              border border-white/10
              flex items-center justify-center
              transition
              hover:bg-white/12
            "
          >
            <img
              src={src}
              alt="sticker"
              className="w-[55%] h-[55%] sm:w-[65%] sm:h-[65%] object-contain"
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
