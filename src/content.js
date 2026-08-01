/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL SITE COPY LIVES HERE. THIS IS THE ONLY FILE YOU NEED TO EDIT.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Taken from the emailsbyandreea.com homepage source, so names, URLs and
 *  figures are exact rather than read off a screenshot.
 *
 *  One thing is still ⟨PLACEHOLDER⟩: the per-brand pitch lines in `work`. The
 *  live site shows those logos with no copy attached to any of them, so there
 *  is nothing to transcribe — and client results are not worth guessing at.
 *
 *  Sections size themselves from array length: add a fourth pillar or an
 *  eighth work card and the layout follows.
 */

export const brand = {
  // Split across two lines in the hero. Each character animates in individually.
  wordmarkTop: 'emails',
  wordmarkBottom: 'by Andreea',
  subtitle: 'High-Performance Email Marketing for E-commerce Brands',
  documentTitle: 'Expert E-commerce Email Marketing — Emails by Andreea',
  metaDescription:
    'I architect high-performance email systems to drive retention and boost Customer Lifetime Value. Scale your revenue today.',
};

/** Canonical destinations, matching the live site's routes. */
export const links = {
  home: 'https://emailsbyandreea.com/',
  about: 'https://emailsbyandreea.com/about/',
  contact: 'https://emailsbyandreea.com/contact/',
  services: 'https://emailsbyandreea.com/services/',
  reviews: 'https://emailsbyandreea.com/reviews/',
  email: 'mailto:contact@emailsbyandreea.com',
  instagram: 'https://www.instagram.com/emailsby.andreea/',
  facebook: 'https://www.facebook.com/profile.php?id=61569190987440',
  linkedin: 'https://www.linkedin.com/in/andreea-p%C4%83curar-1a7b8924b/',
};

export const scrollCue = 'scroll';

/* ───────────────────────────── STATS STRIP ───────────────────────────────── */

/*
 * `value`   — the number the counter animates up to
 * `prefix`  — sits before the number, in the number's colour (e.g. '$')
 * `unit`    — sits after the number, in the number's colour (e.g. 'M')
 * `suffix`  — sits last, in the accent colour (e.g. '+')
 * `decimals`— decimal places shown while counting
 */
export const stats = [
  {
    value: 20,
    prefix: '',
    unit: '',
    suffix: '+',
    decimals: 0,
    label: 'Accounts Managed',
  },
  {
    value: 10,
    prefix: '',
    unit: 'M',
    suffix: '+',
    decimals: 0,
    label: 'Newsletters Sent',
  },
  {
    value: 100,
    prefix: '',
    unit: '',
    suffix: '+',
    decimals: 0,
    label: 'Campaigns Engineered',
  },
];

/* ─────────────────────────── THREE PILLARS ───────────────────────────────── */

export const pillarsSection = {
  eyebrow: 'what I do',
  heading: 'Three Pillars',
};

export const pillars = [
  {
    index: '01',
    title: 'Revenue & CLTV Growth',
    body: 'Directly attribute email performance to increased sales and higher Customer Lifetime Value.',
  },
  {
    index: '02',
    title: 'Deepened Customer Loyalty',
    body: 'Deliver targeted content that drives repeat purchases and measurable audience engagement.',
  },
  {
    index: '03',
    title: 'Strategic Automation',
    body: 'Implement data-driven flows and segmentation for a predictable Return on Investment (ROI).',
  },
];

/* ───────────────────────────── WORK / BRANDS ─────────────────────────────────
 * Brand names are taken from the "Brands Managed" strip. The pitch lines are
 * placeholders: the live site attaches no copy to these logos, and writing
 * client results that you did not publish is not something to guess at.
 * Delete the `metric` key on any card to hide its chip.
 */

export const workSection = {
  eyebrow: 'selected work',
  heading: 'Brands Managed',
};

// Order matches the "Brands Managed" carousel on the live site.
export const work = [
  { brand: 'SMP Courier', pitch: '⟨PLACEHOLDER⟩ One line on what you did for them.', metric: '' },
  { brand: 'Obaby', pitch: '⟨PLACEHOLDER⟩ One line on what you did for them.', metric: '' },
  { brand: 'NOR', pitch: '⟨PLACEHOLDER⟩ One line on what you did for them.', metric: '' },
  { brand: 'Magnet Travel', pitch: '⟨PLACEHOLDER⟩ One line on what you did for them.', metric: '' },
  { brand: 'Somproduct', pitch: '⟨PLACEHOLDER⟩ One line on what you did for them.', metric: '' },
  {
    brand: 'Dezvoltare Copii & Adolescenți',
    pitch: '⟨PLACEHOLDER⟩ One line on what you did for them.',
    metric: '',
  },
  { brand: 'BLENN Events', pitch: '⟨PLACEHOLDER⟩ One line on what you did for them.', metric: '' },
];

/* ──────────────────────────────── FINALE ─────────────────────────────────── */

export const finale = {
  eyebrow: 'data. strategy. results.',
  headingTop: 'work',
  headingBottom: 'with me',
  body: 'Let’s discuss how to integrate high-performance email architecture into your brand’s ecosystem to drive sustainable revenue.',
  buttons: [
    { label: 'Work with me', href: links.contact, primary: true },
    { label: 'Email me', href: links.email, primary: false },
  ],
};

export const footer = {
  note: '© 2026 Emails by Andreea',
  links: [
    { label: 'Instagram', href: links.instagram },
    { label: 'Facebook', href: links.facebook },
    { label: 'LinkedIn', href: links.linkedin },
    { label: 'Services', href: links.services },
    { label: 'Reviews', href: links.reviews },
    { label: 'Contact', href: links.contact },
  ],
};
