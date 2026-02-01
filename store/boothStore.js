import { create } from "zustand";

export const useBoothStore = create((set, get) => ({
  // layout + session
  layout: null, // { id, slots, sessionId }

  // capture state
  capturedImages: [], // Array<Blob | null>
  activeIndex: 0,

  // camera
  isMirrored: true,

  // editor state (unchanged for now)
  stickers: [],
  selectedStickerId: null,
  finalImage: null,

  /* ---------- Layout ---------- */
  setLayout: (layout) =>
    set({
      layout,
      capturedImages: Array(layout.slots).fill(null),
      activeIndex: 0,
    }),

  /* ---------- Capture ---------- */
  addCapturedImage: (blob) =>
    set((state) => {
      const images = [...state.capturedImages];
      images[state.activeIndex] = blob;

      const nextIndex = images.findIndex((img) => img === null);

      return {
        capturedImages: images,
        activeIndex:
          nextIndex === -1 ? state.activeIndex : nextIndex,
      };
    }),

  retakeActive: () =>
    set((state) => {
      const images = [...state.capturedImages];
      images[state.activeIndex] = null;
      return { capturedImages: images };
    }),

  setActiveIndex: (index) =>
    set({ activeIndex: index }),

  /* ---------- Camera ---------- */
  toggleMirror: () =>
    set((s) => ({ isMirrored: !s.isMirrored })),

  /* ---------- Editor ---------- */
  setFinalImage: (img) => set({ finalImage: img }),

  selectSticker: (id) => set({ selectedStickerId: id }),
  clearSelection: () => set({ selectedStickerId: null }),

  addSticker: (sticker) =>
    set((s) => ({ stickers: [...s.stickers, sticker] })),

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
}));
