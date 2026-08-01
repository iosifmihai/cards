/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL SITE COPY LIVES HERE. THIS IS THE ONLY FILE YOU NEED TO EDIT.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Transcribed from the emailsbyandreea.com homepage. Two things could not be
 *  read off the page and are still marked ⟨PLACEHOLDER⟩:
 *
 *    - the per-brand pitch lines in `work` — the live site shows brand logos
 *      only, with no description attached to any of them, so there is nothing
 *      to transcribe and nothing here is invented on your behalf
 *    - the social URLs in `footer` — the live site renders them as icons, so
 *      the hrefs aren't visible
 *
 *  Sections size themselves from array length: add a fourth pillar or a
 *  seventh work card and the layout follows.
 */

export const brand = {
  // Split across two lines in the hero. Each character animates in individually.
  wordmarkTop: 'emails',
  wordmarkBottom: 'by Andreea',
  subtitle: 'High-Performance Email Marketing for E-commerce Brands',
  documentTitle: 'emails by Andreea — High-Performance Email Marketing',
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

export const work = [
  {
    brand: 'BLENN',
    pitch: '⟨PLACEHOLDER⟩ One line on what you did for them.',
    metric: '',
  },
  {
    brand: 'SMP Courier',
    pitch: '⟨PLACEHOLDER⟩ One line on what you did for them.',
    metric: '',
  },
  {
    brand: 'oBaby',
    pitch: '⟨PLACEHOLDER⟩ One line on what you did for them.',
    metric: '',
  },
  {
    brand: 'NOR',
    pitch: '⟨PLACEHOLDER⟩ One line on what you did for them.',
    metric: '',
  },
  {
    brand: 'SOMPRODUCT',
    pitch: '⟨PLACEHOLDER⟩ One line on what you did for them.',
    metric: '',
  },
  {
    // Sixth logo in the strip is a crest that doesn't resolve at screenshot
    // resolution — replace with the real name.
    brand: '⟨PLACEHOLDER⟩ Sixth brand',
    pitch: '⟨PLACEHOLDER⟩ One line on what you did for them.',
    metric: '',
  },
];

/* ──────────────────────────────── FINALE ─────────────────────────────────── */

export const finale = {
  eyebrow: 'data. strategy. results.',
  headingTop: 'work',
  headingBottom: 'with me',
  body: 'Let’s discuss how to integrate high-performance email architecture into your brand’s ecosystem to drive sustainable revenue.',
  buttons: [
    { label: 'Work with me', href: 'https://emailsbyandreea.com/', primary: true },
    { label: 'Contact me', href: 'https://emailsbyandreea.com/', primary: false },
  ],
};

export const footer = {
  note: '© 2026 emails by Andreea',
  links: [
    { label: 'Instagram', href: '⟨PLACEHOLDER⟩' },
    { label: 'Facebook', href: '⟨PLACEHOLDER⟩' },
    { label: 'LinkedIn', href: '⟨PLACEHOLDER⟩' },
    { label: 'Website', href: 'https://emailsbyandreea.com/' },
  ],
};
