"use client";

import {
  Stage,
  Layer,
  Image,
  Rect,
  Transformer,
  Group,
  Line,
  Text,
} from "react-konva";
import { useEffect, useRef, useState } from "react";
import { STRIP } from "@/styles/stripGeometry";
import {
  RotateIcon,
  DeleteIcon,
  HandleBackground,
  DeleteBackground,
} from "@/components/ui/StickerIcons";
import { useBoothStore } from "@/store/boothStore";

const DELETE_ZONE_HEIGHT = 60;

/* ================= STICKER ================= */

function StickerImage({
  sticker,
  onUpdate,
  onDelete,
  isSelected,
  onSelect,
  setIsDraggingSticker,
  paperHeight,
}) {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isOverDelete, setIsOverDelete] = useState(false);

  function attachTransformer() {
    const tr = trRef.current;
    const node = shapeRef.current;
    if (!tr || !node) return;
    tr.nodes([node]);
    tr.getLayer()?.batchDraw();
  }

  useEffect(() => {
    const img = new window.Image();
    img.src = sticker.src;
    img.onload = () => setImage(img);
  }, [sticker.src]);

  useEffect(() => {
    if (isSelected) requestAnimationFrame(attachTransformer);
  }, [isSelected, sticker.id]);

  if (!image) return null;

  const handleSelect = (e) => {
    e.cancelBubble = true;
    onSelect();
    requestAnimationFrame(attachTransformer);
  };

  return (
    <>
      <Image
        ref={shapeRef}
        image={image}
        x={sticker.x}
        y={sticker.y}
        width={sticker.width}
        height={sticker.height}
        rotation={sticker.rotation}
        draggable
        opacity={isOverDelete ? 0.6 : 1}
        shadowEnabled
        shadowColor={isOverDelete ? "#ef4444" : "#7f1d1d"}
        shadowBlur={isSelected ? 12 : 6}
        onClick={handleSelect}
        onTap={handleSelect}
        onDragStart={() => {
          setIsDragging(true);
          setIsDraggingSticker(true);
        }}
        onDragMove={(e) => {
          const bottom = e.target.y() + sticker.height;
          setIsOverDelete(bottom > paperHeight);
        }}
        onDragEnd={(e) => {
          setIsDragging(false);
          setIsDraggingSticker(false);
          setIsOverDelete(false);

          const bottom = e.target.y() + sticker.height;
          if (bottom > paperHeight) {
            onDelete(sticker.id);
            return;
          }

          onUpdate(sticker.id, {
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          onUpdate(sticker.id, {
            width: Math.max(30, node.width() * scaleX),
            height: Math.max(30, node.height() * scaleY),
            rotation: node.rotation(),
          });

          node.scaleX(1);
          node.scaleY(1);
        }}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
          anchorSize={10}
          borderStroke="#7f1d1d"
        />
      )}

      {isSelected && !isDragging && (
        <>
          <Group>
            <Line
              points={[
                sticker.x + sticker.width / 2,
                sticker.y,
                sticker.x + sticker.width / 2,
                sticker.y - 24,
              ]}
              stroke="#7f1d1d"
              dash={[3, 3]}
            />
            <Group
              x={sticker.x + sticker.width / 2}
              y={sticker.y - 28}
              draggable
              onDragMove={(e) => {
                const stage = e.target.getStage();
                const p = stage.getPointerPosition();
                if (!p) return;

                const cx = sticker.x + sticker.width / 2;
                const cy = sticker.y + sticker.height / 2;

                const angle =
                  (Math.atan2(p.y - cy, p.x - cx) * 180) / Math.PI;

                onUpdate(sticker.id, { rotation: angle + 90 });
              }}
              onDragEnd={(e) =>
                e.target.position({
                  x: sticker.x + sticker.width / 2,
                  y: sticker.y - 28,
                })
              }
            >
              <HandleBackground radius={11} />
              <RotateIcon x={-7} y={-7} />
            </Group>
          </Group>

          <Group
            x={sticker.x + sticker.width + 8}
            y={sticker.y - 8}
            onClick={() => onDelete(sticker.id)}
            onTap={() => onDelete(sticker.id)}
          >
            <DeleteBackground radius={11} />
            <DeleteIcon x={-7} y={-7} />
          </Group>
        </>
      )}
    </>
  );
}

/* ================= MAIN STAGE ================= */

