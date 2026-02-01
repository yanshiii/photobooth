export default function LayoutCard({ layout, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(layout)}
      className={`group relative rounded-3xl p-8 transition-all duration-500 ${
        selected
          ? "bg-white shadow-2xl shadow-slate-900/15 ring-2 ring-slate-900 scale-[1.02]"
          : "bg-white/70 backdrop-blur-md shadow-xl shadow-slate-900/8 hover:bg-white hover:shadow-2xl hover:shadow-slate-900/12 hover:scale-[1.01]"
      }`}
    >
      {/* Multi-layer gradient background effects */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/8 via-teal-500/5 to-cyan-500/8 opacity-0 transition-opacity duration-500 ${
        selected ? 'opacity-100' : 'group-hover:opacity-100'
      }`} />
      
      {/* Subtle inner glow */}
      <div className={`absolute inset-[1px] rounded-3xl bg-gradient-to-b from-white/50 to-transparent opacity-0 transition-opacity duration-500 ${
        selected ? 'opacity-60' : 'group-hover:opacity-40'
      }`} />
      
      {/* Animated border gradient */}
      {selected && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-20 blur-sm animate-pulse" style={{ animationDuration: '3s' }} />
      )}
      
      <div className="relative z-10">
        {/* Preview area with enhanced depth */}
        <div className={`aspect-square rounded-2xl mb-6 flex items-center justify-center transition-all duration-500 overflow-hidden ${
          selected 
            ? 'bg-gradient-to-br from-slate-100 via-slate-50 to-white shadow-inner' 
            : 'bg-gradient-to-br from-slate-50 to-white group-hover:from-slate-100 group-hover:via-slate-50 group-hover:to-white shadow-sm group-hover:shadow-inner'
        }`}>
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(51 65 85) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} />
          
          <div className="relative flex items-center gap-2.5">
            {Array.from({ length: layout.slots }).map((_, i) => (
              <div
                key={i}
                className={`rounded-lg transition-all duration-500 shadow-sm ${
                  selected
                    ? 'bg-gradient-to-br from-emerald-300 via-teal-300 to-cyan-300 shadow-emerald-200/50'
                    : 'bg-gradient-to-br from-slate-200 to-slate-300 group-hover:from-emerald-200 group-hover:via-teal-200 group-hover:to-cyan-200 group-hover:shadow-teal-200/50'
                }`}
                style={{
                  width: layout.slots === 1 ? '72px' : '36px',
                  height: layout.slots === 3 ? '72px' : layout.slots === 1 ? '72px' : '48px',
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
          
          {/* Floating particles effect for selected state */}
          {selected && (
            <>
              <div className="absolute top-4 left-4 w-1 h-1 rounded-full bg-emerald-400/60 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute bottom-6 right-6 w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
              <div className="absolute top-1/3 right-8 w-1 h-1 rounded-full bg-teal-400/60 animate-ping" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
            </>
          )}
        </div>

        {/* Text content with enhanced typography */}
        <div className="space-y-2">
          <h3 className="font-bold text-2xl text-slate-900 group-hover:text-slate-950 transition-colors duration-300">
            {layout.name}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-slate-500 group-hover:text-slate-600 transition-colors duration-300">
            <span className="font-medium">{layout.aspectRatio}</span>
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <span className="font-medium">{layout.slots} {layout.slots > 1 ? 'photos' : 'photo'}</span>
          </div>
        </div>
      </div>

      {/* Enhanced selected indicator */}
      {selected && (
        <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-scaleIn">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          
          {/* Outer ring animation */}
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-75" />
        </div>
      )}
      
      {/* Hover state glow effect */}
      <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 blur-xl opacity-0 transition-opacity duration-500 -z-10 ${
        selected ? 'opacity-100' : 'group-hover:opacity-60'
      }`} />
    </button>
  );
}