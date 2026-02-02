import { useState } from "react";
import { FRAME_WIDTH } from "@/styles/frame";
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

export default function StickerPicker({ onAdd, selectSticker }) {
  const [activeCategory, setActiveCategory] = useState("Fun");
  const [recent, setRecent] = useState([]);

  const { frames } = useBoothStore();
  const frameCount = frames?.length || 3;

  function getStickerBaseSize() {
    if (frameCount === 1) return FRAME_WIDTH * 0.42;
    if (frameCount === 2) return FRAME_WIDTH * 0.32;
    return FRAME_WIDTH * 0.24;
  }

  function handleAdd(src) {
    const id = crypto.randomUUID();
    const BASE = getStickerBaseSize();

    onAdd({
      id,
      src,
      x: FRAME_WIDTH / 2 - BASE / 2,
      y: 80,
      width: BASE,
      height: BASE,
      rotation: 0,
    });

    // update recently used
    setRecent((prev) => {
      const next = prev.filter((s) => s !== src);
      return [src, ...next].slice(0, 8);
    });

    requestAnimationFrame(() => selectSticker?.(id));
  }

  const visible = STICKERS.filter(
    (s) => s.category === activeCategory
  );

  return (
    <div className="space-y-7">
      {/* ───────── RECENTLY USED ───────── */}
      {recent.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-white/40">
            Recently used
          </p>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {recent.map((src) => (
              <button
                key={src}
                onClick={() => handleAdd(src)}
                className="
                  h-14 w-14
                  flex-shrink-0
                  rounded-xl
                  bg-neutral-900/40
                  border border-neutral-700/25
                  flex items-center justify-center
                  hover:bg-neutral-800/60
                  hover:border-rose-900/40
                  transition-all
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
      )}

      {/* ───────── CATEGORY TABS ───────── */}
      <div className="flex flex-wrap gap-2.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-5 py-2 rounded-full text-sm tracking-wide
              transition-all duration-200
              ${
                activeCategory === cat
                  ? "bg-rose-900/80 text-neutral-100 shadow-lg shadow-rose-950/40"
                  : "bg-neutral-900/50 text-neutral-400 hover:bg-neutral-800/60 hover:text-neutral-200 border border-neutral-700/30"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ───────── STICKER GRID ───────── */}
      <div
        className="
          grid
          grid-cols-4
          gap-6
        "
      >
        {visible.map(({ src }) => (
          <button
            key={src}
            onClick={() => handleAdd(src)}
            className="
              aspect-square
              rounded-2xl
              bg-neutral-900/35
              border border-neutral-700/25
              flex items-center justify-center
              hover:bg-neutral-800/55
              hover:border-rose-900/40
              hover:scale-105
              transition-all
              duration-200
            "
          >
            <img
              src={src}
              alt="sticker"
              className="w-[65%] h-[65%] object-contain"
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
}


