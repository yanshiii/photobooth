export default function CameraView({ videoRef, isMirrored }) {
  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className={`absolute inset-0 w-full h-full object-cover ${
        isMirrored ? "-scale-x-100" : ""
      }`}
    />
  );
}
