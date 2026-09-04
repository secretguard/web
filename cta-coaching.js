/*!
 * cta-coaching.js — sarathg.me shared "1:1 mentorship" call-to-action
 *
 * Renders ONE compact inline CTA strip on the site's free technical pages
 * (labs, guides, tutorials), pointing at /coaching/. Copy and styling live here
 * only — never copy-pasted into a page.
 *
 * Include it exactly like navbar.js / footer.js, root-relative from the page:
 *   <script src="cta-coaching.js" defer></script>      (repo root pages)
 *   <script src="../cta-coaching.js" defer></script>   (from a subdirectory)
 *
 * ── WHY INLINE, NOT STICKY ────────────────────────────────────────────────
 * A sticky bar would fight navbar.js (already position:fixed at the top), and
 * on phones a bottom bar sits exactly where the browser's own URL/tab UI lives.
 * The strip sits in normal document flow, so it can never cover text, never
 * needs a dismiss button, and the page reserves its height inline so nothing
 * already on screen moves when it renders.
 *
 * ── PLACEMENT RULE (uniform across every page) ────────────────────────────
 * Right after the page's opening section: the point where a reader has just
 * decided to stay. Measured against the old end-of-article panel, which most
 * mobile readers never reached, this is the position that gets seen. A page
 * opts in with one of:
 *   <div id="coaching-cta-strip" data-lead="…" data-tail="…" style="min-height:64px;margin:28px 0 36px"></div>
 *   <main data-sg-strip-after="#selector" data-lead="…" data-tail="…">   (React-rendered pages)
 *   <main data-sg-strip-in=".selector"    data-lead="…" data-tail="…">   (app-shell pages)
 *
 * ── COLOUR ────────────────────────────────────────────────────────────────
 * No new palette. navbar.js already paints the "1:1 Mentorship" nav link
 * #4fffb0 on all 19 pages, so that mint is this destination's established
 * site colour and it is reused here. Light mode drops the same hue to #0B6B4A
 * for contrast, the same move navbar.js makes for its own CTA (#ef4444 →
 * #dc2626, per its comment at navbar.js:122). Deliberately NOT the site red:
 * red is the "Contact Me" action, and two loud reds would compete.
 *
 * ── THEME ─────────────────────────────────────────────────────────────────
 * Site convention, set by navbar.js: html.light === light, absent class === dark.
 * Dark is the base here and html.light overrides it, exactly as navbar.js does.
 * The panel paints its own ground rather than borrowing the host page's, because
 * this drops onto five different host design systems.
 *
 * Every colour pair below is measured, not eyeballed. Dark: 16.2:1 headline,
 * 9.9:1 body, 13.8:1 accent, 13.1:1 button label. Light: 17.3:1 headline,
 * 8.0:1 body, 6.2:1 accent, 6.5:1 button label. The button fill clears 3:1
 * against the panel in both themes (WCAG 1.4.11, control boundary).
 */
