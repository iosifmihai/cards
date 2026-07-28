import { Reveal } from "@/components/ui/Reveal";
import { BRAND_PRINCIPLES } from "@/data/content";

export function BrandIntro() {
  return (
    <section className="container-edit py-24 sm:py-32">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">Naughty Cards</p>
        <h2 className="mt-5 font-serif text-3xl leading-tight text-bone sm:text-5xl">
          Nu este doar Adevăr sau Provocare.
        </h2>
        <p className="mt-6 font-sans text-base leading-relaxed text-smoke">
          Este un joc construit pentru a elimina conversațiile banale și pentru a transforma o seară obișnuită
          într-un test al sincerității, tensiunii și curajului.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
        {BRAND_PRINCIPLES.map((principle, index) => (
          <Reveal key={principle.mark} delay={index * 0.1}>
            <span className="font-serif text-6xl text-bone/20 sm:text-7xl">{principle.mark}</span>
            <h3 className="mt-4 font-serif text-2xl text-bone">{principle.title}</h3>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-smoke">{principle.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
