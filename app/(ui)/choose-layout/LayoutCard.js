export default function LayoutCard({ layout, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(layout)}
      className={`rounded-xl border p-4 transition-all ${
        selected
          ? "border-black ring-2 ring-black"
          : "border-zinc-200 hover:border-zinc-400"
      }`}
    >
      <div className="aspect-square bg-zinc-100 rounded-md mb-3 flex items-center justify-center">
        <span className="text-sm text-zinc-500">
          {layout.slots} slot{layout.slots > 1 ? "s" : ""}
        </span>
      </div>

      <h3 className="font-medium text-lg">{layout.name}</h3>
      <p className="text-sm text-zinc-500">
        Aspect ratio: {layout.aspectRatio}
      </p>
    </button>
  );
}