(function () {
  'use strict';

  // Never on the page it points at, whatever a host page's script tags say.
  if (/^\/coaching\/?/.test(location.pathname)) return;
  if (document.getElementById('sg-coach-css')) return; // double-injection guard

  var HREF = 'https://sarathg.me/coaching/';

  var css = ''
    /* Palette: the navbar's mint mentorship colour, dropped to a darker green
       on the light theme for contrast. */
    + '#coaching-cta-strip{'
    + '  --sgc-accent:#4FFFB0; --sgc-accent-hi:#7CFFC6; --sgc-on-accent:#062117;'
    + '  --sgc-panel:#101A17; --sgc-border:#325C4C; --sgc-bar:#4FFFB0;'
    + '  --sgc-ink:#F2F5F3; --sgc-ink-2:#B9C4BF; --sgc-ink-3:#93A29C;'
    + '  font-family:var(--font-body, "Inter", system-ui, -apple-system, "Segoe UI", sans-serif);'
    + '  text-align:left;'
    + '}'
    + '#coaching-cta-strip, #coaching-cta-strip *{ box-sizing:border-box; }'

    /* Light mode. Same hue, dropped to a luminance that clears AA on paper. */
    + 'html.light #coaching-cta-strip{'
    + '  --sgc-accent:#0B6B4A; --sgc-accent-hi:#085239; --sgc-on-accent:#FFFFFF;'
    + '  --sgc-panel:#F2FAF6; --sgc-border:#A8D8C1; --sgc-bar:#0B6B4A;'
    + '  --sgc-ink:#101614; --sgc-ink-2:#41504A; --sgc-ink-3:#5C6B65;'
    + '}'

    /* ── Strip: the early, one-line variant. Sits in normal flow inside the
       page's own content column, right after the opening section, where a
       reader has just decided to stay. Never sticky, never overlays text. ── */
    + '#coaching-cta-strip{'
    + '  display:block; width:100%; min-height:64px; margin:28px 0 36px;'
    + '}'
    + '#coaching-cta-strip .sgs-row{'
    + '  display:flex; align-items:center; justify-content:space-between; gap:16px 24px;'
    + '  min-height:64px; padding:12px 18px 12px 16px;'
    + '  background:var(--sgc-panel); border:1px solid var(--sgc-border);'
    + '  border-left:4px solid var(--sgc-bar); border-radius:10px;'
    + '}'
    + '#coaching-cta-strip .sgs-copy{'
    + '  display:flex; align-items:baseline; flex-wrap:wrap; gap:4px 10px; min-width:0;'
    + '  margin:0; padding:0; font-size:15px; line-height:1.45; color:var(--sgc-ink-2);'
    + '}'
    + '#coaching-cta-strip .sgs-lead{ font-weight:650; color:var(--sgc-ink); }'
    + '#coaching-cta-strip .sgs-btn{'
    + '  flex:none; display:inline-flex; align-items:center; gap:6px;'
    + '  min-height:38px; padding:9px 16px;'
    + '  background:transparent; color:var(--sgc-accent);'
    + '  border:1px solid var(--sgc-accent); border-radius:100px;'
    + '  font-family:inherit; font-size:14px; font-weight:650; line-height:1;'
    + '  letter-spacing:-0.01em; text-decoration:none; white-space:nowrap; cursor:pointer;'
    + '}'
    + '#coaching-cta-strip .sgs-btn:hover, #coaching-cta-strip .sgs-btn:focus-visible{'
    + '  background:var(--sgc-accent); color:var(--sgc-on-accent); text-decoration:none;'
    + '}'
    + '#coaching-cta-strip .sgs-btn:focus-visible{ outline:2px solid var(--sgc-accent); outline-offset:3px; }'
    + '@media (prefers-reduced-motion:no-preference){'
    + '  #coaching-cta-strip .sgs-btn{ transition:background-color .18s ease, color .18s ease; }'
    + '}'
    + '@media (max-width:560px){'
    + '  #coaching-cta-strip{ min-height:112px; margin:22px 0 28px; }'
    + '  #coaching-cta-strip .sgs-row{'
    + '    flex-direction:column; align-items:stretch; gap:12px; padding:14px 16px;'
    + '    border-left:1px solid var(--sgc-border); border-top:4px solid var(--sgc-bar);'
    + '  }'
    + '  #coaching-cta-strip .sgs-copy{ font-size:14.5px; }'
    + '  #coaching-cta-strip .sgs-btn{ justify-content:center; width:100%; min-height:42px; }'
    + '}'
    + '@media (forced-colors:active){'
    + '  #coaching-cta-strip .sgs-row{ border:1px solid CanvasText; }'
    + '  #coaching-cta-strip .sgs-btn{ border:1px solid ButtonText; }'
    + '}'

;

  var styleEl = document.createElement('style');
  styleEl.id = 'sg-coach-css';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  var SRC = (location.pathname || '/').replace(/"/g, '');

  /* ── Strip ──────────────────────────────────────────────────────────────
     A page opts in by placing an empty slot where its opening section ends:
       <div id="coaching-cta-strip" data-lead="Building this lab alone?"
            data-tail="I mentor people through exactly this, 1:1." style="min-height:64px"></div>
     data-lead is the bold hook (page-specific, a few words); data-tail is the
     plain continuation. Both fall back to the defaults below. The inline
     min-height reserves the space before this script runs so nothing shifts. */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function buildStrip(slot) {
    var lead = slot.getAttribute('data-lead') || 'Working through this on your own?';
    var tail = slot.getAttribute('data-tail') || 'I mentor people through exactly this, 1:1. Free intake call first.';
    slot.setAttribute('role', 'note');
    slot.setAttribute('aria-label', '1:1 mentorship');
    slot.innerHTML = ''
      + '<div class="sgs-row">'
      + '  <p class="sgs-copy"><span class="sgs-lead">' + escapeHtml(lead) + '</span> '
      + '    <span>' + escapeHtml(tail) + '</span></p>'
      + '  <a class="sgs-btn" href="' + HREF + '" data-cta="strip-coaching" data-sg-placement="strip"'
      + '     data-src="' + SRC + '">1:1 Mentorship <span aria-hidden="true">&rarr;</span></a>'
      + '</div>';
  }

  /* Pages that re-render their article client-side (the prerendered React
     guides) cannot keep a slot in their HTML: the framework replaces it. They
     declare the spot on <main> instead and the strip is created once the
     target exists:
       <main data-sg-strip-after="#foundations" data-lead="..." data-tail="...">
     The strip is inserted directly after that element. Polling stops after
     eight seconds if the element never appears. */
  function mountStripAfter(mainEl) {
    // data-sg-strip-after: insert as the next sibling of the target.
    // data-sg-strip-in: append as the last child of the target, for app-style
    // pages where the target view unmounts and remounts; the strip then leaves
    // and returns with it.
    var after = mainEl.getAttribute('data-sg-strip-after');
    var inside = mainEl.getAttribute('data-sg-strip-in');
    var sel = after || inside;
    if (!sel) return;
    function place() {
      if (document.getElementById('coaching-cta-strip')) return;
      var target = document.querySelector(sel);
      if (!target || !target.parentNode) return;
      var slot = document.createElement('div');
      slot.id = 'coaching-cta-strip';
      if (mainEl.getAttribute('data-lead')) slot.setAttribute('data-lead', mainEl.getAttribute('data-lead'));
      if (mainEl.getAttribute('data-tail')) slot.setAttribute('data-tail', mainEl.getAttribute('data-tail'));
      if (inside && !after) target.appendChild(slot);
      else target.parentNode.insertBefore(slot, target.nextSibling);
      buildStrip(slot);
    }
    place();
    // The framework may replace the prerendered article after this script ran
    // (and again on later state changes). Re-place the strip whenever it has
    // been dropped from the document. Debounced so a burst of mutations costs
    // one check.
    var pending = null;
    var mo = new MutationObserver(function () {
      if (pending) return;
      pending = setTimeout(function () { pending = null; place(); }, 60);
    });
    mo.observe(mainEl, { childList: true, subtree: true });
  }

  /* Click measurement for every mentorship link, including pages that do not
     load navbar.js (which carries the same listener). One of the two wins. */
  if (!window.__sgCtaTracked) {
    window.__sgCtaTracked = true;
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[data-sg-placement]') : null;
      if (!a || typeof window.gtag !== 'function') return;
      window.gtag('event', 'coaching_cta_click', {
        placement: a.getAttribute('data-sg-placement'),
        page_path: location.pathname,
        link_url: a.getAttribute('href')
      });
    }, true);
  }

  function mount() {
    var strip = document.getElementById('coaching-cta-strip');
    if (strip) { buildStrip(strip); return; }
    var mainForStrip = document.querySelector('main[data-sg-strip-after], main[data-sg-strip-in]');
    if (mainForStrip) mountStripAfter(mainForStrip);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
