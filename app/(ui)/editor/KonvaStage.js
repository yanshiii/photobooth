import { Stage, Layer, Image, Rect, Transformer, Text } from "react-konva";
import { useEffect, useRef, useState } from "react";

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
          rotateEnabled={true}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
        />
      )}

      {/* ❌ DELETE BUTTON */}
      {isSelected && (
        <Text
          text="✕"
          x={sticker.x + sticker.width - 10}
          y={sticker.y - 20}
          fontSize={18}
          fill="red"
          fontStyle="bold"
          onClick={() => onDelete(sticker.id)}
          onTap={() => onDelete(sticker.id)}
          listening
        />
      )}
    </>
  );
}

export default function KonvaStage({
  stageRef,
  imageBlob,
  stickers,
  onUpdate,
  selectedStickerId,
  onSelect,
  onClearSelection,
  onDelete
}) {
  const [bgImage, setBgImage] = useState(null);

  // 🔑 LOAD THE CAPTURED PHOTO
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
      width={bgImage.width}
      height={bgImage.height}
      onMouseDown={(e) => {
        if (e.target === e.target.getStage()) {
          onClearSelection();
        }
      }}
    >
      <Layer>
        {/* 🔑 CLICK CATCHER */}
        <Rect
          x={0}
          y={0}
          width={bgImage.width}
          height={bgImage.height}
          fill="transparent"
          listening={true}
          onClick={onClearSelection}
        />

        {/* Background photo */}
        <Image
          image={bgImage}
          x={0}
          y={0}
          width={bgImage.width}
          height={bgImage.height}
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

