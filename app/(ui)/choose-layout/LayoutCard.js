export default function LayoutCard({ layout, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(layout)}
      className={`group relative rounded-3xl p-8 transition-all duration-700 ${
        selected
          ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] ring-2 ring-[#f2d9a6]/40 shadow-[0_30px_70px_-32px_rgba(0,0,0,0.7)] scale-[1.02]"
          : "bg-white/8 backdrop-blur-sm border border-white/10 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.7)] hover:bg-white/12 hover:border-white/20 hover:scale-[1.01]"
      }`}
    >
      {/* Warm ruby wash */}
      <div
        className={`absolute inset-0 rounded-3xl bg-[radial-gradient(120%_120%_at_0%_0%,rgba(242,217,166,0.12),rgba(122,46,53,0)_55%)] opacity-0 transition-opacity duration-700 ${
          selected ? "opacity-100" : "group-hover:opacity-90"
        }`}
      />

      {/* Soft inner glow */}
      <div
        className={`absolute inset-[1px] rounded-3xl bg-gradient-to-b from-white/35 to-transparent opacity-0 transition-opacity duration-700 ${
          selected ? "opacity-60" : "group-hover:opacity-40"
        }`}
      />

      {/* Subtle animated border sheen */}
      {selected && (
        <div
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#f2d9a6]/20 via-[#ad2831]/15 to-[#f2d9a6]/20 opacity-30 blur-sm animate-pulse"
          style={{ animationDuration: "4s" }}
        />
      )}

      <div className="relative z-10">
        {/* Preview area */}
        <div
          className={`relative aspect-square rounded-2xl mb-6 flex items-center justify-center transition-all duration-700 overflow-hidden ${
            selected
              ? "bg-[linear-gradient(145deg,#f8f1ea,#f2e6de)] shadow-[inset_0_1px_6px_rgba(255,255,255,0.6)]"
              : "bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] group-hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.2),rgba(255,255,255,0.06))]"
          }`}
        >
          {/* Subtle paper grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(242,217,166,0.8) 1px, transparent 0)",
              backgroundSize: "26px 26px",
            }}
          />

          <div className="relative flex items-center gap-2.5">
            {Array.from({ length: layout.slots }).map((_, i) => (
              <div
                key={i}
                className={`rounded-lg transition-all duration-700 ${
                  selected
                    ? "bg-[linear-gradient(145deg,#f2d9a6,#c84b55)] shadow-[0_8px_20px_-12px_rgba(173,40,49,0.5)]"
                    : "bg-[linear-gradient(145deg,rgba(255,255,255,0.3),rgba(255,255,255,0.12))] group-hover:bg-[linear-gradient(145deg,rgba(242,217,166,0.5),rgba(200,75,85,0.35))]"
                }`}
                style={{
                  width: layout.slots === 1 ? "72px" : "36px",
                  height:
                    layout.slots === 3 ? "72px" : layout.slots === 1 ? "72px" : "48px",
                }}
              />
            ))}
          </div>
        </div>

        {/* Text content */}
        <div className="space-y-2">
          <h3 className="font-accent text-xl text-[#F5F5DC] tracking-wide transition-colors duration-300">
            {layout.name}
          </h3>

          <div className="flex items-center gap-2 text-sm text-[#F5F5DC]/70 transition-colors duration-300">
            <span className="font-medium">{layout.aspectRatio}</span>
            <span className="w-1 h-1 rounded-full bg-[#F5F5DC]/40" />
            <span className="font-medium">
              {layout.slots} {layout.slots > 1 ? "photos" : "photo"}
            </span>
          </div>
        </div>
      </div>

      {/* Selected indicator */}
      {selected && (
        <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[linear-gradient(145deg,#f2d9a6,#ad2831)] flex items-center justify-center shadow-[0_8px_20px_rgba(173,40,49,0.35)]">
          <svg
            className="w-5 h-5 text-[#1a0d11]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* Hover glow */}
      <div
        className={`absolute -inset-1 rounded-3xl bg-[radial-gradient(60%_60%_at_50%_0%,rgba(242,217,166,0.12),rgba(122,46,53,0.08),transparent)] blur-xl opacity-0 transition-opacity duration-700 -z-10 ${
          selected ? "opacity-100" : "group-hover:opacity-60"
        }`}
      />
    </button>
  );
}
