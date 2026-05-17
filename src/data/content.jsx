// All the content that was hardcoded in HTML, now structured data.
// Edit copy here without touching markup.

export const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export const heroStats = [
  { num: '5,000', sup: '+', label: 'Pieces printed this year' },
  { num: '2', sup: 'hr', label: 'Turnaround on most jobs' },
  { num: '100', sup: '%', label: 'Satisfaction Guarenteed' },
];

export const marqueeItems = [
  'Legal Documents',
  'Business Cards',
  'Brochures',
  'Large-Format Signage',
  'Event Collateral',
  'Stickers & Decals',
  'Foil & Letterpress',
];

export const howSteps = [
  {
    num: '— 01',
    title: 'Upload your design',
    text: 'Drop in a PDF, AI, PSD, or PNG. Not press-ready? Our prepress team will flag bleed, color, and resolution issues before anything hits the press.',
    icon: (
      <path d="M12 3v12M7 8l5-5 5 5M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
    ),
  },
  {
    num: '— 02',
    title: 'Approve a proof',
    text: 'A free digital proof within four business hours. Need a physical proof on your final stock? We do those too — typically same-day pickup.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    num: '— 03',
    title: 'Pickup or delivery',
    text: 'Same-day local pickup at our San Jose shop, free Bay Area delivery on orders over $250, or carbon-neutral nationwide shipping.',
    icon: (
      <>
        <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
        <path d="M3 7l9 4 9-4M12 11v10" />
      </>
    ),
  },
];

export const services = [
  {
    num: '01',
    name: 'Business Cards',
    desc: 'Standard, premium 32pt, soft-touch, foil, letterpress, and edge-painted finishes. Starting at $39 / 100.',
  },
  {
    num: '02',
    name: 'Brochures & Flyers',
    desc: 'Tri-folds, bi-folds, gate-folds, and saddle-stitched booklets. Coated and uncoated stocks up to 100lb cover.',
  },
  {
    num: '03',
    name: 'Large-Format Signage',
    desc: 'Banners, pop-up displays, foam board, A-frames, and wall-mount graphics up to 96 inches wide.',
  },
  {
    num: '04',
    name: 'Stickers & Decals',
    desc: 'Die-cut, kiss-cut, holographic, transparent, and weatherproof vinyl. Sheet and roll formats available.',
  },
  {
    num: '05',
    name: 'Event Collateral',
    desc: 'Programs, name badges, lanyards, table tents, and wayfinding for conferences, weddings, and pop-ups.',
  },
  {
    num: '06',
    name: 'Specialty Finishes',
    desc: 'Foil stamping, embossing, debossing, spot UV, letterpress, and edge painting for premium projects.',
  },
];

export const benefits = [
  {
    title: '2 Hour Turnaround',
    text: 'Most stock orders ship in San Jose within two hours.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: 'Free Prepress Review',
    text: 'Every file is checked by a real person for bleed, color, and resolution before going to press. No surprise reprints.',
    icon: (
      <>
        <path d="M9 11l3 3 7-7" />
        <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
      </>
    ),
  },
  {
    title: 'Color-Accurate Proofs',
    text: "G7-certified workflow with calibrated proofing on the actual stock you're ordering. What you approve is what you get.",
    icon: (
      <>
        <path d="M3 12l2-2 4 4 8-8 4 4" />
        <path d="M3 18h18" />
      </>
    ),
  },
  {
    title: 'Bay Area Delivery',
    text: 'Free local delivery on orders over $250 across San Jose, Oakland, and San Francisco. Same-day pickup always available.',
    icon: (
      <>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </>
    ),
  },
];

export const portfolio = [
  { category: 'Branding', title: 'Cardinal Coffee Co. Identity System', bg: 'pt-1' },
  { category: 'Packaging', title: 'Heartwood Wine Labels', bg: 'pt-2' },
  { category: 'Apparel', title: 'Stellar Labs Merch Run', bg: 'pt-3' },
  { category: 'Signage', title: 'Mission Realty Banners', bg: 'pt-4' },
  { category: 'Event', title: 'SF Design Week 2026', bg: 'pt-5' },
];

export const testimonials = [
  {
    text: 'Their prepress team caught a color issue in our packaging that would have cost us thousands to reprint. That kind of attention to detail is rare.',
    initials: 'MK',
    name: 'Maya Krishnan',
    role: 'Co-founder, Heartwood Wines',
  },
  {
    text: "We've been ordering business cards from the brothers for four years. Quality is consistent, turnaround is faster than any online printer, and the texture on the soft-touch is unmatched.",
    initials: 'DR',
    name: 'Daniel Reyes',
    role: 'Partner, Mission Realty Group',
  },
  {
    text: "Needed 200 conference programs printed in 36 hours. They didn't blink. Showed up early to the venue with everything boxed, sorted, and ready to go.",
    initials: 'AL',
    name: 'Aisha Lin',
    role: 'Events Lead, SF Design Week',
  },
];

export const footerColumns = [
  {
    heading: 'Services',
    links: [
      { href: '#services', label: 'Business Cards' },
      { href: '#services', label: 'Brochures' },
      { href: '#services', label: 'Large Format' },
      { href: '#services', label: 'Apparel' },
      { href: '#services', label: 'Packaging' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '#about', label: 'About' },
      { href: '#work', label: 'Portfolio' },
      { href: '#reviews', label: 'Reviews' },
      { href: '#', label: 'Sustainability' },
      { href: '#', label: 'Careers' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { href: 'tel:4085027260', label: '(408) 502-7264' },
      { href: 'mailto:wecare@sjprint.us', label: 'wecare@sjprint.us' },
      { href: null, label: 'Mon–Fri · 8am–6pm' },
    ],
  },
];
