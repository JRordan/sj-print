// All the content that was hardcoded in HTML, now structured data.
// Edit copy here without touching markup.

export const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export const heroStats = [
  { num: 'Same-Day', sup: '', label: 'Printing Available' },
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
    title: 'Delivered to you',
    text: 'Same-day, free Bay Area delivery on orders over $250. Ordered to Shipped in 2 hours.',
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
    num: 'Starting at $35 / 100',
    name: 'Business Cards',
    desc: 'Standard, premium 32pt, soft-touch, foil, letterpress, and edge-painted finishes.',
    image: '/images/services/business-cards.jpg',
  },
  {
    num: 'Starting at $0.72 / each',
    name: 'Brochures & Flyers',
    desc: 'Tri-folds, bi-folds, gate-folds, and saddle-stitched booklets. Coated and uncoated stocks up to 100lb cover.',
    image: '/images/services/brochures.jpg',
  },
  {
    num: 'Starting at $24',
    name: 'Large-Format Signage',
    desc: 'Banners, pop-up displays, foam board, A-frames, and wall-mount graphics up to 96 inches wide.',
    image: '/images/services/signage.jpg',
  },
  {
    num: 'Starting at $0.30 / each',
    name: 'Stickers & Decals',
    desc: 'Die-cut, kiss-cut, holographic, transparent, and weatherproof vinyl. Sheet and roll formats available.',
    image: '/images/services/stickers.jpg',
  },
  {
    num: 'Starting at $0.12 / page',
    name: 'Event Collateral',
    desc: 'Programs, name badges, lanyards, table tents, and wayfinding for conferences, weddings, and pop-ups.',
    image: '/images/services/events.jpg',
  },
  {
    num: 'Custom Quote',
    name: 'Specialty Finishes',
    desc: 'Foil stamping, embossing, debossing, spot UV, letterpress, and edge painting for premium projects.',
    image: '/images/services/specialty.jpg',
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
  { category: 'Real Estate', title: 'Property Listing Flyer', image: '/images/portfolio/product10.jpeg' },
  { category: 'Real Estate', title: 'Open House Postcard', image: '/images/portfolio/product1.jpeg' },
  { category: 'Real Estate', title: 'Open House Mailer', image: '/images/portfolio/product5.jpeg' },
  { category: 'Real Estate', title: 'Just Sold Postcard', image: '/images/portfolio/product2.jpeg' },
  { category: 'Real Estate', title: 'Just Listed Postcard', image: '/images/portfolio/product6.jpeg' },
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

export const pricing = {
  note: 'Production-ready file required. No file? Design assistance available at $80/hr.',
  categories: [
    {
      id: 'digital',
      label: 'Digital Prints',
      description: 'Full-color prints straight from your files — same-day on most standard sizes.',
      qtys: ['100', '200', '500', '1,000'],
      sides: true,
      items: [
        { name: 'Business Cards',   prices1: ['$35',  '$59',  '$97',  '$143'], prices2: ['$49',  '$76',  '$118', '$157'] },
        { name: 'Postcards 4″×6″', prices1: ['$60',  '$84',  '$138', '$264'], prices2: ['$90',  '$108', '$192', '$378'] },
        { name: 'Postcards 5″×7″', prices1: ['$72',  '$120', '$210', '$318'], prices2: ['$114', '$168', '$330', '$450'] },
        { name: 'Postcards 6″×9″', prices1: ['$84',  '$144', '$264', '$402'], prices2: ['$120', '$192', '$378', '$582'] },
        { name: 'Flyers 8.5″×11″', prices1: ['$72',  '$144', '$330', '$600'], prices2: ['$114', '$228', '$510', '$900'] },
        { name: 'Envelopes',        prices1: ['$70',  '$140', '$300', '$600'], prices2: ['$110', '$220', '$450', '$900'] },
      ],
    },
    {
      id: 'wideformat',
      label: 'Wide-Format',
      description: 'Flatbed printing on rigid and flexible media — banners, canvas, aluminum, acrylic, and more.',
      itemLabel: 'Size',
      qtys: ['Price'],
      items: [
        { group: 'Vinyl Banners' },
        { name: '3′×5′',   prices: ['$136'] },
        { name: '3′×8′',   prices: ['$216'] },
        { name: '4′×8′',   prices: ['$288'] },
        { name: '5′×8′',   prices: ['$360'] },
        { group: 'Paper Posters' },
        { name: '18″×24″', prices: ['$24']  },
        { name: '22″×28″', prices: ['$35']  },
        { name: '24″×36″', prices: ['$48']  },
        { group: 'Canvas Prints' },
        { name: '18″×24″', prices: ['$50']  },
        { name: '24″×36″', prices: ['$101'] },
        { group: 'Magnetic Signs' },
        { name: '12″×18″', prices: ['$48']  },
        { name: '18″×24″', prices: ['$96']  },
        { group: 'Retractable Banners' },
        { name: '2′ wide', prices: ['$210'] },
        { name: '3′ wide', prices: ['$302'] },
        { group: 'Aluminum Signs' },
        { name: '18″×24″', prices: ['$108'] },
        { name: '24″×36″', prices: ['$216'] },
        { group: 'Acrylic Prints' },
        { name: '18″×24″', prices: ['$126'] },
        { name: '24″×36″', prices: ['$252'] },
        { group: 'Round Stickers' },
        { name: '1″',       prices: ['$0.30 ea'] },
        { name: '2″',       prices: ['$0.54 ea'] },
      ],
    },
    {
      id: 'copies',
      label: 'Copies',
      description: 'Walk-in copies at the counter — black & white and full color in three paper sizes.',
      itemLabel: 'Size',
      qtys: ['1-Sided', '2-Sided'],
      items: [
        { group: 'B&W — White Paper' },
        { name: '8.5″×11″', prices: ['$0.12', '$0.24'] },
        { name: '8.5″×14″', prices: ['$0.18', '$0.36'] },
        { name: '11″×17″',  prices: ['$0.30', '$0.60'] },
        { group: 'B&W — Color Paper' },
        { name: '8.5″×11″', prices: ['$0.18', '$0.36'] },
        { name: '8.5″×14″', prices: ['$0.24', '$0.48'] },
        { name: '11″×17″',  prices: ['$0.36', '$0.72'] },
        { group: 'Full Color' },
        { name: '8.5″×11″', prices: ['$0.72', '$1.14'] },
        { name: '8.5″×14″', prices: ['$1.14', '$1.80'] },
        { name: '11″×17″',  prices: ['$1.68', '$2.40'] },
        { group: 'Scan & Email' },
        { name: 'Per side',  prices: ['$0.30', '—']    },
      ],
    },
  ],
};

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
      { href: 'tel:4086939146', label: '(408) 693-9146' },
      { href: 'mailto:wecare@sjprint.us', label: 'wecare@sjprint.us' },
      { href: null, label: 'Mon–Fri · 8am–6pm' },
    ],
  },
];
