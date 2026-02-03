"use client";

/**
 * Typography System
 * 
 * Font Hierarchy:
 * - Display / Headings: Lovira (rare, impactful)
 * - Accent / Subtext: Raclie (UI labels, meta)
 * - Body: Inter (everything else)
 * 
 * Scale:
 * - Restrained, cinema-grade
 * - Tight line-heights
 */

export function Title({ children, className = "" }) {
  return (
    <h1
      className={`
        text-4xl
        sm:text-5xl
        font-semibold
        tracking-tight
        leading-[1.1]
        font-display
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
        text-base
        leading-relaxed
        font-body
        ${className}
      `}
    >
      {children}
    </p>
  );
}

export function Body({ children, className = "" }) {
  return (
    <p
      className={`
        text-sm
        leading-relaxed
        font-body
        ${className}
      `}
    >
      {children}
    </p>
  );
}

export function Meta({ children, className = "" }) {
  return (
    <span
      className={`
        text-[10px]
        tracking-wider
        font-accent
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export function Label({ children, className = "" }) {
  return (
    <label
      className={`
        text-xs
        font-medium
        tracking-wide
        font-accent
        ${className}
      `}
    >
      {children}
    </label>
  );
}