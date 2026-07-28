import { MinusMark, PlusMark } from "./Monogram";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

export function QuantitySelector({ value, onChange, min = 1, max = 9, label }: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center gap-4 rounded-full border border-bone/20 px-4 py-2.5">
      {label && <span className="font-sans text-xs uppercase tracking-[0.1em] text-smoke">{label}</span>}
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Scade cantitatea"
        className="flex h-7 w-7 items-center justify-center rounded-full text-bone transition-colors hover:bg-bone/10 disabled:opacity-30"
      >
        <MinusMark className="h-3.5 w-3.5" />
      </button>
      <span className="w-5 text-center font-serif text-lg text-bone" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Crește cantitatea"
        className="flex h-7 w-7 items-center justify-center rounded-full text-bone transition-colors hover:bg-bone/10 disabled:opacity-30"
      >
        <PlusMark className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
