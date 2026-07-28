import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { FormField } from "@/components/ui/FormField";
import { useCartStore, computeCartTotals } from "@/store/cart";
import { allProducts } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { SHIPPING } from "@/data/shipping";
import { useSEO } from "@/lib/useSEO";

interface CheckoutValues {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  county: string;
  postalCode: string;
  deliveryMethod: "standard" | "express";
  paymentMethod: "card" | "cod";
  termsAccepted: boolean;
  ageConfirmed: boolean;
}

const initialValues: CheckoutValues = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  county: "",
  postalCode: "",
  deliveryMethod: "standard",
  paymentMethod: "card",
  termsAccepted: false,
  ageConfirmed: false,
};

type Errors = Partial<Record<keyof CheckoutValues, string>>;

export default function Checkout() {
  useSEO({ title: "Finalizează comanda", description: "Checkout demonstrativ Naughty Cards.", path: "/checkout" });

  const lines = useCartStore((s) => s.lines);
  const promoCode = useCartStore((s) => s.promoCode);
  const clearCart = useCartStore((s) => s.clearCart);
  const navigate = useNavigate();

  const [values, setValues] = useState<CheckoutValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const totals = computeCartTotals(lines, promoCode);

  const set = <K extends keyof CheckoutValues>(key: K, value: CheckoutValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const validate = (): boolean => {
    const next: Errors = {};
    if (!values.fullName.trim()) next.fullName = "Introdu numele complet.";
    if (!/^[0-9+()\s-]{7,}$/.test(values.phone)) next.phone = "Introdu un număr de telefon valid.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Introdu o adresă de e-mail validă.";
    if (!values.address.trim()) next.address = "Introdu adresa de livrare.";
    if (!values.city.trim()) next.city = "Introdu localitatea.";
    if (!values.county.trim()) next.county = "Introdu județul.";
    if (!/^\d{6}$/.test(values.postalCode)) next.postalCode = "Codul poștal trebuie să aibă 6 cifre.";
    if (!values.termsAccepted) next.termsAccepted = "Trebuie să accepți termenii și condițiile.";
    if (!values.ageConfirmed) next.ageConfirmed = "Trebuie să confirmi că ai peste 18 ani.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (lines.length === 0 || !validate()) return;

    setLoading(true);
    // Demo checkout — no real payment provider is wired in yet (see /termeni-si-conditii).
    window.setTimeout(() => {
      const summary = {
        lines: lines.map((line) => ({
          name: allProducts[line.productId].name,
          quantity: line.quantity,
          price: allProducts[line.productId].price,
        })),
        total: totals.total,
        fullName: values.fullName,
        email: values.email,
      };
      clearCart();
      setLoading(false);
      navigate("/comanda-confirmata", { state: summary });
    }, 1400);
  };

  if (lines.length === 0) {
    return (
      <>
        <PageHero eyebrow="Checkout" title="Coșul tău este gol." />
        <section className="container-edit pb-32 text-center">
          <Link to="/#pachete" className="btn-primary">
            Descoperă jocurile
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Checkout" title="Finalizează comanda." />
      <section className="container-edit grid gap-14 pb-28 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <Reveal>
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
            <fieldset className="flex flex-col gap-5">
              <legend className="font-serif text-2xl text-bone">Date de contact</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Nume complet" htmlFor="fullName" error={errors.fullName}>
                  <input
                    id="fullName"
                    className="field-input"
                    value={values.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                    autoComplete="name"
                  />
                </FormField>
                <FormField label="Telefon" htmlFor="phone" error={errors.phone}>
                  <input
                    id="phone"
                    type="tel"
                    className="field-input"
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    autoComplete="tel"
                  />
                </FormField>
              </div>
              <FormField label="E-mail" htmlFor="email" error={errors.email}>
                <input
                  id="email"
                  type="email"
                  className="field-input"
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  autoComplete="email"
                />
              </FormField>
            </fieldset>

            <fieldset className="flex flex-col gap-5">
              <legend className="font-serif text-2xl text-bone">Adresă de livrare</legend>
              <FormField label="Adresă" htmlFor="address" error={errors.address}>
                <input
                  id="address"
                  className="field-input"
                  value={values.address}
                  onChange={(e) => set("address", e.target.value)}
                  aria-invalid={Boolean(errors.address)}
                  autoComplete="street-address"
                />
              </FormField>
              <div className="grid gap-5 sm:grid-cols-3">
                <FormField label="Localitate" htmlFor="city" error={errors.city}>
                  <input
                    id="city"
                    className="field-input"
                    value={values.city}
                    onChange={(e) => set("city", e.target.value)}
                    aria-invalid={Boolean(errors.city)}
                    autoComplete="address-level2"
                  />
                </FormField>
                <FormField label="Județ" htmlFor="county" error={errors.county}>
                  <input
                    id="county"
                    className="field-input"
                    value={values.county}
                    onChange={(e) => set("county", e.target.value)}
                    aria-invalid={Boolean(errors.county)}
                    autoComplete="address-level1"
                  />
                </FormField>
                <FormField label="Cod poștal" htmlFor="postalCode" error={errors.postalCode}>
                  <input
                    id="postalCode"
                    className="field-input"
                    value={values.postalCode}
                    onChange={(e) => set("postalCode", e.target.value)}
                    aria-invalid={Boolean(errors.postalCode)}
                    autoComplete="postal-code"
                    inputMode="numeric"
                  />
                </FormField>
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-3">
              <legend className="font-serif text-2xl text-bone">Metoda de livrare</legend>
              <RadioOption
                name="deliveryMethod"
                value="standard"
                checked={values.deliveryMethod === "standard"}
                onChange={() => set("deliveryMethod", "standard")}
                label={`Livrare standard — ${formatPrice(SHIPPING.standardCost)}`}
                description={`Estimat ${SHIPPING.estimatedDays} zile lucrătoare.`}
              />
              <RadioOption
                name="deliveryMethod"
                value="express"
                checked={values.deliveryMethod === "express"}
                onChange={() => set("deliveryMethod", "express")}
                label="Livrare express"
                description="Disponibilă la lansarea oficială a magazinului."
              />
            </fieldset>

            <fieldset className="flex flex-col gap-3">
              <legend className="font-serif text-2xl text-bone">Metoda de plată</legend>
              <RadioOption
                name="paymentMethod"
                value="card"
                checked={values.paymentMethod === "card"}
                onChange={() => set("paymentMethod", "card")}
                label="Plată online cu cardul"
                description="Checkout demonstrativ — integrare reală cu Stripe/Netopia în pregătire."
              />
              <RadioOption
                name="paymentMethod"
                value="cod"
                checked={values.paymentMethod === "cod"}
                onChange={() => set("paymentMethod", "cod")}
                label="Ramburs la livrare"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-4 border-t border-bone/10 pt-6">
              <CheckboxOption
                checked={values.ageConfirmed}
                onChange={(v) => set("ageConfirmed", v)}
                error={errors.ageConfirmed}
                label="Confirm că am peste 18 ani."
              />
              <CheckboxOption
                checked={values.termsAccepted}
                onChange={(v) => set("termsAccepted", v)}
                error={errors.termsAccepted}
                label={
                  <>
                    Am citit și accept{" "}
                    <Link to="/termeni-si-conditii" className="underline hover:text-bone">
                      termenii și condițiile
                    </Link>
                    .
                  </>
                }
              />
            </fieldset>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Se procesează comanda…" : `Plasează comanda — ${formatPrice(totals.total)}`}
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-panel rounded-3xl px-7 py-8">
            <h2 className="font-serif text-2xl text-bone">Rezumatul comenzii</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {lines.map((line) => {
                const product = allProducts[line.productId];
                return (
                  <li key={line.productId} className="flex justify-between font-sans text-sm">
                    <span className="text-bone">
                      {product.name} × {line.quantity}
                    </span>
                    <span className="text-smoke">{formatPrice(product.price * line.quantity)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 flex flex-col gap-2 border-t border-bone/10 pt-5 font-sans text-sm text-smoke">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-bone">{formatPrice(totals.subtotal)}</span>
              </div>
              {totals.discountPct > 0 && (
                <div className="flex justify-between text-ember">
                  <span>Reducere ({totals.discountPct}%)</span>
                  <span>-{formatPrice(totals.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Livrare</span>
                <span className="text-bone">
                  {totals.shipping === 0 ? "Gratuită" : formatPrice(SHIPPING.standardCost)}
                </span>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-bone/10 pt-5">
              <span className="font-serif text-xl text-bone">Total</span>
              <span className="font-serif text-xl text-bone">{formatPrice(totals.total)}</span>
            </div>
            <p className="mt-5 font-sans text-xs text-smoke">{SHIPPING.discreetPackagingNote}</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function RadioOption({
  name,
  value,
  checked,
  onChange,
  label,
  description,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  description?: string;
}) {
  return (
    <label
      className={`glass-panel flex cursor-pointer items-start gap-3 rounded-xl px-5 py-4 transition-colors ${
        checked ? "border-ember/60" : ""
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 accent-ember"
      />
      <span>
        <span className="block font-sans text-sm font-semibold text-bone">{label}</span>
        {description && <span className="mt-0.5 block font-sans text-xs text-smoke">{description}</span>}
      </span>
    </label>
  );
}

function CheckboxOption({
  checked,
  onChange,
  label,
  error,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label className="flex items-start gap-2.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-3.5 w-3.5 shrink-0 accent-ember"
          aria-invalid={Boolean(error)}
        />
        <span className="font-sans text-sm text-smoke">{label}</span>
      </label>
      {error && (
        <p className="mt-1 font-sans text-xs text-ember" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
