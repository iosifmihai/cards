import { Link, useLocation, Navigate } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { FlameCheckMark } from "@/components/ui/Monogram";
import { formatPrice } from "@/lib/format";
import { useSEO } from "@/lib/useSEO";

interface ConfirmationState {
  lines: { name: string; quantity: number; price: number }[];
  total: number;
  fullName: string;
  email: string;
}

export default function OrderConfirmation() {
  useSEO({
    title: "Comanda a fost plasată",
    description: "Confirmarea comenzii Naughty Cards.",
    path: "/comanda-confirmata",
  });

  const location = useLocation();
  const state = location.state as ConfirmationState | null;

  if (!state) return <Navigate to="/" replace />;

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden px-6 py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(50% 45% at 50% 30%, rgba(112,0,13,0.32), transparent 70%)",
        }}
      />
      <div className="container-edit relative flex justify-center">
        <Reveal className="glass-panel-strong w-full max-w-xl rounded-3xl px-8 py-12 text-center sm:px-12">
          <FlameCheckMark className="mx-auto h-8 w-8 text-ember" />
          <h1 className="mt-6 font-serif text-3xl text-bone sm:text-4xl">Comanda a fost plasată.</h1>
          <p className="mt-3 font-serif text-lg italic text-smoke">
            Restul rămâne între voi și pachet.
          </p>
          <p className="mt-6 font-sans text-sm text-smoke">
            Am trimis o confirmare la adresa {state.email}. {state.fullName}, îți mulțumim pentru comandă.
          </p>

          <div className="mt-8 flex flex-col gap-3 border-y border-bone/10 py-6 text-left">
            {state.lines.map((line) => (
              <div key={line.name} className="flex justify-between font-sans text-sm">
                <span className="text-bone">
                  {line.name} × {line.quantity}
                </span>
                <span className="text-smoke">{formatPrice(line.price * line.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <span className="font-serif text-xl text-bone">Total</span>
            <span className="font-serif text-xl text-bone">{formatPrice(state.total)}</span>
          </div>

          <Link to="/" className="btn-primary mt-9 inline-flex">
            Înapoi la Naughty Cards
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
