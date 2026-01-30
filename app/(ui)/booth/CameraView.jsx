export default function CameraView({ videoRef, isMirrored }) {
  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className={`w-full h-full object-cover ${
        isMirrored ? "-scale-x-100" : ""
      }`}
    />
  );
}
