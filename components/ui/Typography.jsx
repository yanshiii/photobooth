export function Title({ children, className = "" }) {
  return (
    <h1
      className={`text-4xl md:text-5xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h1>
  );
}

export function Subtitle({ children, className = "" }) {
  return (
    <p
      className={`mt-3 text-base md:text-lg text-white/60 ${className}`}
    >
      {children}
    </p>
  );
}

export function Body({ children, className = "" }) {
  return (
    <p
      className={`text-sm text-white/70 leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}

export function Meta({ children, className = "" }) {
  return (
    <span
      className={`text-xs uppercase tracking-wide text-white/40 ${className}`}
    >
      {children}
    </span>
  );
}
