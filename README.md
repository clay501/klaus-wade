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
- Motion lives in `js/motion.js` and `css/motion.css`, shared by both pages. It uses GSAP with ScrollTrigger (scroll animations) and Lenis (smooth wheel scrolling), self-hosted in `js/vendor/` so the site doesn't depend on a CDN. What it does: the header slides in and the hero text brightens word by word on load; sections fade up as they arrive and card grids come in one after another; statement lines brighten word by word as you scroll past; the final call to action and footer get their own entrance. On desktop only, the hero portrait settles back and photos drift at a different speed than the page (parallax), and the therapy page's "My therapeutic process" pins while its three steps light up in order. Phones get the simpler fades only.
- Motion hooks in the HTML: `.reveal` or `data-reveal` (fade up), `data-words-scrub` (word-by-word on scroll), `data-parallax="6"` (parallax amount), `data-pin` / `data-pin-step` / `data-pin-title` (pinned steps), `data-cta` (closing entrance).
- Everything is off for visitors with reduced motion turned on, and if the scripts fail to load the page shows as normal static content within 3 seconds. The design-source canvas files don't include this motion.
- Main page on phones (640px and narrower): the headshot moves under "Hi, I'm Clay," the Catskills photo is hidden, and the "Where I've been" and "Let's talk" sections are hidden, so the page ends with Layered Health (closing on a "Keep in touch" email button) and the footer.
- Therapy page: no links back to the main page, by design. Contact buttons email clay@sunflowerradiance.com (PA) and clay@nekfamilycounseling.org (VT). Scheduling goes through Jane (sunflowerradiance.janeapp.com). On phones the headshot moves under "Hi, I'm Clay." and the Who I work with photo sits above that section's heading.
- The Catskills photo is about 400px wide; swap in a larger original at the same filename for sharper display.
- Main page contact links: clay@klaus-wade.com, (215) 833-8265, LinkedIn, Psychology Today, Instagram @layeredhealth.
