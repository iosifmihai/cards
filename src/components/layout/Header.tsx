import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NAV_LINKS } from "@/data/nav";
import { useCartStore } from "@/store/cart";
import { getLineTotalQuantity } from "@/store/cart";
import { CardMark, MenuMark } from "@/components/ui/Monogram";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lines = useCartStore((s) => s.lines);
  const openCart = useCartStore((s) => s.openCart);
  const itemCount = getLineTotalQuantity(lines);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="container-edit">
          <div
            className={`glass-panel flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 sm:px-6 ${
              scrolled ? "shadow-[0_10px_40px_-16px_rgba(0,0,0,0.8)]" : ""
            }`}
          >
            <Link to="/" className="font-serif text-lg tracking-[0.14em] text-bone sm:text-xl">
              NAUGHTY <span className="text-ember">CARDS</span>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigare principală">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  className={({ isActive }) =>
                    `font-sans text-[13px] font-medium uppercase tracking-[0.1em] transition-colors ${
                      isActive ? "text-ember" : "text-smoke hover:text-bone"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3 sm:gap-4">
              <Link to="/bundle" className="btn-primary hidden sm:inline-flex">
                Comandă acum
              </Link>
              <button
                type="button"
                onClick={openCart}
                aria-label={`Deschide coșul (${itemCount} produse)`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone transition-colors hover:border-bone/50"
              >
                <CardMark className="h-4.5 w-4.5" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-crimson-strong px-1 font-sans text-[10px] font-bold text-bone">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Deschide meniul"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone lg:hidden"
              >
                <MenuMark className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