export default function KonvaStage({
  stageRef,
  frames,
  stickers,
  onUpdate,
  selectedStickerId,
  onSelect,
  onClearSelection,
  onDelete,
  isExporting = false,
}) {
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [scale, setScale] = useState(1);
  const [isDraggingSticker, setIsDraggingSticker] = useState(false);

  const frameW = STRIP.FRAME_WIDTH();
  const frameH = STRIP.FRAME_HEIGHT();

  const paperWidth = STRIP.WIDTH;
  const paperHeight = STRIP.TOTAL_HEIGHT(frames.length);
  const deleteZoneY = paperHeight - DELETE_ZONE_HEIGHT;

  const stripBackground = useBoothStore((s) => s.stripBackground);
  const memoryText = useBoothStore((s) => s.memoryText);
  const memoryDateEnabled = useBoothStore((s) => s.memoryDateEnabled);
  const memoryTextColor = useBoothStore((s) => s.memoryTextColor);
  const memoryFont = useBoothStore((s) => s.memoryFont);
  const memoryAllCaps = useBoothStore((s) => s.memoryAllCaps);

  /* -------- FIX: DEFINE DATE FIRST -------- */
  const formattedDate = new Date().toLocaleDateString();

  const hasMessage = memoryText.trim().length > 0;
  const showDate = memoryDateEnabled;

  const finalMessage = memoryAllCaps
    ? memoryText.toUpperCase()
    : memoryText;

  const finalDate = memoryAllCaps
    ? formattedDate.toUpperCase()
    : formattedDate;

  const FONT_CONFIG = {
    Arial: { family: "Arial", size: 15, lineHeight: 1.15, letterSpacing: 0 },
    Inter: { family: "Inter", size: 14.5, lineHeight: 1.2, letterSpacing: 0 },
    "Courier New": {
      family: "Courier New",
      size: 15,
      lineHeight: 1.15,
      letterSpacing: -0.3,
    },
  };

  const font = FONT_CONFIG[memoryFont] ?? FONT_CONFIG.Arial;

  const BASE_Y = paperHeight - STRIP.BOTTOM_MEMORY_HEIGHT;
  const CENTER_Y = BASE_Y + STRIP.BOTTOM_MEMORY_HEIGHT / 2;

  const MESSAGE_Y = BASE_Y + 14;
  const DATE_Y_WITH_MESSAGE = BASE_Y + 36;
  const DATE_Y_ALONE = CENTER_Y - 6;

  useEffect(() => {
    const urls = [];
    frames.forEach((frame, i) => {
      if (!(frame instanceof Blob)) return;
      const url = URL.createObjectURL(frame);
      urls.push(url);
      const img = new window.Image();
      img.src = url;
      img.onload = () =>
        setImages((p) => ((p[i] = img), [...p]));
    });
    return () => urls.forEach(URL.revokeObjectURL);
  }, [frames]);

  useEffect(() => {
    if (!containerRef.current) return;
    setScale(Math.min(1, containerRef.current.clientHeight / paperHeight));
  }, [paperHeight]);

  return (
    <div ref={containerRef} className="h-full flex justify-center">
      <Stage
        ref={stageRef}
        width={paperWidth * scale}
        height={paperHeight * scale}
        scale={{ x: scale, y: scale }}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) onClearSelection();
        }}
      >
        <>
          <Layer>
            <Rect width={paperWidth} height={paperHeight} fill={stripBackground} />
            <Rect
              x={0}
              y={paperHeight - STRIP.BOTTOM_MEMORY_HEIGHT}
              width={paperWidth}
              height={STRIP.BOTTOM_MEMORY_HEIGHT}
              fill={stripBackground}
            />

            {hasMessage && (
              <Text
                text={finalMessage}
                x={0}
                y={MESSAGE_Y}
                width={paperWidth}
                align="center"
                fontFamily={font.family}
                fontSize={font.size}
                lineHeight={font.lineHeight}
                letterSpacing={font.letterSpacing}
                fill={memoryTextColor}
              />
            )}

            {showDate && (
              <Text
                text={finalDate}
                x={0}
                y={hasMessage ? DATE_Y_WITH_MESSAGE : DATE_Y_ALONE}
                width={paperWidth}
                align="center"
                fontFamily={font.family}
                fontSize={font.size - 3}
                opacity={0.7}
                fill={memoryTextColor}
              />
            )}

            {images.map(
              (img, i) =>
                img && (
                  <Image
                    key={i}
                    image={img}
                    x={STRIP.PADDING_X}
                    y={STRIP.PADDING_TOP + i * (frameH + STRIP.SEPARATOR)}
                    width={frameW}
                    height={frameH}
                  />
                )
            )}

            {isExporting &&
              stickers.map((s) => (
                <Image
                  key={s.id}
                  image={(() => {
                    const img = new window.Image();
                    img.src = s.src;
                    return img;
                  })()}
                  x={s.x}
                  y={s.y}
                  width={s.width}
                  height={s.height}
                  rotation={s.rotation}
                />
              ))}
          </Layer>

          <Layer>
            {isDraggingSticker && (
              <Group>
                <Rect
                  x={0}
                  y={deleteZoneY}
                  width={paperWidth}
                  height={DELETE_ZONE_HEIGHT}
                  fill="rgba(220,38,38,0.85)"
                />
                <Line
                  points={[0, deleteZoneY, paperWidth, deleteZoneY]}
                  stroke="#fff"
                  strokeWidth={2}
                  dash={[8, 6]}
                />
                <Text
                  text="🗑"
                  x={0}
                  y={deleteZoneY + 6}
                  width={paperWidth}
                  align="center"
                  fontSize={28}
                />
                <Text
                  text="DROP HERE TO DELETE"
                  x={0}
                  y={deleteZoneY + 36}
                  width={paperWidth}
                  align="center"
                  fontSize={12}
                  fontStyle="bold"
                  fill="#ffffff"
                  letterSpacing={1.5}
                />
              </Group>
            )}

            {stickers.map((s) => (
              <StickerImage
                key={s.id}
                sticker={s}
                isSelected={s.id === selectedStickerId}
                onSelect={() => onSelect(s.id)}
                onUpdate={onUpdate}
                onDelete={onDelete}
                setIsDraggingSticker={setIsDraggingSticker}
                paperHeight={paperHeight}
              />
            ))}
          </Layer>
        </>
      </Stage>
    </div>
  );
}
