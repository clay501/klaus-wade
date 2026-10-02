# Clay Klaus-Wade — personal landing page

## What's here

- `site/` — the deployable website. Plain HTML and CSS, no build step.
  - `index.html` — the whole page (one file, styles inline)
  - `images/clay-headshot.jpg`, `images/clay-catskills.png`, `images/favicon.svg`
- `design-source/` — the Claude Design canvas files, for reference or to rebuild the canvas
  - `Main.dc.html` (desktop/responsive page), `Mobile.dc.html` (phone preview frame), `canvas.json`

## Deploy

Point Cloudflare Pages, Netlify or Vercel at the `site/` folder (no build command, output directory `site`). Or open `site/index.html` in a browser to preview locally.

## Notes

- Fonts load from Google Fonts (Unbounded 900, Inter 400/800).
- Colors follow the Layered Health palette: limestone #F2EDE4, ink #2B2A28, slate #8A97A8, rose #D4A5A0, sage #93A382.
- Scroll animations and parallax use CSS scroll-driven animations (Chrome, Edge, recent Safari). Other browsers show the page without them. Everything is off for visitors with reduced motion turned on.
- On phones (640px and narrower): the headshot moves under "Hi, I'm Clay," the Catskills photo is hidden, and the "Where I've been" and "Let's talk" sections are hidden, so the page ends with Layered Health (closing on a "Keep in touch" email button) and the footer.
- The Catskills photo is about 400px wide; swap in a larger original at the same filename for sharper display.
- Contact links: clay@klaus-wade.com, (215) 833-8265, LinkedIn, Psychology Today, Instagram @layeredhealth.
