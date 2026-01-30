import { colors, blur, shadow, radii } from "@/styles/tokens";

export default function Surface({ children, className = "" }) {
  return (
    <div
      style={{
        background: colors.surface.base,
        border: `1px solid ${colors.surface.border}`,
        backdropFilter: `blur(${blur.glass})`,
        borderRadius: radii.xl,
        boxShadow: shadow.surface,
      }}
      className={`relative ${className}`}
    >
      {children}
    </div>
  );
}
