import type { ReactNode } from "react";

export function FormField({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-smoke">
        {label}
      </label>
      {children}
      {error && (
        <p className="font-sans text-xs text-ember" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
