"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function FrameImage({ frame, alt }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (!(frame instanceof Blob || frame instanceof File)) return;

    const url = URL.createObjectURL(frame);
    setSrc(url);

    return () => URL.revokeObjectURL(url);
  }, [frame]);

  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

export default function PhotoStrip({ frames, activeIndex, slots }) {
  const stripRef = useRef(null);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!stripRef.current || !containerRef.current) return;

    const stripHeight = stripRef.current.offsetHeight;
    const containerHeight = containerRef.current.offsetHeight;

    if (stripHeight > containerHeight) {
      setScale(containerHeight / stripHeight);
    } else {
      setScale(1);
    }
  }, [slots]);

  return (
    <div
      ref={containerRef}
      className="h-full flex items-center justify-center"
    >
      <motion.div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        {/* Paper strip */}
        <div
          ref={stripRef}
          className="
            bg-neutral-50
            p-6
            shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          "
          style={{ width: "280px" }}
        >
          <div className="flex flex-col gap-5">
            {Array.from({ length: slots }).map((_, index) => {
              const frame = frames[index];
              const isActive = index === activeIndex;

              return (
                <div key={index}>
                  <div
                    className={`
                      relative aspect-[3/4] overflow-hidden
                      bg-[#3d2428]
                      ${isActive ? "ring-2 ring-rose-900/80" : ""}
                    `}
                  >
                    {frame ? (
                      <FrameImage
                        frame={frame}
                        alt={`Frame ${index + 1}`}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-neutral-500 text-xs tracking-widest">
                        FRAME {index + 1}
                      </div>
                    )}
                  </div>

                  {index !== slots - 1 && (
                    <div className="h-3 bg-neutral-50" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
