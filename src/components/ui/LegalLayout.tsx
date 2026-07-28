import type { LegalSection } from "@/data/legal";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

export function LegalLayout({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={`Actualizat: ${updated}`} />
      <section className="container-edit max-w-3xl pb-24">
        <div className="flex flex-col gap-12">
          {sections.map((section) => (
            <Reveal key={section.heading}>
              <h2 className="font-serif text-2xl text-bone">{section.heading}</h2>
              <div className="mt-4 flex flex-col gap-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="font-sans text-[15px] leading-relaxed text-smoke">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
