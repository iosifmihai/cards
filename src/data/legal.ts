export interface LegalSection {
  heading: string;
  body: string[];
}

export const AGE_RESTRICTION_NOTICE =
  "Produsele Naughty Cards sunt destinate exclusiv persoanelor de peste 18 ani.";

export const CONSENT_NOTICE_GENERAL =
  "Toate provocările trebuie realizate numai cu acordul tuturor participanților. Orice jucător poate refuza o carte fără să fie obligat să ofere explicații.";

export const CONSENT_NOTICE_NO_LIMITS =
  "No Limits conține întrebări și provocări cu un nivel ridicat de intimitate. Jocul trebuie să se bazeze întotdeauna pe comunicare, încredere și consimțământ.";

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "1. Obiectul contractului",
    body: [
      "Acești termeni și condiții reglementează utilizarea website-ului Naughty Cards și achiziționarea produselor prezentate, respectiv jocurile de cărți „Naughty Cards — Slow Burn” și „Naughty Cards — No Limits”.",
      "Acest website și magazinul asociat sunt în etapă de pregătire pentru lansare. Prețurile, termenele de livrare și metodele de plată afișate sunt provizorii și vor fi confirmate oficial înaintea deschiderii comenzilor reale.",
    ],
  },
  {
    heading: "2. Restricție de vârstă",
    body: [
      AGE_RESTRICTION_NOTICE,
      "Prin plasarea unei comenzi, confirmi că ai împlinit vârsta de 18 ani.",
    ],
  },
  {
    heading: "3. Comenzi și plăți",
    body: [
      "Comenzile pot fi plasate prin website. Confirmarea comenzii nu implică o obligație de livrare până la validarea finală a plății și a stocului.",
      "Arhitectura de plată este pregătită pentru integrare cu furnizori precum Stripe sau Netopia. Până la activarea unui furnizor real, checkout-ul funcționează în regim demonstrativ.",
    ],
  },
  {
    heading: "4. Livrare",
    body: [
      "Consultă Politica de livrare pentru detalii privind termenele și costurile estimative.",
    ],
  },
  {
    heading: "5. Retur",
    body: ["Consultă Politica de retur pentru condițiile și termenele aplicabile."],
  },
  {
    heading: "6. Proprietate intelectuală",
    body: [
      "Conținutul, designul, textele și elementele grafice ale website-ului aparțin Naughty Cards și nu pot fi reproduse fără acord scris.",
    ],
  },
  {
    heading: "7. Contact",
    body: ["Pentru întrebări legate de acești termeni, folosește pagina de Contact."],
  },
];

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "1. Ce date colectăm",
    body: [
      "Colectăm datele furnizate voluntar prin formularele de comandă, contact și newsletter: nume, e-mail, telefon, adresă de livrare.",
    ],
  },
  {
    heading: "2. Cum folosim datele",
    body: [
      "Datele sunt folosite exclusiv pentru procesarea comenzilor, comunicarea legată de acestea și, cu acordul tău explicit, pentru comunicări de marketing.",
    ],
  },
  {
    heading: "3. Confidențialitatea comenzii",
    body: [
      "Înțelegem sensibilitatea produselor comercializate. Datele legate de conținutul comenzii nu sunt partajate cu terți în afara celor strict necesari livrării (curier, procesator de plăți).",
    ],
  },
  {
    heading: "4. Drepturile tale",
    body: [
      "Ai dreptul de acces, rectificare, ștergere și portabilitate a datelor tale, conform legislației aplicabile privind protecția datelor.",
    ],
  },
  {
    heading: "5. Contact",
    body: ["Pentru solicitări privind datele tale personale, folosește pagina de Contact."],
  },
];

export const COOKIES_SECTIONS: LegalSection[] = [
  {
    heading: "1. Ce sunt cookie-urile",
    body: [
      "Cookie-urile sunt fișiere text mici stocate în browserul tău, folosite pentru funcționarea corectă a website-ului și pentru îmbunătățirea experienței de navigare.",
    ],
  },
  {
    heading: "2. Cookie-uri folosite",
    body: [
      "Folosim cookie-uri esențiale (coș de cumpărături, confirmarea vârstei), cookie-uri de preferințe și, opțional, cookie-uri de analiză a traficului.",
    ],
  },
  {
    heading: "3. Controlul cookie-urilor",
    body: [
      "Poți controla și șterge cookie-urile din setările browserului tău în orice moment.",
    ],
  },
];

export const RETURN_SECTIONS: LegalSection[] = [
  {
    heading: "1. Dreptul de retur",
    body: [
      "Poți solicita returnarea produsului în termenul legal de retragere, cu condiția ca produsul să fie nedesfăcut și în ambalajul original, din motive de igienă și confidențialitate a conținutului.",
    ],
  },
  {
    heading: "2. Procesul de retur",
    body: [
      "Contactează-ne prin pagina de Contact, categoria „Retur”, indicând numărul comenzii. Vei primi instrucțiuni pentru returul produsului.",
    ],
  },
  {
    heading: "3. Rambursarea",
    body: [
      "Rambursarea se face prin aceeași metodă de plată folosită la comandă, în termenul legal de la primirea produsului returnat.",
    ],
  },
];

export const SHIPPING_SECTIONS: LegalSection[] = [
  {
    heading: "1. Zone de livrare",
    body: ["Livrăm în prezent la nivel național. Livrarea internațională va fi anunțată separat."],
  },
  {
    heading: "2. Termene de livrare",
    body: [`Termenul estimat de livrare este de [INTERVAL LIVRARE] zile lucrătoare de la confirmarea comenzii.`],
  },
  {
    heading: "3. Costuri de livrare",
    body: [
      "Costul standard de livrare este [COST LIVRARE] lei. Livrarea este gratuită pentru comenzi care depășesc pragul afișat în coș.",
    ],
  },
  {
    heading: "4. Ambalaj discret",
    body: [
      "Comanda este expediată într-un ambalaj exterior neutru, fără informații vizibile despre conținut.",
    ],
  },
];

export const CONTACT_CATEGORIES = [
  "Întrebare despre comandă",
  "Livrare",
  "Retur",
  "Colaborare",
  "Presă și creatori",
  "Altceva",
];

export const CONTACT_DETAILS = {
  email: "contact@naughtycards.ro",
  phone: "+40 [NUMĂR TELEFON]",
  hours: "Luni – Vineri, 10:00 – 18:00",
};
