/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL SITE COPY LIVES HERE. THIS IS THE ONLY FILE YOU NEED TO EDIT.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Every string marked  ⟨PLACEHOLDER⟩  is a stand-in. I could not reach
 *  emailsbyandreea.com from the build environment (blocked by network policy),
 *  so nothing here is claimed as fact about the real business. Replace each
 *  marked value with the real copy from your site and the whole page updates.
 *
 *  Nothing below affects layout or animation timing — the sections are driven
 *  by array length, so you can add or remove stats / pillars / work items freely.
 */

export const brand = {
  // Split across two lines in the hero. Each character animates in individually.
  wordmarkTop: 'emails',
  wordmarkBottom: 'by Andreea',
  subtitle: 'High-Performance Email Marketing for E-commerce Brands',
  // Shown in the browser tab.
  documentTitle: 'emails by Andreea — High-Performance Email Marketing',
};

export const scrollCue = 'scroll';

/* ───────────────────────────── STATS STRIP ─────────────────────────────────
 * `value` is the number the counter animates up to.
 * `prefix` / `suffix` wrap it (e.g. prefix '$', suffix 'M+').
 * `decimals` controls how many decimal places are shown while counting.
 */
export const stats = [
  {
    value: 0,
    prefix: '$',
    suffix: 'M+',
    decimals: 1,
    label: '⟨PLACEHOLDER⟩ revenue generated',
  },
  {
    value: 0,
    prefix: '',
    suffix: '%',
    decimals: 0,
    label: '⟨PLACEHOLDER⟩ avg. open rate',
  },
  {
    value: 0,
    prefix: '',
    suffix: '+',
    decimals: 0,
    label: '⟨PLACEHOLDER⟩ brands scaled',
  },
  {
    value: 0,
    prefix: '',
    suffix: '%',
    decimals: 0,
    label: '⟨PLACEHOLDER⟩ of revenue from email',
  },
];

/* ─────────────────────────── THREE PILLARS ───────────────────────────────
 * Revealed one at a time as the section scrolls. Add a fourth and it will
 * simply take its turn in the sequence.
 */
export const pillarsSection = {
  eyebrow: 'what I do',
  heading: 'Three Pillars',
};

export const pillars = [
  {
    index: '01',
    title: '⟨PLACEHOLDER⟩ Strategy',
    body: '⟨PLACEHOLDER⟩ One or two sentences describing the first pillar of your offer — what it covers and the outcome it produces for the brand.',
  },
  {
    index: '02',
    title: '⟨PLACEHOLDER⟩ Flows',
    body: '⟨PLACEHOLDER⟩ One or two sentences describing the second pillar of your offer — what it covers and the outcome it produces for the brand.',
  },
  {
    index: '03',
    title: '⟨PLACEHOLDER⟩ Campaigns',
    body: '⟨PLACEHOLDER⟩ One or two sentences describing the third pillar of your offer — what it covers and the outcome it produces for the brand.',
  },
];

/* ───────────────────────────── WORK / BRANDS ─────────────────────────────
 * One card per brand. `metric` is optional — delete the key to hide the chip.
 */
export const workSection = {
  eyebrow: 'selected work',
  heading: 'Brands I’ve Scaled',
};

export const work = [
  {
    brand: '⟨PLACEHOLDER⟩ Brand One',
    pitch: '⟨PLACEHOLDER⟩ A single line on what you did for them.',
    metric: '',
  },
  {
    brand: '⟨PLACEHOLDER⟩ Brand Two',
    pitch: '⟨PLACEHOLDER⟩ A single line on what you did for them.',
    metric: '',
  },
  {
    brand: '⟨PLACEHOLDER⟩ Brand Three',
    pitch: '⟨PLACEHOLDER⟩ A single line on what you did for them.',
    metric: '',
  },
  {
    brand: '⟨PLACEHOLDER⟩ Brand Four',
    pitch: '⟨PLACEHOLDER⟩ A single line on what you did for them.',
    metric: '',
  },
  {
    brand: '⟨PLACEHOLDER⟩ Brand Five',
    pitch: '⟨PLACEHOLDER⟩ A single line on what you did for them.',
    metric: '',
  },
  {
    brand: '⟨PLACEHOLDER⟩ Brand Six',
    pitch: '⟨PLACEHOLDER⟩ A single line on what you did for them.',
    metric: '',
  },
];

/* ──────────────────────────────── FINALE ─────────────────────────────────── */
export const finale = {
  eyebrow: 'let’s talk',
  headingTop: 'work',
  headingBottom: 'with me',
  body: '⟨PLACEHOLDER⟩ A closing line inviting the visitor to get in touch.',
  buttons: [
    { label: 'Book a call', href: '#', primary: true },
    { label: 'Email me', href: 'mailto:⟨PLACEHOLDER⟩', primary: false },
  ],
};

export const footer = {
  note: 'emails by Andreea',
  links: [
    { label: 'Instagram', href: '⟨PLACEHOLDER⟩' },
    { label: 'LinkedIn', href: '⟨PLACEHOLDER⟩' },
    { label: 'Website', href: 'https://emailsbyandreea.com/' },
  ],
};
