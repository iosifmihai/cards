import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { FlameCheckMark } from "@/components/ui/Monogram";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Introdu o adresă de e-mail validă.");
      return;
    }
    if (!consent) {
      setError("Confirmă acordul pentru a primi comunicări.");
      return;
    }
    setError(null);
    setSubmitted(true);
    setEmail("");
    setConsent(false);
  };

  return (
    <section id="newsletter" className="scroll-mt-24 border-t border-bone/10 py-24 sm:py-28">
      <div className="container-edit flex flex-col items-center text-center">
        <Reveal className="flex w-full max-w-lg flex-col items-center">
          <p className="eyebrow">Newsletter</p>
          <h2 className="mt-5 font-serif text-3xl text-bone sm:text-4xl">Intră în joc.</h2>
          <p className="mt-3 font-sans text-sm text-smoke">Primește lansări, oferte și provocări noi.</p>

          {submitted ? (
            <div className="mt-8 flex items-center gap-3 text-ember">
              <FlameCheckMark className="h-5 w-5" />
              <p className="font-sans text-sm text-bone">Te-ai înscris. Verifică-ți e-mailul de confirmare.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-8 w-full">
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Adresa de e-mail
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Adresa ta de e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field-input flex-1"
                  aria-invalid={Boolean(error)}
                />
                <button type="submit" className="btn-primary shrink-0">
                  Mă înscriu
                </button>
              </div>
              {error && (
                <p className="mt-2 font-sans text-xs text-ember" role="alert">
                  {error}
                </p>
              )}
              <label className="mt-4 flex items-start gap-2.5 text-left">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-3.5 w-3.5 shrink-0 accent-ember"
                />
                <span className="font-sans text-xs leading-relaxed text-smoke">
                  Sunt de acord să primesc comunicări de la Naughty Cards. Vezi{" "}
                  <Link to="/confidentialitate" className="underline hover:text-bone">
                    politica de confidențialitate
                  </Link>
                  .
                </span>
              </label>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
