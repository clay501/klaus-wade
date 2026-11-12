/* Scroll motion for klaus-wade.com, shared by both pages.
   Uses GSAP + ScrollTrigger for the animations and Lenis for smooth wheel
   scrolling (all self-hosted in js/vendor). Only transform and opacity are
   animated. Nothing here runs for visitors who prefer reduced motion, and
   if this file fails, the page shows everything as plain static content.

   Hooks in the HTML:
     .reveal, [data-reveal]   fade up when scrolled into view (grids stagger their items)
     [data-words-scrub]       words brighten one by one as the element scrolls through
     [data-parallax="6"]      image drifts at a different speed than the page (desktop)
     [data-pin]               section pins while its [data-pin-step] cards come in one
                              by one, lighting up the matching word of [data-pin-title]
     [data-cta]               final call to action gets its own entrance */
(function () {
  var root = document.documentElement;
  var gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.remove('kw-motion');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  window.__kwMotionReady = true;

  var EASE = 'power3.out';

  // Smooth wheel/trackpad scrolling. Touch keeps the phone's native scrolling.
  if (window.Lenis) {
    var lenis = new window.Lenis({ lerp: 0.12, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // Wrap each word of an element's text in a span, keeping links and other markup intact.
  function splitWords(el) {
    if (!el.hasAttribute('data-split')) {
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      var nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function (node) {
        var frag = document.createDocumentFragment();
        node.nodeValue.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          var span = document.createElement('span');
          span.className = 'kw-word';
          span.textContent = part;
          frag.appendChild(span);
        });
        node.parentNode.replaceChild(frag, node);
      });
      el.setAttribute('data-split', '');
    }
    return el.querySelectorAll('.kw-word');
  }

  function isTextBlock(el) {
    return /^(H1|H2|H3|P)$/.test(el.tagName) || (el.children.length === 0 && el.textContent.trim());
  }

  var header = document.querySelector('.kw-header');
  var pinSection = document.querySelector('[data-pin]');
  // ---------- Page load: header slides down, hero portrait settles in ----------
  var intro = gsap.timeline({ defaults: { ease: EASE } });
  if (header) intro.fromTo(header, { yPercent: -100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, clearProps: 'transform' }, 0);

  // Hero copy is readable the moment the page loads: only the header and portrait animate in
  intro.fromTo('.hero-photo', { autoAlpha: 0, scale: 0.96, y: 24 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1.1, clearProps: 'transform' }, 0.25);

  var mm = gsap.matchMedia();

  mm.add({
    desktop: '(min-width: 900px) and (hover: hover) and (pointer: fine)',
    touch: '(max-width: 899px), (hover: none), (pointer: coarse)'
  }, function (ctx) {
    var desktop = ctx.conditions.desktop;
    var pinned = desktop && pinSection && pinSection.offsetHeight < window.innerHeight * 0.85;

    // ---------- Sections fade up as they arrive; grids bring their items in one after another ----------
    gsap.utils.toArray('.reveal, [data-reveal]').forEach(function (el) {
      if (el.hasAttribute('data-cta')) return;
      if (pinned && pinSection.contains(el)) return;
      var items = el.children;
      if (getComputedStyle(el).display === 'grid' && items.length > 1) {
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(items, { autoAlpha: 0, y: 32 }, {
          autoAlpha: 1, y: 0, duration: 0.8, ease: EASE, stagger: 0.12, clearProps: 'transform',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true }
        });
      } else {
        gsap.fromTo(el, { autoAlpha: 0, y: 28 }, {
          autoAlpha: 1, y: 0, duration: 0.9, ease: EASE, clearProps: 'transform',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      }
    });

    // ---------- Statement lines brighten word by word as they scroll through ----------
    gsap.utils.toArray('[data-words-scrub]').forEach(function (el) {
      gsap.fromTo(splitWords(el), { opacity: 0.15 }, {
        opacity: 1, ease: 'none', stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 45%', scrub: true }
      });
    });

    // ---------- Final call to action and footer ----------
    gsap.utils.toArray('[data-cta]').forEach(function (el) {
      gsap.fromTo(el, { autoAlpha: 0, y: 48, scale: 0.96 }, {
        autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: EASE, clearProps: 'transform',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });
    var footer = document.querySelector('footer');
    if (footer) {
      gsap.fromTo(footer.firstElementChild.children, { autoAlpha: 0, y: 18 }, {
        autoAlpha: 1, y: 0, duration: 0.7, ease: EASE, stagger: 0.08, clearProps: 'transform',
        scrollTrigger: { trigger: footer, start: 'top 95%', once: true }
      });
    }

    if (!desktop) return;

    // ---------- Desktop only: depth and parallax ----------
    // Hero portrait settles back and drifts slower than the page as you start scrolling
    var portrait = document.querySelector('.hero-photo img');
    if (portrait) {
      gsap.to(portrait, {
        scale: 0.93, yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }
    gsap.utils.toArray('[data-parallax]').forEach(function (el) {
      var amount = parseFloat(el.getAttribute('data-parallax')) || 6;
      gsap.fromTo(el, { yPercent: -amount }, {
        yPercent: amount, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
    var stripes = document.querySelector('.lh-stack svg');
    if (stripes) {
      gsap.fromTo(stripes, { xPercent: -5 }, {
        xPercent: 5, ease: 'none',
        scrollTrigger: { trigger: stripes.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }

    // ---------- Desktop only: pinned steps ----------
    if (pinned) {
      var steps = pinSection.querySelectorAll('[data-pin-step]');
      var title = pinSection.querySelector('[data-pin-title]');
      var titleWords = title ? splitWords(title) : [];
      gsap.set(pinSection.querySelectorAll('.reveal, [data-reveal]'), { autoAlpha: 1 });
      var tl = gsap.timeline({
        scrollTrigger: { trigger: pinSection, start: 'top 64px', end: '+=' + Math.round(window.innerHeight * 1.1), pin: true, scrub: 0.6, anticipatePin: 1 }
      });
      // fill the space under the pinned block with the section's own color instead of the page behind it
      var spacer = pinSection.parentElement;
      if (spacer && spacer.classList.contains('pin-spacer')) spacer.style.backgroundColor = getComputedStyle(pinSection).backgroundColor;
      if (titleWords.length) tl.set(titleWords, { opacity: 0.2 }, 0);
      steps.forEach(function (step, i) {
        tl.fromTo(step, { autoAlpha: 0.15, y: 60 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }, i);
        if (titleWords[i]) tl.to(titleWords[i], { opacity: 1, duration: 1, ease: 'none' }, i);
      });
      tl.to({}, { duration: 0.4 });
    }
  });

  // Images and fonts change page height after load; re-measure once they're in
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
