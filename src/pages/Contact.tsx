import { useState, type FormEvent } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { FormField } from "@/components/ui/FormField";
import { CONTACT_CATEGORIES, CONTACT_DETAILS } from "@/data/legal";
import { SOCIAL_LINKS } from "@/data/nav";
import { FlameCheckMark } from "@/components/ui/Monogram";
import { useSEO } from "@/lib/useSEO";

interface FormValues {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  category: CONTACT_CATEGORIES[0],
  subject: "",
  message: "",
};

export default function Contact() {
  useSEO({
    title: "Contact",
    description: "Contactează echipa Naughty Cards pentru întrebări despre comenzi, livrare, retur sau colaborări.",
    path: "/contact",
  });

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Introdu numele tău.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = "Introdu o adresă de e-mail validă.";
    if (!values.subject.trim()) nextErrors.subject = "Introdu subiectul mesajului.";
    if (values.message.trim().length < 10) nextErrors.message = "Mesajul trebuie să aibă cel puțin 10 caractere.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setValues(initialValues);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Scrie-ne."
        description="Pentru întrebări despre comenzi, livrare, retur, colaborări sau presă, folosește formularul de mai jos."
      />

      <section className="container-edit grid gap-16 pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <Reveal>
          {submitted ? (
            <div className="glass-panel flex flex-col items-start gap-4 rounded-2xl px-8 py-10">
              <FlameCheckMark className="h-6 w-6 text-ember" />
              <h2 className="font-serif text-2xl text-bone">Mesajul a fost trimis.</h2>
              <p className="font-sans text-sm text-smoke">
                Îți răspundem cât mai curând, de obicei în {CONTACT_DETAILS.hours}.
              </p>
              <button type="button" onClick={() => setSubmitted(false)} className="btn-secondary mt-2">
                Trimite alt mesaj
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  label="Nume"
                  htmlFor="contact-name"
                  error={errors.name}
                >
                  <input
                    id="contact-name"
                    type="text"
                    value={values.name}
                    onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                    className="field-input"
                    aria-invalid={Boolean(errors.name)}
                  />
                </FormField>
                <FormField label="E-mail" htmlFor="contact-email" error={errors.email}>
                  <input
                    id="contact-email"
                    type="email"
                    value={values.email}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                    className="field-input"
                    aria-invalid={Boolean(errors.email)}
                  />
                </FormField>
              </div>

              <FormField label="Tipul solicitării" htmlFor="contact-category">
                <select
                  id="contact-category"
                  value={values.category}
                  onChange={(e) => setValues((v) => ({ ...v, category: e.target.value }))}
                  className="field-input"
                >
                  {CONTACT_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Subiect" htmlFor="contact-subject" error={errors.subject}>
                <input
                  id="contact-subject"
                  type="text"
                  value={values.subject}
                  onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
                  className="field-input"
                  aria-invalid={Boolean(errors.subject)}
                />
              </FormField>

              <FormField label="Mesaj" htmlFor="contact-message" error={errors.message}>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  className="field-input resize-none"
                  aria-invalid={Boolean(errors.message)}
                />
              </FormField>

              <button type="submit" className="btn-primary self-start">
                Trimite mesajul
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-panel flex flex-col gap-6 rounded-2xl px-8 py-10">
            <div>
              <p className="eyebrow">E-mail</p>
              <p className="mt-2 font-serif text-xl text-bone">{CONTACT_DETAILS.email}</p>
            </div>
            <div>
              <p className="eyebrow">Telefon</p>
              <p className="mt-2 font-serif text-xl text-bone">{CONTACT_DETAILS.phone}</p>
            </div>
            <div>
              <p className="eyebrow">Program</p>
              <p className="mt-2 font-sans text-sm text-smoke">{CONTACT_DETAILS.hours}</p>
            </div>
            <div className="border-t border-bone/10 pt-6">
              <p className="eyebrow">Social</p>
              <div className="mt-3 flex gap-5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-sm text-smoke transition-colors hover:text-bone"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
