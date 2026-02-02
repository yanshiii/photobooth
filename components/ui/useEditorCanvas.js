import { useRef, useEffect } from "react";

export function useEditorCanvas(imageBlob, filters, stickers) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageBlob || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = URL.createObjectURL(imageBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.filter = `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturation}%)
        grayscale(${filters.grayscale}%)
      `;

      ctx.drawImage(img, 0, 0);

      stickers.forEach((s) => {
        ctx.drawImage(s.image, s.x, s.y, s.size, s.size);
      });
    };
  }, [imageBlob, filters, stickers]);

  function exportImage() {
    return new Promise((resolve) => {
      canvasRef.current.toBlob((blob) => resolve(blob), "image/png");
    });
  }

  return { canvasRef, exportImage };
}
u