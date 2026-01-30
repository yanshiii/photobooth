export default function LayoutCard({ layout, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(layout)}
      className={`group relative rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm ${
        selected
          ? "bg-white/90 shadow-xl shadow-zinc-900/10 ring-2 ring-zinc-900 scale-105"
          : "bg-white/60 shadow-lg shadow-zinc-900/5 hover:bg-white/80 hover:shadow-xl hover:shadow-zinc-900/10 hover:scale-102"
      }`}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 ${selected ? 'opacity-100' : 'group-hover:opacity-100'}`} />
      
      <div className="relative z-10">
        {/* Preview area */}
        <div className={`aspect-square rounded-xl mb-4 flex items-center justify-center transition-all duration-300 ${
          selected 
            ? 'bg-gradient-to-br from-zinc-100 to-zinc-50' 
            : 'bg-zinc-50 group-hover:bg-gradient-to-br group-hover:from-zinc-100 group-hover:to-zinc-50'
        }`}>
          <div className="flex items-center gap-2">
            {Array.from({ length: layout.slots }).map((_, i) => (
              <div
                key={i}
                className={`rounded-md transition-all duration-300 ${
                  selected
                    ? 'bg-gradient-to-br from-emerald-200 to-cyan-200'
                    : 'bg-zinc-200 group-hover:bg-gradient-to-br group-hover:from-emerald-100 group-hover:to-cyan-100'
                }`}
                style={{
                  width: layout.slots === 1 ? '60px' : '30px',
                  height: layout.slots === 3 ? '60px' : layout.slots === 1 ? '60px' : '40px',
                }}
              />
            ))}
          </div>
        </div>

        {/* Text content */}
        <h3 className="font-semibold text-xl mb-1 text-zinc-900 group-hover:text-zinc-950 transition-colors">
          {layout.name}
        </h3>
        <p className="text-sm text-zinc-500 group-hover:text-zinc-600 transition-colors">
          {layout.aspectRatio} • {layout.slots} {layout.slots > 1 ? 'photos' : 'photo'}
        </p>
      </div>

      {/* Selected indicator */}
      {selected && (
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center animate-scaleIn">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
}