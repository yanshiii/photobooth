import { create } from "zustand";

export const useBoothStore = create((set, get) => ({
  /* ---------------------------------
   * Layout / Session
   * --------------------------------- */
  layout: null, // { id, slots, sessionId }

  setLayout: (layout) => {
    if (!layout) return;

    set({
      layout,
      frames: Array(layout.slots).fill(null),
      activeIndex: 0,
      stickers: [],
      selectedStickerId: null,
      filters: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        grayscale: 0,
      },
    });
  },

  /* ---------------------------------
   * Strip frames (CORE)
   * --------------------------------- */
  frames: [],          // Array<Blob | null>
  activeIndex: 0,      // which slot is active

  setActiveIndex: (index) => {
    const { frames } = get();
    if (index < 0 || index >= frames.length) return;
    set({ activeIndex: index });
  },

  addCapturedImage: (blob) => {
    const { frames, activeIndex } = get();
    if (!frames.length || activeIndex >= frames.length) return;

    const nextFrames = [...frames];
    nextFrames[activeIndex] = blob;

    set({
      frames: nextFrames,
      activeIndex: Math.min(activeIndex + 1, frames.length - 1),
    });
  },

  retakeCurrent: () => {
    const { frames, activeIndex } = get();

    // determine which index to retake
    const indexToClear =
      frames[activeIndex] !== null
        ? activeIndex
        : Math.max(activeIndex - 1, 0);

    if (!frames[indexToClear]) return;

    const nextFrames = [...frames];
    nextFrames[indexToClear] = null;

    set({
      frames: nextFrames,
      activeIndex: indexToClear, // move cursor back correctly
    });
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
   * Derived state (SAFE)
   * --------------------------------- */
  isComplete: false,

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

/* ---------------------------------
 * SIDE EFFECT: keep isComplete in sync
 * --------------------------------- */
useBoothStore.subscribe(
  (state) => state.frames,
  (frames) => {
    useBoothStore.setState({
      isComplete: frames.length > 0 && frames.every(Boolean),
    });
  }
);
