"use client";

export default function PhotoStrip({
  images,
  activeIndex,
  onSelect,
  onRetake,
}) {
  return (
    <div className="flex gap-3 justify-center items-center">
      {images.map((img, idx) => {
        const isActive = idx === activeIndex;

        return (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`
              relative h-20 w-14 rounded-lg overflow-hidden
              border transition-all
              ${isActive
                ? "border-emerald-400 ring-2 ring-emerald-400/40"
                : "border-white/20 opacity-70 hover:opacity-100"}
            `}
          >
            {img ? (
              <img
                src={URL.createObjectURL(img)}
                alt={`Photo ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-white/5 text-white/40 text-sm">
                {idx + 1}
              </div>
            )}

            {img && isActive && onRetake && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRetake();
                }}
                className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded px-1.5 py-0.5"
              >
                Retake
              </button>
            )}
          </button>
        );
      })}
    </div>
  );
}
