import type { SVGProps } from "react";

/**
 * Custom line-art marks for Naughty Cards — no stock icon sets.
 * Every mark is built from the card motif (rounded rectangle + fold)
 * or from thin editorial rules, never generic UI iconography.
 */

export function CardMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="4" y="3" width="13" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M14 3v5l3-2.4L20 8V3" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <circle cx="10.5" cy="16.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function MenuMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <line x1="3" y1="8" x2="21" y2="8" stroke="currentColor" strokeWidth="1.3" />
      <line x1="3" y1="16" x2="15" y2="16" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function CloseMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function PlusMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function MinusMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronMark({ className, direction = "right", ...props }: SVGProps<SVGSVGElement> & { direction?: "left" | "right" | "up" | "down" }) {
  const rotation = { right: 0, down: 90, left: 180, up: 270 }[direction];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
      {...props}
    >
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <line x1="4" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.2" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FlameCheckMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EighteenMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1" />
      <text x="20" y="26" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fill="currentColor">
        18+
      </text>
    </svg>
  );
}
