# Clay Klaus-Wade — personal website

## What's here

The website is plain HTML and CSS, no build step, and lives at the top level of the repo.

- `index.html` — the main page (klaus-wade.com)
- `therapy/index.html` — the therapy page (klaus-wade.com/therapy)
- `images/` — `kw-lockup.png` (logo), `kw-lockup-ink-beige.png` (therapy page header logo), `clay-headshot.jpg`, `clay-catskills.png`, `who-i-work-with.png` (therapy page, Who I work with), `favicon.svg`
- `design-source/` — the Claude Design canvas files, for reference or to rebuild the canvas
  - `Main.dc.html` and `Mobile.dc.html` (main page and its phone preview), `Therapy.dc.html` and `TherapyMobile.dc.html` (therapy page and its phone preview), `canvas.json`

## Deploy

Hosted on Porkbun static hosting, connected to this GitHub repo. Porkbun serves the top level of the repo, so `index.html`, `therapy/` and `images/` have to stay at the top level (not in a `site/` subfolder). Open `index.html` in a browser to preview locally.

## Notes

- Fonts load from Google Fonts (Unbounded 900, Inter 400/800).
- Colors follow the Layered Health palette: limestone #F2EDE4, ink #2B2A28, slate #8A97A8, rose #D4A5A0, sage #93A382.
- Scroll animations and parallax use CSS scroll-driven animations (Chrome, Edge, recent Safari). Other browsers show the page without them. Everything is off for visitors with reduced motion turned on.
- Main page on phones (640px and narrower): the headshot moves under "Hi, I'm Clay," the Catskills photo is hidden, and the "Where I've been" and "Let's talk" sections are hidden, so the page ends with Layered Health (closing on a "Keep in touch" email button) and the footer.
- Therapy page: no links back to the main page, by design. Contact buttons email clay@sunflowerradiance.com (PA) and clay@nekfamilycounseling.org (VT). Scheduling goes through Jane (sunflowerradiance.janeapp.com). On phones the headshot moves under "Hi, I'm Clay." and the Who I work with photo sits above that section's heading.
- The Catskills photo is about 400px wide; swap in a larger original at the same filename for sharper display.
- Main page contact links: clay@klaus-wade.com, (215) 833-8265, LinkedIn, Psychology Today, Instagram @layeredhealth.
