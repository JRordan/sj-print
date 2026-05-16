# SJ Print — React version

Same site as the original `index.html`, restructured as a React/Vite project so
you can see the code-behind difference.

## Run it

```bash
npm install
npm run dev
```

## Structure

```
index.html              ← minimal shell, just mounts React
src/
  main.jsx              ← entry point
  App.jsx               ← composes all sections (see at-a-glance page layout)
  styles.css            ← original <style> block, extracted verbatim
  hooks/
    useFadeUp.js        ← replaces the scroll-reveal <script> tag
  data/
    content.jsx         ← all copy/content as plain JS data
  components/
    Logo.jsx            ← shared between Nav and Footer (was duplicated in HTML)
    Nav.jsx
    Hero.jsx
    HowItWorks.jsx
    Services.jsx
    Benefits.jsx
    Portfolio.jsx
    Testimonials.jsx
    CTA.jsx
    Footer.jsx
```

## What changed vs. the original

Nothing visual. Same DOM, same CSS, same fonts, same scroll-reveal behavior.

What's different is **where the content lives**:

- The logo SVG was duplicated in the nav and footer of the original HTML.
  It's now one `<Logo />` component used twice.
- Service rows, testimonials, portfolio tiles, benefits, marquee items,
  footer links, etc. are now arrays in `data/content.jsx`. Each section
  `.map()`s over its array. Adding a new service = adding one object to
  the `services` array. No markup to copy-paste.
- The inline `<script>` for scroll-reveal is now a `useFadeUp()` hook.
- `class=` is `className=`; the SVG attributes are camelCased
  (`stroke-width` → `strokeWidth`, etc.) — these are React's JSX
  conventions, not behavior changes.

## What you trade for it

- A build step. The original ran by double-clicking the file. This needs
  `npm install` and a dev server.
- A `node_modules` folder (~150 MB).
- The output ships ~140 KB of React runtime that the user's browser has to
  download and parse before the page becomes interactive. The original
  shipped zero JS dependencies.

For a static brochure site like this one, those costs outweigh the wins.
The React structure starts paying off once you add: a CMS, a real contact
form with validation, a portfolio that filters/paginates, routing to
sub-pages, or multiple developers editing in parallel.
