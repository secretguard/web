/*!
 * cta-coaching.js — sarathg.me shared "1:1 mentorship" call-to-action
 *
 * Injects ONE inline CTA panel at the end of the article content on the site's
 * free technical pages (labs, guides, tutorials), pointing at /coaching/.
 * Maintained here only — never copy-pasted into a page.
 *
 * Include it exactly like navbar.js / footer.js, root-relative from the page:
 *   <script src="cta-coaching.js" defer></script>      (repo root pages)
 *   <script src="../cta-coaching.js" defer></script>   (from a subdirectory)
 *
 * ── WHY INLINE, NOT STICKY ────────────────────────────────────────────────
 * A sticky bar would fight navbar.js (already position:fixed at the top), and
 * on phones a bottom bar sits exactly where the browser's own URL/tab UI lives.
 * These pages are long-form technical reads, so the honest high-intent moment is
 * the end of the article: a reader who got there worked through the whole thing.
 * Placing it in normal document flow also means it can never cover text, never
 * needs a dismiss button, and cannot cause layout shift — it is appended below
 * the fold, after parse, so nothing already on screen moves.
 *
 * ── PLACEMENT RULE (uniform across every page) ────────────────────────────
 * Last child of <main>. All 13 host pages have exactly one bare <main>, and this
 * lands the panel after the article but before the page's footer, whether that
 * footer is the injected #sg-footer or a page-local <footer> (bugbounty.html,
 * offsec_medtech.html and tor.html have their own and do not load footer.js).
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
  if (document.getElementById('sg-coach')) return; // double-injection guard

  var HREF = 'https://sarathg.me/coaching/';

  var css = ''
    + '#sg-coach{'
    + '  --sgc-accent:#4FFFB0; --sgc-accent-hi:#7CFFC6; --sgc-on-accent:#062117;'
    + '  --sgc-panel:#101A17; --sgc-border:#325C4C; --sgc-bar:#4FFFB0;'
    + '  --sgc-ink:#F2F5F3; --sgc-ink-2:#B9C4BF; --sgc-ink-3:#93A29C;'
    + '  display:block; width:100%; max-width:1180px;'
    + '  margin:64px auto 0; padding:0 24px;'
    + '  font-family:var(--font-body, "Inter", system-ui, -apple-system, "Segoe UI", sans-serif);'
    + '  text-align:left;'
    + '}'
    + '#sg-coach, #sg-coach *{ box-sizing:border-box; }'

    /* Light mode. Same hue, dropped to a luminance that clears AA on paper. */
    + 'html.light #sg-coach{'
    + '  --sgc-accent:#0B6B4A; --sgc-accent-hi:#085239; --sgc-on-accent:#FFFFFF;'
    + '  --sgc-panel:#F2FAF6; --sgc-border:#A8D8C1; --sgc-bar:#0B6B4A;'
    + '  --sgc-ink:#101614; --sgc-ink-2:#41504A; --sgc-ink-3:#5C6B65;'
    + '}'

    + '#sg-coach .sgc-panel{'
    + '  background:var(--sgc-panel);'
    + '  border:1px solid var(--sgc-border);'
    + '  border-left:4px solid var(--sgc-bar);'
    + '  border-radius:12px;'
    + '  padding:30px 32px;'
    + '  display:grid; grid-template-columns:minmax(0,1fr) auto;'
    + '  gap:28px 40px; align-items:center;'
    + '}'

    + '#sg-coach .sgc-eyebrow{'
    + '  margin:0 0 10px; padding:0;'
    + '  font-size:11.5px; font-weight:700; letter-spacing:0.13em; text-transform:uppercase;'
    + '  color:var(--sgc-accent); line-height:1.2;'
    + '}'
    + '#sg-coach .sgc-h{'
    + '  margin:0 0 10px; padding:0; border:0;'
    + '  font-family:var(--font-display, "Inter", system-ui, -apple-system, sans-serif);'
    + '  font-size:clamp(1.3rem, 1.1rem + 0.9vw, 1.75rem); font-weight:700;'
    + '  line-height:1.2; letter-spacing:-0.02em; color:var(--sgc-ink);'
    + '}'
    + '#sg-coach .sgc-p{'
    + '  margin:0; padding:0;'
    + '  font-size:15.5px; line-height:1.6; color:var(--sgc-ink-2); max-width:62ch;'
    + '}'
    + '#sg-coach .sgc-micro{'
    + '  margin:14px 0 0; padding:0;'
    + '  font-size:13px; line-height:1.5; color:var(--sgc-ink-3);'
    + '}'

    + '#sg-coach .sgc-act{ display:flex; flex-direction:column; align-items:stretch; gap:0; }'
    + '#sg-coach .sgc-btn{'
    + '  display:inline-flex; align-items:center; justify-content:center; gap:8px;'
    + '  min-height:52px; padding:14px 28px;'
    + '  background:var(--sgc-accent); color:var(--sgc-on-accent);'
    + '  border:1px solid var(--sgc-accent); border-radius:100px;'
    + '  font-family:inherit; font-size:15.5px; font-weight:650; line-height:1;'
    + '  letter-spacing:-0.01em; text-decoration:none; white-space:nowrap; cursor:pointer;'
    + '}'
    + '#sg-coach .sgc-btn:hover,#sg-coach .sgc-btn:focus-visible{'
    + '  background:var(--sgc-accent-hi); border-color:var(--sgc-accent-hi);'
    + '  color:var(--sgc-on-accent); text-decoration:none;'
    + '}'
    + '#sg-coach .sgc-btn:focus-visible{'
    + '  outline:2px solid var(--sgc-accent); outline-offset:3px;'
    + '}'
    + '#sg-coach .sgc-arrow{ display:inline-block; }'

    /* Motion is an enhancement only, and never runs for a reader who opted out. */
    + '@media (prefers-reduced-motion:no-preference){'
    + '  #sg-coach .sgc-btn{ transition:background-color .18s ease, border-color .18s ease; }'
    + '  #sg-coach .sgc-arrow{ transition:transform .18s ease; }'
    + '  #sg-coach .sgc-btn:hover .sgc-arrow{ transform:translateX(3px); }'
    + '}'

    /* ── Tablet / small laptop: action drops under the copy, still left-aligned. ── */
    + '@media (max-width:760px){'
    + '  #sg-coach{ margin-top:52px; }'
    + '  #sg-coach .sgc-panel{ grid-template-columns:minmax(0,1fr); gap:22px; padding:26px 24px; }'
    + '  #sg-coach .sgc-act{ align-items:flex-start; }'
    + '  #sg-coach .sgc-btn{ width:auto; }'
    + '}'

    /* ── Phones: the accent moves to the top edge (a 4px left rule eats width a
         narrow screen cannot spare) and the button becomes full-width. ── */
    + '@media (max-width:560px){'
    + '  #sg-coach{ padding:0 16px; margin-top:44px; }'
    + '  #sg-coach .sgc-panel{'
    + '    padding:24px 20px; border-radius:10px;'
    + '    border-left:1px solid var(--sgc-border); border-top:4px solid var(--sgc-bar);'
    + '  }'
    + '  #sg-coach .sgc-p{ font-size:15px; }'
    + '  #sg-coach .sgc-act{ align-items:stretch; }'
    + '  #sg-coach .sgc-btn{ width:100%; }'
    + '}'

    /* Forced-colours / Windows high contrast: keep a visible boundary. */
    + '@media (forced-colors:active){'
    + '  #sg-coach .sgc-panel{ border:1px solid CanvasText; }'
    + '  #sg-coach .sgc-btn{ border:1px solid ButtonText; }'
    + '}';

  var styleEl = document.createElement('style');
  styleEl.id = 'sg-coach-css';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  var el = document.createElement('aside');
  el.id = 'sg-coach';
  el.setAttribute('aria-labelledby', 'sg-coach-h');
  el.innerHTML = ''
    + '<div class="sgc-panel">'
    + '  <div class="sgc-copy">'
    + '    <p class="sgc-eyebrow">1:1 Mentorship</p>'
    + '    <h2 class="sgc-h" id="sg-coach-h">Stuck applying this on your own?</h2>'
    + '    <p class="sgc-p">I run 1:1 mentorship for exactly this. One learner, one plan, '
    + '      built from a diagnosis of where you actually are. Complete beginners included.</p>'
    + '    <p class="sgc-micro">Free intake call. Nothing gets booked or charged.</p>'
    + '  </div>'
    + '  <div class="sgc-act">'
    + '    <a class="sgc-btn" href="' + HREF + '" data-cta="inline-coaching"'
    + '       data-src="' + (location.pathname || '/').replace(/"/g, '') + '">'
    + '      See how it works <span class="sgc-arrow" aria-hidden="true">&rarr;</span>'
    + '    </a>'
    + '  </div>'
    + '</div>';

  function mount() {
    // 1. Explicit opt-in slot, if a page ever wants to choose the spot itself.
    var slot = document.getElementById('coaching-cta-placeholder');
    if (slot) { slot.replaceWith(el); return; }

    // 2. The rule: last child of <main>, i.e. end of article, before any footer.
    var main = document.querySelector('main');
    if (main) { main.appendChild(el); return; }

    // 3. No <main>: sit above whichever footer exists.
    var foot = document.getElementById('sg-footer') || document.querySelector('footer');
    if (foot && foot.parentNode) { foot.parentNode.insertBefore(el, foot); return; }

    // 4. Last resort.
    document.body.appendChild(el);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
