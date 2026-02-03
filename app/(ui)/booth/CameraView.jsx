export default function CameraView({ videoRef, isMirrored, filter }) {
  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className={`
        w-full h-full object-cover rounded-2xl
        ${isMirrored ? "scale-x-[-1]" : ""}
      `}
      style={{ filter }}
    />
  );
}
