import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 0%, rgba(74,0,8,0.35), transparent 70%)",
        }}
      />
      <div className="container-edit relative">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl text-bone sm:text-5xl lg:text-6xl">{title}</h1>
          {description && (
            <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-smoke">{description}</p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
