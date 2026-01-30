export default function CanvasStage({ canvasRef }) {
  return (
    <canvas
      ref={canvasRef}
      className="max-w-full max-h-full rounded-xl"
    />
  );
}
