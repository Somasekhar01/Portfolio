# Somasekhar Ravada — Portfolio

A responsive, accessible portfolio built with plain HTML, CSS, and JavaScript. No build step or package installation is needed.

## Run locally

Open `index.html` in a browser, or serve this folder with any static file server. For example, with Python installed:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

### Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the framework preset as **Other**. Leave the build command empty and set the output directory to `.`.
4. Deploy. Vercel will serve `index.html` as the home page.

### GitHub Pages

1. Push the files to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select the `main` branch and `/ (root)`, then save.
4. After the workflow finishes, open the Pages URL shown in settings.

The site is static, so these steps deploy it without a server or build pipeline.

## Site map

- **Home:** introduction, availability, and calls to action
- **About:** personal bio and current focus
- **Skills:** languages, web technologies, AI, platforms, and collaboration skills
- **Experience:** internship and summer training timeline
- **Projects:** Agri-Vision, ProxiSpeak, Shop-Ease, Logistics Application, and Hotel Booking
- **Education:** a separate set of academic cards for university, senior secondary, and secondary school
- **Credentials:** Coursera certificates
- **Testimonials:** intentionally marked “coming soon”; no endorsements were provided
- **Resume:** `resume.html`; use **Print / Save as PDF** in a browser to export it
- **Contact:** email links and a mailto-based contact form

## Brand notes

**Bio:** I’m a Web Developer Intern at Infotact Solutions, where I’m building real-time collaboration experiences with React, Node.js, and MongoDB. Alongside my internship, I’m pursuing Computer Science and Engineering at Lovely Professional University. At Infotact, I’m developing ProxiSpeak—a virtual office platform designed to bring back the spontaneous conversations of working side by side. Outside my internship, I’ve built projects for agriculture, online shopping, logistics, and travel.

**Tagline options**

1. Building useful things for the real world.
2. Thoughtful web experiences, built end to end.
3. From practical problems to working products.
4. Curious by default. Building with purpose.
5. Making the web more useful, one project at a time.

**Palette options**

1. Selected: warm stone `#F3F1E9`, ink `#171A29`, cobalt `#3549E8`, electric lime `#D7FF58`.
2. Forest & cream: `#F3F1E8`, `#1D3028`, `#B86D4D`, `#95A184`.
3. Ink & sky: `#F4F5F7`, `#202633`, `#5277A5`, `#D29662`.

**Typography pairings**

1. Selected: Manrope + DM Sans + DM Mono (display, body, labels).
2. Fraunces + Inter + IBM Plex Mono.
3. Space Grotesk + Source Sans 3 + JetBrains Mono.

**Favicon concept:** “SR” initials in a rounded forest-green square with a terracotta accent dot (`favicon.svg`).

## UI and responsive behavior

- Sticky navigation with a compact mobile menu and persistent light/dark theme preference.
- A deep-space theme runs throughout, with a twinkling starfield and cratered full moon behind the page content.
- Hero pairs the introduction and CTAs with a cosmic gradient and animated monogram.
- About and skills use editorial two-column and grouped-badge layouts.
- Projects use responsive, text-first cards with concise descriptions, technology badges, and repository/live links.
- Experience uses a vertical timeline; on narrow screens, dates move above each entry.
- Contact has a mailto form; it opens the visitor’s configured email app and does not transmit or store form data.
- Ambient space motion and reveal animations respect `prefers-reduced-motion`; layouts collapse to one column on small screens.

## Content and assets

- `index.html` — portfolio content, section structure, and SEO/Open Graph metadata
- `styles.css` — selected palette, typography, layouts, dark theme, and responsive styles
- `script.js` — mobile navigation, saved theme, animated space canvas, reveal animation, and email form
- `resume.html` — printable resume page; browser print dialog can save it as PDF
- `favicon.svg` — monogram favicon
- External asset: Google Fonts (DM Sans, Manrope, DM Mono); no project images are required.

No performance metrics were included in the supplied CV, so project copy describes implemented features and scope without inventing numerical results. Before publishing, verify that the dates and links are current and replace the testimonials-coming-soon note only when genuine testimonials are available.
