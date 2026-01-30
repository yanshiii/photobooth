const STICKERS = [
  "/stickers/1F41F Color OpenMoji.png",
  "/stickers/Cat With Glasses Meme Sticker Illustration.png",
  "/stickers/Color Emoji 1F3AD.png",
  "/stickers/Color Emoji 1F3B8.png",
  "/stickers/Color Emoji from OpenMoji (1).png",
  "/stickers/Color Emoji from OpenMoji (2).png",
  "/stickers/Color Emoji from OpenMoji (3).png",
  "/stickers/Color Emoji from OpenMoji (4).png",
  "/stickers/Color Emoji from OpenMoji (5).png",
  "/stickers/Color Emoji from OpenMoji (6).png",
  "/stickers/Color Emoji from OpenMoji (7).png",
  "/stickers/Color Emoji from OpenMoji (8).png",
  "/stickers/Color Emoji from OpenMoji (9).png",
  "/stickers/Color Emoji from OpenMoji (10).png",
  "/stickers/Color Emoji from OpenMoji (11).png",
  "/stickers/Color Emoji from OpenMoji (12).png",
  "/stickers/Color Emoji from OpenMoji (13).png",
  "/stickers/Color Emoji from OpenMoji.png",
  "/stickers/Color OpenMoji.png",
  "/stickers/Cute Kawaii Abstract Symbol Sticker Doodle.png",
  "/stickers/F3BC Color Emoji (1).png",
  "/stickers/F3BC Color Emoji.png",
  "/stickers/Fat Cat Standing Meme Sticker Illustration.png",
  "/stickers/Halloween Ghost Icon.png",
  "/stickers/OpenMoji 1F3A7 Color.png",
  "/stickers/OpenMoji 1F3B5 Color.png",
  "/stickers/OpenMoji 1F9A5 Color.png",
  "/stickers/OpenMoji 1F41F Color.png",
  "/stickers/OpenMoji 1F300 Color.png",
  "/stickers/OpenMoji 1F380 Color.png",
  "/stickers/OpenMoji 1F422 Color.png",
  "/stickers/OpenMoji Cat Face.png",
  "/stickers/OpenMoji Color 1F9A5.png",
  "/stickers/OpenMoji Color 1F9A6.png",
  "/stickers/OpenMoji Color 1F407.png",
  "/stickers/OpenMoji Color 1F984.png",
  "/stickers/OpenMoji Color Icon (1).png",
  "/stickers/OpenMoji Color Icon (2).png",
  "/stickers/OpenMoji Color Icon.png",
  "/stickers/OpenMoji Color.png",
  "/stickers/OpenMoji Flower Icon (1).png",
  "/stickers/OpenMoji Flower Icon.png",
  "/stickers/Watermelon Icon Pack.png",
];

export default function StickerPicker({ onAdd }) {
  function handleAdd(src) {
    onAdd({
      id: crypto.randomUUID(),
      src,
      x: 100,
      y: 100,
      width: 120,
      height: 120,
      rotation: 0,
    });
  }

  return (
    <div className="relative">
      {/* Gradient fade on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white/80 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/80 to-transparent pointer-events-none z-10" />
      
      <div className="flex gap-3 overflow-x-auto py-2 px-2 scrollbar-hide">
        {STICKERS.map((src, index) => (
          <button
            key={src}
            onClick={() => handleAdd(src)}
            style={{ animationDelay: `${index * 20}ms` }}
            className="group relative flex-shrink-0 h-16 w-16 rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 p-2 shadow-md shadow-zinc-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/10 hover:scale-110 active:scale-95 ring-1 ring-zinc-900/5 hover:ring-2 hover:ring-emerald-500/50 animate-fadeIn"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition-all duration-300" />
            
            <img
              src={src}
              alt="sticker"
              className="relative z-10 h-full w-full object-contain transition-transform duration-300 group-hover:rotate-12"
            />
          </button>
        ))}
      </div>
    </div>
  );
}