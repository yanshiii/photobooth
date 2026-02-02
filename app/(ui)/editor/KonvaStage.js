"use client";

import {
  Stage,
  Layer,
  Image,
  Rect,
  Transformer,
  Group,
  Line,
} from "react-konva";
import { useEffect, useRef, useState } from "react";
import { FRAME_WIDTH, FRAME_HEIGHT } from "@/styles/frame";
import {
  RotateIcon,
  DeleteIcon,
  HandleBackground,
  DeleteBackground,
} from "@/components/ui/StickerIcons";

/* Booth-matching paper values */
const PAPER_PADDING_X = 24;
const PAPER_PADDING_Y = 24;
const SEPARATOR_HEIGHT = 12;
const DELETE_ZONE_HEIGHT = 60;

/* ================= STICKER ================= */

function StickerImage({
  sticker,
  onUpdate,
  onDelete,
  isSelected,
  onSelect,
  contentHeight,
  deleteZoneY,
}) {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isOverDelete, setIsOverDelete] = useState(false);

  /* Load sticker image */
  useEffect(() => {
    const img = new window.Image();
    img.src = sticker.src;
    img.onload = () => setImage(img);
  }, [sticker.src]);

  /* Attach transformer immediately */
  useEffect(() => {
    if (!isSelected) return;

    const tr = trRef.current;
    const node = shapeRef.current;
    if (!tr || !node) return;

    tr.nodes([]);              // 🔑 force reset
    tr.nodes([node]);          // 🔑 re-attach
    tr.getLayer()?.batchDraw();
  }, [isSelected, sticker.id]);

  if (!image) return null;

  return (
    <>
      {/* STICKER */}
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
        onMouseDown={(e) => {
          e.cancelBubble = true;   // 🔑 CRITICAL
          onSelect();
        }}

        onTap={(e) => {
          e.cancelBubble = true;   // 🔑 CRITICAL
          onSelect();
        }}
        onDragStart={() => setIsDragging(true)}
        onDragMove={(e) => {
          const y = e.target.y();
          setIsOverDelete(y + sticker.height > deleteZoneY);
        }}
        onDragEnd={(e) => {
          setIsDragging(false);
          setIsOverDelete(false);

          if (e.target.y() + sticker.height > deleteZoneY) {
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

      {/* RESIZE */}
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

      {/* ROTATE HANDLE */}
      {isSelected && !isDragging && (
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
      )}

      {/* DELETE BUTTON */}
      {isSelected && !isDragging && (
        <Group
          x={sticker.x + sticker.width + 8}
          y={sticker.y - 8}
          onClick={() => onDelete(sticker.id)}
          onTap={() => onDelete(sticker.id)}
        >
          <DeleteBackground radius={11} />
          <DeleteIcon x={-7} y={-7} />
        </Group>
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
}) {
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [scale, setScale] = useState(1);

  const contentHeight =
    frames.length * FRAME_HEIGHT +
    (frames.length - 1) * SEPARATOR_HEIGHT;

  const paperWidth = FRAME_WIDTH + PAPER_PADDING_X * 2;
  const paperHeight = contentHeight + PAPER_PADDING_Y * 2;
  const deleteZoneY = paperHeight - DELETE_ZONE_HEIGHT;

  /* Load frames */
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

  /* Scale to viewport */
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
        <Layer>
          {/* Paper */}
          <Rect width={paperWidth} height={paperHeight} fill="#fff" />

          {/* Delete zone */}
          <Rect
            x={0}
            y={deleteZoneY}
            width={paperWidth}
            height={DELETE_ZONE_HEIGHT}
            fill="rgba(239,68,68,0.08)"
            listening={false}
          />

          {/* Frames */}
          {images.map(
            (img, i) =>
              img && (
                <Image
                  key={i}
                  image={img}
                  x={PAPER_PADDING_X}
                  y={
                    PAPER_PADDING_Y +
                    i * (FRAME_HEIGHT + SEPARATOR_HEIGHT)
                  }
                  width={FRAME_WIDTH}
                  height={FRAME_HEIGHT}
                  listening={false}
                />
              )
          )}

          {/* Stickers */}
          {stickers.map((s) => (
            <StickerImage
              key={s.id}
              sticker={s}
              isSelected={s.id === selectedStickerId}
              onSelect={() => onSelect(s.id)}
              onUpdate={onUpdate}
              onDelete={onDelete}
              contentHeight={contentHeight}
              deleteZoneY={deleteZoneY}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
