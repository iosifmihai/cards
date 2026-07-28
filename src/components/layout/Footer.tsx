import { Link } from "react-router-dom";
import { FOOTER_LEGAL_LINKS, FOOTER_SHOP_LINKS, SOCIAL_LINKS } from "@/data/nav";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bone/10 bg-ink-burgundy">
      <div className="container-edit grid grid-cols-2 gap-10 py-16 sm:grid-cols-3 lg:grid-cols-5 lg:py-20">
        <div className="col-span-2 lg:col-span-2">
          <Link to="/" className="font-serif text-xl tracking-[0.14em] text-bone">
            NAUGHTY <span className="text-ember">CARDS</span>
          </Link>
          <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-smoke">
            Turn up the tension. Draw a card.
          </p>
          <div className="mt-6 flex items-center gap-5">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="font-sans text-xs uppercase tracking-[0.14em] text-smoke transition-colors hover:text-bone"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-5">Magazin</p>
          <ul className="flex flex-col gap-3">
            {FOOTER_SHOP_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.href} className="font-sans text-sm text-smoke transition-colors hover:text-bone">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5">Legal</p>
          <ul className="flex flex-col gap-3">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.href} className="font-sans text-sm text-smoke transition-colors hover:text-bone">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5">Newsletter</p>
          <p className="font-sans text-sm leading-relaxed text-smoke">
            Primește lansări, oferte și provocări noi.
          </p>
          <Link to="/#newsletter" className="btn-ghost mt-4 inline-flex">
            Intră în joc →
          </Link>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="container-edit flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left">
          <p className="font-sans text-xs text-smoke">
            © {year} Naughty Cards. Toate drepturile rezervate.
          </p>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-smoke">
            Produse destinate exclusiv persoanelor de peste 18 ani.
          </p>
        </div>
      </div>
    </footer>
  );
}
