export default function CameraView({ videoRef, isMirrored, filter }) {
  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className={`
        w-full h-full object-cover rounded-2xl
        ring-1 ring-white/10
        shadow-[0_24px_60px_-36px_rgba(0,0,0,0.75)]
        ${isMirrored ? "scale-x-[-1]" : ""}
      `}
      style={{ filter }}
    />
  );
}
