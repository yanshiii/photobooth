import { Stage, Layer, Image, Rect, Transformer, Text } from "react-konva";
import { useEffect, useRef, useState } from "react";
import { FRAME_WIDTH, FRAME_HEIGHT } from "@/styles/frame";

/* ---------------- Sticker Image ---------------- */

export function StickerImage({
  sticker,
  onUpdate,
  onDelete,
  isSelected,
  onSelect,
}) {
  const shapeRef = useRef();
  const trRef = useRef();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = sticker.src;
    img.onload = () => setImage(img);
  }, [sticker.src]);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  if (!image) return null;

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
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) =>
          onUpdate(sticker.id, {
            x: e.target.x(),
            y: e.target.y(),
          })
        }
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
          rotateEnabled
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
        />
      )}

      {/* Delete button */}
      {isSelected && (
        <Text
          text="✕"
          x={sticker.x + sticker.width - 12}
          y={sticker.y - 22}
          fontSize={18}
          fill="#ef4444"
          fontStyle="bold"
          onClick={() => onDelete(sticker.id)}
          onTap={() => onDelete(sticker.id)}
          listening
        />
      )}
    </>
  );
}

/* ---------------- Main Stage ---------------- */

export default function KonvaStage({
  stageRef,
  imageBlob,
  stickers,
  onUpdate,
  selectedStickerId,
  onSelect,
  onClearSelection,
  onDelete,
}) {
  const [bgImage, setBgImage] = useState(null);

  // Load captured image
  useEffect(() => {
    if (!imageBlob) return;

    const img = new window.Image();
    img.src = URL.createObjectURL(imageBlob);
    img.onload = () => setBgImage(img);

    return () => URL.revokeObjectURL(img.src);
  }, [imageBlob]);

  if (!bgImage) return null;

  return (
    <Stage
      ref={stageRef}
      width={FRAME_WIDTH}
      height={FRAME_HEIGHT}
      onMouseDown={(e) => {
        if (e.target === e.target.getStage()) {
          onClearSelection();
        }
      }}
    >
      <Layer>
        {/* Click catcher */}
        <Rect
          x={0}
          y={0}
          width={FRAME_WIDTH}
          height={FRAME_HEIGHT}
          fill="transparent"
          listening
          onClick={onClearSelection}
        />

        {/* Background photo — FITS STAGE */}
        <Image
          image={bgImage}
          x={0}
          y={0}
          width={FRAME_WIDTH}
          height={FRAME_HEIGHT}
        />

        {/* Stickers */}
        {stickers.map((s) => (
          <StickerImage
            key={s.id}
            sticker={s}
            onUpdate={onUpdate}
            isSelected={s.id === selectedStickerId}
            onSelect={() => onSelect(s.id)}
            onDelete={onDelete}
          />
        ))}
      </Layer>
    </Stage>
  );
}
