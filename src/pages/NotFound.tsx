import { Link } from "react-router-dom";
import { useSEO } from "@/lib/useSEO";
import { Reveal } from "@/components/ui/Reveal";

export default function NotFound() {
  useSEO({ title: "Ai tras cartea greșită", description: "Pagina căutată nu există.", path: "/404" });

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(50% 45% at 50% 40%, rgba(183,0,24,0.28), transparent 70%)",
        }}
      />
      <Reveal className="relative text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-5 font-serif text-5xl text-bone sm:text-6xl">Ai tras cartea greșită.</h1>
        <p className="mx-auto mt-6 max-w-md font-sans text-base text-smoke">
          Pagina pe care o cauți nu există sau a fost mutată. Restul jocului te așteaptă.
        </p>
        <Link to="/" className="btn-primary mt-9 inline-flex">
          Înapoi la joc
        </Link>
      </Reveal>
    </section>
  );
}
