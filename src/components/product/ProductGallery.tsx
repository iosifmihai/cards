import { useState } from "react";
import type { ProductGalleryImage } from "@/types";
import { ChevronMark } from "@/components/ui/Monogram";

export function ProductGallery({ images, accent }: { images: ProductGalleryImage[]; accent: "burgundy" | "crimson" }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border border-bone/10">
        <img
          src={current.src}
          alt={current.alt}
          className="aspect-[4/5] w-full object-cover"
          loading={active === 0 ? "eager" : "lazy"}
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1 font-sans text-[11px] uppercase tracking-[0.1em] text-bone backdrop-blur">
          {current.label}
        </span>
        <button
          type="button"
          onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}
          aria-label="Imaginea anterioară"
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-bone backdrop-blur transition-colors hover:bg-ink/80 sm:hidden"
        >
          <ChevronMark direction="left" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setActive((i) => (i + 1) % images.length)}
          aria-label="Imaginea următoare"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-bone backdrop-blur transition-colors hover:bg-ink/80 sm:hidden"
        >
          <ChevronMark direction="right" className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 hidden gap-3 sm:grid sm:grid-cols-5">
        {images.map((img, index) => (
          <button
            key={img.label}
            type="button"
            onClick={() => setActive(index)}
            className={`overflow-hidden rounded-xl border transition-colors ${
              index === active
                ? accent === "burgundy"
                  ? "border-burgundy"
                  : "border-crimson-strong"
                : "border-bone/10 hover:border-bone/30"
            }`}
            aria-label={img.label}
            aria-current={index === active}
          >
            <img src={img.src} alt="" aria-hidden="true" className="aspect-square w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
