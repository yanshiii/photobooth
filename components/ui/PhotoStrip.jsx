"use client";

import clsx from "clsx";

export default function PhotoStrip({
  frames,
  activeIndex,
  aspectRatio = 3 / 4, // width / height of each photo
}) {
  return (
    <div
      className="
        flex flex-col
        bg-white
        rounded-xl
        shadow-xl
        overflow-hidden
      "
    >
      {frames.map((frame, index) => (
        <div
          key={index}
          className={clsx(
            "relative w-full bg-zinc-100 border-b last:border-b-0",
            index === activeIndex && "ring-2 ring-emerald-500"
          )}
          style={{
            aspectRatio: aspectRatio,
          }}
        >
          {frame ? (
            <img
              src={URL.createObjectURL(frame)}
              alt={`Frame ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-sm">
              Photo {index + 1}
            </div>
          )}

          {/* Index badge */}
          <div className="absolute top-2 left-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded-full">
            {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
}
