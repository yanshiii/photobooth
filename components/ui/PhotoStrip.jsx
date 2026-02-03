"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { STRIP } from "@/styles/stripGeometry";
import { useBoothStore } from "@/store/boothStore";

function FrameImage({ frame, alt }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (!(frame instanceof Blob)) return;
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
  const stripBackground = useBoothStore((s) => s.stripBackground);

  const stripRef = useRef(null);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!stripRef.current || !containerRef.current) return;

    const stripH = stripRef.current.offsetHeight;
    const containerH = containerRef.current.offsetHeight;

    setScale(stripH > containerH ? containerH / stripH : 1);
  }, [slots]);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center">
      <motion.div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        {/* STRIP PAPER */}
        <div
          ref={stripRef}
          className="shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          style={{
            width: STRIP.WIDTH,
            paddingLeft: STRIP.PADDING_X,
            paddingRight: STRIP.PADDING_X,
            paddingTop: STRIP.PADDING_TOP,
            paddingBottom: STRIP.PADDING_TOP,
            backgroundColor: stripBackground,
          }}
        >
          {/* FRAMES */}
          {Array.from({ length: slots }).map((_, i) => {
            const frame = frames[i];
            const isActive = i === activeIndex;

            return (
              <div key={i}>
                <div
                  className={`relative overflow-hidden ${
                    isActive ? "ring-2 ring-rose-900/80" : ""
                  }`}
                  style={{
                    width: STRIP.FRAME_WIDTH(),
                    height: STRIP.FRAME_HEIGHT(),
                    background: stripBackground,
                  }}
                >
                  {frame ? (
                    <FrameImage frame={frame} alt={`Frame ${i + 1}`} />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-500 text-xs tracking-widest">
                      FRAME {i + 1}
                    </div>
                  )}
                </div>

                {/* SEPARATOR */}
                {i !== slots - 1 && (
                  <div
                    style={{
                      height: STRIP.SEPARATOR,
                      background: stripBackground,
                    }}
                  />
                )}
              </div>
            );
          })}

          {/* BOTTOM MEMORY AREA */}
          <div
            style={{
              height: STRIP.BOTTOM_MEMORY_HEIGHT,
              background: stripBackground,
            }}
            className="flex items-center justify-center text-xs tracking-widest text-neutral-500"
          >
            YOUR MESSAGE
          </div>
        </div>
      </motion.div>
    </div>
  );
}
