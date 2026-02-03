// stripGeometry.js
// 🔒 SINGLE SOURCE OF TRUTH FOR STRIP LAYOUT

export const STRIP = {
  // ---- Overall paper width (matches PhotoStrip visual width)
  WIDTH: 280,

  // ---- Paper padding (applies to ALL sides)
  PADDING_X: 12,
  PADDING_TOP: 12,

  // ---- Space between frames (paper color)
  SEPARATOR: 10,

  // ---- Bottom memory / signature area
  BOTTOM_MEMORY_HEIGHT: 56,

  // ---- Frame aspect (classic photobooth)
  FRAME_ASPECT: 3 / 4, // width / height

  // ---- Derived frame width
  FRAME_WIDTH() {
    return this.WIDTH - this.PADDING_X * 2;
  },

  // ---- Derived frame height
  FRAME_HEIGHT() {
    return this.FRAME_WIDTH() / this.FRAME_ASPECT;
  },

  // ---- Total strip height for N frames
  TOTAL_HEIGHT(slots) {
    return (
      this.PADDING_TOP +
      slots * this.FRAME_HEIGHT() +
      (slots - 1) * this.SEPARATOR +
      this.BOTTOM_MEMORY_HEIGHT +
      this.PADDING_TOP
    );
  },
};
