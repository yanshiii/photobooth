import { FRAME_RATIO, FRAME_WIDTH } from "@/styles/frame";

export default function CameraSurface({ children }) {
  return (
    <div
      style={{ width: FRAME_WIDTH }}
      className="
        relative
        aspect-[3/4]
        rounded-2xl
        overflow-hidden
        bg-black
        shadow-xl
      "
    >
      {children}
    </div>
  );
}
