"use client";

export function Title({ children, className = "" }) {
  return (
    <h1
      className={`
        font-display
        text-warm
        font-[420]
        text-[clamp(2.8rem,6vw,5.4rem)]
        leading-[1.02]
        tracking-[0.08em]
        ${className}
      `}
    >
      {children}
    </h1>
  );
}

export function Subtitle({ children, className = "" }) {
  return (
    <p
      className={`
        font-accent
        text-[clamp(1.05rem,1.6vw,1.35rem)]
        leading-[1.7]
        tracking-[0.03em]
        opacity-75
        ${className}
      `}
    >
      {children}
    </p>
  );
}

export function Body({ children, className = "" }) {
  return (
    <p className={`font-body text-sm leading-[1.65] ${className}`}>
      {children}
    </p>
  );
}
