import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ConsentNotice } from "@/components/product/ConsentNotice";
import { useSEO } from "@/lib/useSEO";

export default function About() {
  useSEO({
    title: "Despre Naughty Cards",
    description:
      "Naughty Cards este un brand premium de jocuri de cărți Adevăr sau Provocare 18+, creat pentru cupluri, întâlniri și petreceri private.",
    path: "/despre",
  });

  return (
    <>
      <PageHero
        eyebrow="Despre brand"
        title="Un joc construit pentru tensiune, nu pentru distracție de suprafață."
        description="Naughty Cards este un brand premium de jocuri Adevăr sau Provocare pentru adulți — gândit pentru cupluri, întâlniri, petreceri private și seri care vor să depășească conversațiile obișnuite."
      />

      <section className="container-edit grid gap-16 pb-24 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <h2 className="font-serif text-3xl text-bone">Poziționare</h2>
          <p className="mt-5 font-sans text-[15px] leading-relaxed text-smoke">
            Naughty Cards nu este vulgar, pornografic sau explicit vizual. Erotismul este transmis prin
            atmosferă, iluminare, compoziție, tipografie și texte scurte, provocatoare — nu prin descrieri
            explicite. Este un brand pentru cupluri, întâlniri, petreceri private și seri în care participanții
            vor să depășească conversațiile obișnuite.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-3xl text-bone">Cele două experiențe</h2>
          <p className="mt-5 font-sans text-[15px] leading-relaxed text-smoke">
            <strong className="text-bone">Slow Burn</strong> — tensiune progresivă, flirt, apropiere și
            anticipare. <strong className="text-bone">No Limits</strong> — întrebări foarte intime, provocări
            mult mai intense și o experiență pentru adulții fără inhibiții. Ambele aparțin aceleiași familii
            vizuale, dar oferă experiențe distincte.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-bone/10 bg-ink-burgundy py-20">
        <div className="container-edit max-w-2xl">
          <Reveal>
            <p className="eyebrow">Consimțământ</p>
            <h2 className="mt-4 font-serif text-3xl text-bone">Jocul se joacă cu reguli clare.</h2>
            <div className="mt-8 flex flex-col gap-4">
              <ConsentNotice variant="general" />
              <ConsentNotice variant="no-limits" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
