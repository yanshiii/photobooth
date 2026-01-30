import { create } from "zustand";

export const useBoothStore = create((set) => ({
  layout: null,
  rawImage: null,
  finalImage: null,
  isMirrored: true,
  filters: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    grayscale: 0,
  },
  stickers: [],
  selectedStickerId: null,


  setRawImage: (img) => set({ rawImage: img }),
  toggleMirror: () =>
  set((s) => ({ isMirrored: !s.isMirrored })),
  setFinalImage: (img) => set({ finalImage: img }),
  setFilters: (f) =>
    set((s) => ({ filters: { ...s.filters, ...f } })),
  selectSticker: (id) => set({ selectedStickerId: id }),
  clearSelection: () => set({ selectedStickerId: null }),
  updateSticker: (id, updates) =>
  set((state) => ({
    stickers: state.stickers.map((s) =>
      s.id === id ? { ...s, ...updates } : s
    ),
  })),
  addSticker: (sticker) =>
  set((state) => ({
    stickers: [...state.stickers, sticker],
  })),
  deleteSticker: (id) =>
  set((state) => ({
    stickers: state.stickers.filter((s) => s.id !== id),
    selectedStickerId: null,
  })),
}));
