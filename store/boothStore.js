import { create } from "zustand";

export const useBoothStore = create((set, get) => ({
  /* ---------------------------------
   * Layout / Session
   * --------------------------------- */
  layout: null, // { id, slots, sessionId }

  setLayout: (layout) =>
    set({
      layout,
      frames: Array(layout.slots).fill(null),
      activeIndex: 0,
      stickers: [],
      filters: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        grayscale: 0,
      },
    }),

  /* ---------------------------------
   * Strip frames (CORE)
   * --------------------------------- */
  frames: [],          // Array<Blob | null>
  activeIndex: 0,      // current slot being captured

  addCapturedImage: (blob) => {
    const { frames, activeIndex } = get();

    if (activeIndex >= frames.length) return;

    const nextFrames = [...frames];
    nextFrames[activeIndex] = blob;

    set({
      frames: nextFrames,
      activeIndex: Math.min(activeIndex + 1, frames.length - 1),
    });
  },

  retakeCurrent: () => {
    const { frames, activeIndex } = get();
    const nextFrames = [...frames];
    nextFrames[activeIndex] = null;

    set({ frames: nextFrames });
  },

  retakeAll: () => {
    const { layout } = get();
    if (!layout) return;

    set({
      frames: Array(layout.slots).fill(null),
      activeIndex: 0,
    });
  },

  /* ---------------------------------
   * Derived helpers
   * --------------------------------- */
  isComplete: () => get().frames.every(Boolean),

  /* ---------------------------------
   * Camera / UX
   * --------------------------------- */
  isMirrored: true,
  toggleMirror: () =>
    set((s) => ({ isMirrored: !s.isMirrored })),

  /* ---------------------------------
   * GLOBAL filters (strip-wide)
   * --------------------------------- */
  filters: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    grayscale: 0,
  },

  setFilters: (updates) =>
    set((s) => ({
      filters: { ...s.filters, ...updates },
    })),

  /* ---------------------------------
   * GLOBAL stickers (strip-wide)
   * --------------------------------- */
  stickers: [],
  selectedStickerId: null,

  addSticker: (sticker) =>
    set((s) => ({
      stickers: [...s.stickers, sticker],
    })),

  updateSticker: (id, updates) =>
    set((s) => ({
      stickers: s.stickers.map((st) =>
        st.id === id ? { ...st, ...updates } : st
      ),
    })),

  deleteSticker: (id) =>
    set((s) => ({
      stickers: s.stickers.filter((st) => st.id !== id),
      selectedStickerId: null,
    })),

  selectSticker: (id) => set({ selectedStickerId: id }),
  clearSelection: () => set({ selectedStickerId: null }),
}));
