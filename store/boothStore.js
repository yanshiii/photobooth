import { create } from "zustand";

export const useBoothStore = create((set, get) => ({
  /* ---------------- Layout & Capture Flow ---------------- */

  layout: null,                 // selected layout object
  capturedImages: [],            // Blob[] — replaces rawImage
  currentIndex: 0,               // which slot user is capturing
  isMirrored: true,

  setLayout: (layout) =>
    set({
      layout,
      capturedImages: [],
      currentIndex: 0,
    }),

  addCapturedImage: (blob) => {
    const { capturedImages, currentIndex } = get();

    set({
      capturedImages: [...capturedImages, blob],
      currentIndex: currentIndex + 1,
    });
  },

  retakeAtIndex: (index, blob) =>
    set((state) => {
      const next = [...state.capturedImages];
      next[index] = blob;
      return { capturedImages: next };
    }),

  resetBooth: () =>
    set({
      capturedImages: [],
      currentIndex: 0,
    }),

  toggleMirror: () =>
    set((s) => ({ isMirrored: !s.isMirrored })),

  /* ---------------- Editor Output ---------------- */

  finalImage: null,
  setFinalImage: (img) => set({ finalImage: img }),

  /* ---------------- Filters ---------------- */

  filters: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    grayscale: 0,
  },

  setFilters: (f) =>
    set((s) => ({ filters: { ...s.filters, ...f } })),

  /* ---------------- Stickers ---------------- */

  stickers: [],
  selectedStickerId: null,

  addSticker: (sticker) =>
    set((state) => ({
      stickers: [...state.stickers, sticker],
    })),

  updateSticker: (id, updates) =>
    set((state) => ({
      stickers: state.stickers.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),

  deleteSticker: (id) =>
    set((state) => ({
      stickers: state.stickers.filter((s) => s.id !== id),
      selectedStickerId: null,
    })),

  selectSticker: (id) => set({ selectedStickerId: id }),
  clearSelection: () => set({ selectedStickerId: null }),
}));
