// lib/layouts.js

export const layouts = [
  { id: "single", slots: 1 },
  { id: "double", slots: 2 },
  { id: "triple", slots: 3 },
];

export function getLayoutById(id) {
  const layout = layouts.find((l) => l.id === id);
  if (!layout) throw new Error("Invalid layout");
  return layout;
}
