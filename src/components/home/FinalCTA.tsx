import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-bone/10 py-28 sm:py-36">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 55% at 22% 40%, rgba(112,0,13,0.5), transparent 70%), radial-gradient(48% 55% at 80% 55%, rgba(255,22,61,0.32), transparent 70%)",
        }}
      />
      <div className="container-edit relative flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <h2 className="max-w-2xl font-serif text-4xl leading-tight text-bone sm:text-6xl">
            Cât de departe vrei să mergi?
          </h2>
          <p className="mt-5 font-sans text-base text-smoke">
            Începe cu Slow Burn sau intră direct în No Limits.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/slow-burn" className="btn-primary">
              Alege Slow Burn
            </Link>
            <Link to="/no-limits" className="btn-secondary">
              Alege No Limits
            </Link>
          </div>
          <Link to="/bundle" className="btn-ghost mt-6">
            Vreau experiența completă
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
