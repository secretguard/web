/**
 * navbar.js — Shared navbar for sarathg.me
 * ─────────────────────────────────────────
 * Works on ALL pages: home (Tailwind + CSS vars) and services
 * pages (plain CSS, Space Grotesk, green accent).
 *
 * HOW TO USE — add ONE line at the very top of <body>:
 *   <script src="/navbar.js"></script>
 *
 * Then DELETE the old <nav> block and its CSS from each page.
 * See IMPLEMENTATION.md for exact per-file instructions.
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════
     THEME — restore saved preference immediately (before paint)
     so there's no flash of wrong theme.
  ═══════════════════════════════════════════════════════════════ */
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light');
  }

  /* ═══════════════════════════════════════════════════════════════
     CSS
     Fully self-contained — works whether Tailwind is present or not.
     Uses CSS custom properties with hard-coded fallbacks so it looks
     correct on services pages that don't load the home page tokens.
  ═══════════════════════════════════════════════════════════════ */
  const CSS = `
    /* ── Site-wide guard: never let a page scroll sideways ──
       overflow-x:clip caps the document to the viewport width without creating
       a scroll container, so position:sticky and fixed elements keep working
       and inner overflow-x:auto strips (tab bars, marquees) still scroll. This
       neutralises stray decorative blobs and off-by-a-few-pixels leaks on every
       page that loads the navbar. */
    html, body { overflow-x: clip; }

    /* ── Reset / base for navbar only ── */
    #sg-navbar * { box-sizing: border-box; }
    #sg-navbar a { text-decoration: none; }

    /* ── Navbar shell ── */
    #sg-navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      background: transparent;
      border-bottom: 1px solid transparent;
      transition: background 0.4s ease, border-color 0.3s,
                  backdrop-filter 0.3s, box-shadow 0.3s;
    }
    #sg-navbar.sg-scrolled {
      background: rgba(10,10,10,0.88) !important;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom-color: rgba(255,255,255,0.08) !important;
      box-shadow: 0 4px 32px rgba(0,0,0,0.18);
    }

    /* ── Inner container ── */
    .sg-nav-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.5rem;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* ── Logo ── */
    .sg-logo {
      font-family: var(--font-display, 'Space Grotesk', 'Inter', sans-serif);
      font-weight: 700;
      font-size: 1.35rem;
      letter-spacing: -0.02em;
      display: flex;
      align-items: center;
      gap: 0;
      color: var(--t-primary, #f5f5f5);
      transition: color 0.2s;
    }
    .sg-logo:hover .sg-logo-first { color: var(--red, #ef4444); }
    .sg-logo:hover .sg-logo-dot   { color: var(--t-primary, #f5f5f5); }
    .sg-logo-first { color: var(--t-primary, #f5f5f5); transition: color 0.3s; }
    .sg-logo-dot   { color: var(--red, #ef4444);        transition: color 0.3s; }

    /* ── Desktop links ── */
    .sg-desktop-links {
      display: none;
      align-items: center;
      gap: 1.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      font-family: var(--font-sans, 'Space Grotesk', 'Inter', sans-serif);
    }
    @media (min-width: 1024px) {
      .sg-desktop-links { display: flex; }
    }

    .sg-link {
      color: var(--t-muted, #888);
      position: relative;
      transition: color 0.2s;
      padding: 0;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      font-family: inherit;
      letter-spacing: 0;
    }
    .sg-link::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0;
      height: 1px; width: 0;
      background: var(--red, #ef4444);
      transition: width 0.2s;
    }
    .sg-link:hover            { color: var(--t-primary, #f5f5f5); }
    .sg-link:hover::after     { width: 100%; }
    .sg-link.sg-active        { color: var(--red, #ef4444); }
    .sg-link.sg-active::after { width: 100%; }

    /* ── CTA button ──
       #dc2626 (red-600) on white text = 4.83:1 contrast, meets WCAG AA (4.5:1).
       The previous #ef4444 (red-500) only reached 3.76:1. */
    .sg-cta {
      padding: 0.55rem 1.25rem;
      background: #dc2626;
      color: #fff !important;
      border-radius: 100px;
      font-size: 0.875rem;
      font-weight: 600;
      transition: background 0.2s, transform 0.2s;
      white-space: nowrap;
    }
    .sg-cta:hover {
      background: #b91c1c;
      transform: scale(1.04);
    }

    /* ── Dark/light toggle ── */
    .sg-mode-btn {
      width: 36px; height: 36px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.04);
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: border-color 0.2s, background 0.2s;
      color: #888;
      padding: 0;
      font-size: 15px;
      line-height: 1;
    }
    .sg-mode-btn:hover { border-color: var(--red, #ef4444); color: #f5f5f5; }

    /* ═══════════════════════════════════════════════════════════
       Services dropdown
    ═══════════════════════════════════════════════════════════ */
    .sg-dropdown { position: relative; }

    .sg-dropdown-btn {
      display: flex; align-items: center; gap: 0.3rem;
    }
    .sg-dropdown-btn svg { transition: transform 0.2s ease; flex-shrink: 0; }
    .sg-dropdown.sg-open .sg-dropdown-btn svg { transform: rotate(180deg); }
    .sg-dropdown.sg-open .sg-dropdown-btn { color: #f5f5f5 !important; }
    .sg-dropdown.sg-open .sg-dropdown-btn::after { width: 100%; }

    .sg-dropdown-overlay {
      display: none;
      position: fixed; inset: 0;
      z-index: 998;
    }
    .sg-dropdown.sg-open .sg-dropdown-overlay { display: block; }

    .sg-dropdown-menu {
      display: none;
      position: absolute;
      top: calc(100% + 18px);
      left: 50%; transform: translateX(-50%);
      width: 292px;
      background: #1a1a1a;
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
      z-index: 1001;
    }
    /* Arrow */
    .sg-dropdown-menu::before {
      content: '';
      position: absolute;
      top: -6px; left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 10px; height: 10px;
      background: #1a1a1a;
      border-top: 1px solid rgba(255,255,255,0.09);
      border-left: 1px solid rgba(255,255,255,0.09);
    }
    .sg-dropdown.sg-open .sg-dropdown-menu {
      display: block;
      animation: sgDropIn 0.18s cubic-bezier(0.4,0,0.2,1);
    }
    @keyframes sgDropIn {
      from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }

    .sg-drop-item {
      display: flex; flex-direction: column; gap: 0.15rem;
      padding: 0.875rem 1.25rem;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      text-decoration: none;
      transition: background 0.15s;
      color: inherit;
    }
    .sg-drop-item:last-child { border-bottom: none; }
    .sg-drop-item:hover { background: rgba(255,255,255,0.04); }
    .sg-drop-item-title {
      font-size: 0.82rem; font-weight: 600;
      color: #f5f5f5;
      letter-spacing: -0.01em;
      transition: color 0.15s;
    }
    .sg-drop-item:hover .sg-drop-item-title { color: #ef4444; }
    .sg-drop-item-desc {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 0.62rem;
      color: #444;
      letter-spacing: 0.03em;
    }
    .sg-drop-item.sg-all {
      background: rgba(239,68,68,0.04);
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .sg-drop-item.sg-all .sg-drop-item-title { color: #ef4444; }
    .sg-drop-item.sg-all:hover { background: rgba(239,68,68,0.08); }

    /* ═══════════════════════════════════════════════════════════
       Mobile
    ═══════════════════════════════════════════════════════════ */
    .sg-mobile-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    @media (min-width: 1024px) {
      .sg-mobile-controls { display: none; }
    }

    .sg-hamburger {
      background: none; border: none; cursor: pointer;
      color: #888; padding: 4px;
      display: flex; align-items: center; justify-content: center;
      transition: color 0.2s;
    }
    .sg-hamburger:hover { color: #f5f5f5; }

    /* Mentorship pill: the one nav destination that stays visible on phones
       without opening the menu. Outline only, so it does not compete with
       the red Contact CTA inside the menu. */
    .sg-mob-pill {
      display: inline-flex; align-items: center;
      padding: 5px 11px; border-radius: 100px;
      border: 1px solid rgba(79,255,176,0.55); color: #4fffb0;
      font-size: 12px; font-weight: 600; letter-spacing: 0.01em;
      white-space: nowrap; line-height: 1; text-decoration: none;
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }
    .sg-mob-pill:hover, .sg-mob-pill:focus-visible {
      background: rgba(79,255,176,0.12); border-color: #4fffb0;
    }
    /* The inline mint on the two mentorship links is unreadable on the light
       theme (2.1:1); drop it to the same green the CTA panel uses (6.2:1). */
    .sg-link-coach { color: #4fffb0; }
    html.light .sg-link-coach { color: #0B6B4A; }
    html.light .sg-mob-pill { color: #0B6B4A; border-color: rgba(11,107,74,0.5); }
    html.light .sg-mob-pill:hover, html.light .sg-mob-pill:focus-visible { background: rgba(11,107,74,0.08); border-color: #0B6B4A; }
    @media (max-width: 359px) { .sg-mob-pill { display: none; } }

    .sg-mobile-menu {
      display: none;
      position: absolute;
      top: 100%; left: 0; right: 0;
      background: rgba(12,12,12,0.97);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 12px 40px rgba(0,0,0,0.3);
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
    }
    .sg-mobile-menu.sg-open {
      display: block;
      max-height: 700px;
      opacity: 1;
    }
    .sg-mobile-menu-inner {
      display: flex;
      flex-direction: column;
      padding: 1.25rem 1.5rem 1.5rem;
      gap: 0;
      font-family: var(--font-sans, 'Space Grotesk', 'Inter', sans-serif);
      font-size: 0.875rem;
    }

    .sg-mobile-link {
      display: block;
      padding: 0.625rem 0;
      color: #888;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      transition: color 0.2s;
      font-weight: 500;
    }
    .sg-mobile-link:hover    { color: #f5f5f5; }
    .sg-mobile-link.sg-active { color: #ef4444; }

    /* Mobile services accordion */
    .sg-mob-svc-btn {
      display: flex; align-items: center; justify-content: space-between;
      width: 100%;
      padding: 0.625rem 0;
      color: #888;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      background: none; border-left: none; border-right: none; border-top: none;
      font-family: inherit; font-size: 0.875rem; font-weight: 500;
      cursor: pointer; transition: color 0.2s;
    }
    .sg-mob-svc-btn:hover { color: #f5f5f5; }
    .sg-mob-svc-btn svg { transition: transform 0.2s; flex-shrink: 0; }
    .sg-mob-svc-btn.sg-open svg { transform: rotate(180deg); }

    .sg-mob-svc-sub {
      display: none;
      flex-direction: column;
      padding-left: 1rem;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding-bottom: 0.5rem;
    }
    .sg-mob-svc-sub.sg-open { display: flex; }
    .sg-mob-svc-sub a {
      display: flex; flex-direction: column; gap: 0.1rem;
      padding: 0.55rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      color: #888; font-size: 0.8rem;
      transition: color 0.2s; text-decoration: none;
    }
    .sg-mob-svc-sub a:last-child { border-bottom: none; }
    .sg-mob-svc-sub a:hover { color: #f5f5f5; }
    .sg-mob-svc-sub .sg-sub-label {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 0.58rem; color: #444; letter-spacing: 0.04em;
    }

    .sg-mobile-cta {
      display: block;
      margin-top: 1rem;
      text-align: center;
      padding: 0.65rem 1.25rem;
      background: #dc2626;
      color: #fff !important;
      border-radius: 100px;
      font-weight: 600;
      font-size: 0.875rem;
      transition: background 0.2s;
    }
    .sg-mobile-cta:hover { background: #b91c1c; }

    /* Body offset so content isn't hidden under fixed navbar */
    body { padding-top: 64px; }

    /* Light mode overrides */
    html.light #sg-navbar { border-bottom-color: rgba(0,0,0,0.08); }
    html.light #sg-navbar.sg-scrolled {
      background: rgba(255,255,255,0.90) !important;
      border-bottom-color: rgba(0,0,0,0.1) !important;
    }
    html.light .sg-logo-first { color: #111; }
    html.light .sg-link { color: #555; }
    html.light .sg-link:hover { color: #111; }
    html.light .sg-mode-btn { border-color: rgba(0,0,0,0.15); background: rgba(0,0,0,0.04); color: #555; }
    html.light .sg-hamburger { color: #555; }
    html.light .sg-mobile-menu { background: rgba(255,255,255,0.97); border-bottom-color: rgba(0,0,0,0.08); }
    html.light .sg-mobile-link { color: #555; border-bottom-color: rgba(0,0,0,0.06); }
    html.light .sg-mobile-link:hover { color: #111; }
    html.light .sg-mob-svc-btn { color: #555; border-bottom-color: rgba(0,0,0,0.06); }
    html.light .sg-mob-svc-btn:hover { color: #111; }
    html.light .sg-mob-svc-sub a { color: #555; border-bottom-color: rgba(0,0,0,0.05); }
    html.light .sg-mob-svc-sub a:hover { color: #111; }
    html.light .sg-mob-svc-sub .sg-sub-label { color: #bbb; }
    html.light .sg-dropdown-menu { background: #fff; border-color: rgba(0,0,0,0.1); }
    html.light .sg-dropdown-menu::before { background: #fff; border-color: rgba(0,0,0,0.1); }
    html.light .sg-drop-item:hover { background: rgba(0,0,0,0.03); }
    html.light .sg-drop-item-title { color: #111; }
    html.light .sg-drop-item-desc { color: #7a7a7a; }
    html.light .sg-dropdown.sg-open .sg-dropdown-btn { color: #111 !important; }
    html.light .sg-drop-item.sg-all { background: rgba(239,68,68,0.04); }
  `;

  /* ═══════════════════════════════════════════════════════════════
     HTML
  ═══════════════════════════════════════════════════════════════ */
  const HTML = `
  <nav id="sg-navbar">
    <div class="sg-nav-inner">

      <!-- Logo -->
      <a href="/" class="sg-logo" aria-label="Sarath G — Home">
        <span class="sg-logo-first">Sarath</span>
        <span class="sg-logo-dot">G.</span>
      </a>

      <!-- Desktop nav -->
      <div class="sg-desktop-links">

        <div class="sg-dropdown" id="sg-services-dd">
          <div class="sg-dropdown-overlay" onclick="SG.closeDD()"></div>
          <button class="sg-link sg-dropdown-btn" onclick="SG.toggleDD('sg-services-dd')"
            aria-haspopup="true" aria-expanded="false" aria-label="Services menu"
            data-sg-page="services">
            Services
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div class="sg-dropdown-menu" role="menu">
            <a href="/services/" class="sg-drop-item sg-all" role="menuitem" data-sg-nav="services">
              <span class="sg-drop-item-title">All Services</span>
              <span class="sg-drop-item-desc">Overview of all service areas →</span>
            </a>
            <a href="/services/application-security.html" class="sg-drop-item" role="menuitem" data-sg-nav="appsec">
              <span class="sg-drop-item-title">Application Security</span>
              <span class="sg-drop-item-desc">SAST · DAST · Secure Code Review · AppSec</span>
            </a>
            <a href="/services/offensive-security.html" class="sg-drop-item" role="menuitem" data-sg-nav="offsec">
              <span class="sg-drop-item-title">Offensive Security</span>
              <span class="sg-drop-item-desc">Pentest · Red Team · Adversary Simulation</span>
            </a>
            <a href="/services/security-architecture.html" class="sg-drop-item" role="menuitem" data-sg-nav="arch">
              <span class="sg-drop-item-title">Security Architecture</span>
              <span class="sg-drop-item-desc">Zero Trust · BC/DR · DevSecOps</span>
            </a>
            <a href="/services/grc-advisory.html" class="sg-drop-item" role="menuitem" data-sg-nav="grc">
              <span class="sg-drop-item-title">GRC Advisory</span>
              <span class="sg-drop-item-desc">ISO 27001 · NIST CSF · Policy Framework</span>
            </a>
            <a href="/services/corporate-training.html" class="sg-drop-item" role="menuitem" data-sg-nav="training">
              <span class="sg-drop-item-title">Corporate Training</span>
              <span class="sg-drop-item-desc">CEH · CPENT · CHFI · AI Security</span>
            </a>
          </div>
        </div>


        <div class="sg-dropdown" id="sg-labs-dd">
          <div class="sg-dropdown-overlay" onclick="SG.closeDD()"></div>
          <button class="sg-link sg-dropdown-btn" onclick="SG.toggleDD('sg-labs-dd')"
            aria-haspopup="true" aria-expanded="false" aria-label="Labs menu"
            data-sg-page="labs">
            Labs
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div class="sg-dropdown-menu" role="menu">
            <a href="/osint.html" class="sg-drop-item" role="menuitem" data-sg-nav="osint">
              <span class="sg-drop-item-title">OSINT Framework</span>
              <span class="sg-drop-item-desc">Open-source intelligence tool</span>
            </a>
            <a href="/shopeasy.html" class="sg-drop-item" role="menuitem" data-sg-nav="shopeasy">
              <span class="sg-drop-item-title">ShopEasy API Lab</span>
              <span class="sg-drop-item-desc">Hands-on API security lab</span>
            </a>
            <a href="/wazuh.html" class="sg-drop-item" role="menuitem" data-sg-nav="wazuh">
              <span class="sg-drop-item-title">Wazuh SOC Lab</span>
              <span class="sg-drop-item-desc">SIEM &amp; log monitoring guide</span>
            </a>
            <a href="/pivoting.html" class="sg-drop-item" role="menuitem" data-sg-nav="pivoting">
              <span class="sg-drop-item-title">Pivoting &amp; Tunneling</span>
              <span class="sg-drop-item-desc">Port forwarding &amp; lateral movement lab</span>
            </a>
            <a href="/pandora.html" class="sg-drop-item" role="menuitem" data-sg-nav="pandora">
              <span class="sg-drop-item-title">Pandora SAST/DAST Lab</span>
              <span class="sg-drop-item-desc">Self-hosted SAST &amp; DAST security testing lab</span>
            </a>
            <a href="/soc_splunk.html" class="sg-drop-item" role="menuitem" data-sg-nav="splunk">
              <span class="sg-drop-item-title">Splunk SOC Guide</span>
              <span class="sg-drop-item-desc">Hands-on Splunk guide for security operations</span>
            </a>
            <a href="https://labs.sarathg.me" class="sg-drop-item sg-all" role="menuitem" data-sg-nav="alllabs" target="_blank" rel="noopener">
              <span class="sg-drop-item-title">All Labs →</span>
              <span class="sg-drop-item-desc">Full lab directory · labs.sarathg.me</span>
            </a>
          </div>
        </div>


        <div class="sg-dropdown" id="sg-learn-dd">
          <div class="sg-dropdown-overlay" onclick="SG.closeDD()"></div>
          <button class="sg-link sg-dropdown-btn" onclick="SG.toggleDD('sg-learn-dd')"
            aria-haspopup="true" aria-expanded="false" aria-label="Learn menu"
            data-sg-page="learn">
            Learn
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div class="sg-dropdown-menu" role="menu">
            <a href="/start.html" class="sg-drop-item" role="menuitem" data-sg-nav="guide">
              <span class="sg-drop-item-title">Start Here</span>
              <span class="sg-drop-item-desc">The cybersecurity career guide, by path</span>
            </a>
            <a href="/blog/" class="sg-drop-item" role="menuitem" data-sg-nav="blog">
              <span class="sg-drop-item-title">Blog</span>
              <span class="sg-drop-item-desc">Career roadmaps and practitioner notes</span>
            </a>
            <a href="/gethired.html" class="sg-drop-item" role="menuitem" data-sg-nav="gethired">
              <span class="sg-drop-item-title">GetHired</span>
              <span class="sg-drop-item-desc">Free CV screener, assessment and roadmap</span>
            </a>
            <a href="/dare.html" class="sg-drop-item" role="menuitem" data-sg-nav="dare">
              <span class="sg-drop-item-title">DARE Framework</span>
              <span class="sg-drop-item-desc">Training design from Certified and Clueless</span>
            </a>
          </div>
        </div>


        <div class="sg-dropdown" id="sg-about-dd">
          <div class="sg-dropdown-overlay" onclick="SG.closeDD()"></div>
          <button class="sg-link sg-dropdown-btn" onclick="SG.toggleDD('sg-about-dd')"
            aria-haspopup="true" aria-expanded="false" aria-label="About menu"
            data-sg-page="home">
            About
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div class="sg-dropdown-menu" role="menu">
            <a href="/#about" class="sg-drop-item" role="menuitem" data-sg-nav="about">
              <span class="sg-drop-item-title">About Sarath</span>
              <span class="sg-drop-item-desc">Who I am and what I do</span>
            </a>
            <a href="/#experience" class="sg-drop-item" role="menuitem" data-sg-nav="experience">
              <span class="sg-drop-item-title">Experience</span>
              <span class="sg-drop-item-desc">Roles and engagements</span>
            </a>
            <a href="/#gallery" class="sg-drop-item" role="menuitem" data-sg-nav="gallery">
              <span class="sg-drop-item-title">Gallery</span>
              <span class="sg-drop-item-desc">From the training room</span>
            </a>
            <a href="/#projects" class="sg-drop-item" role="menuitem" data-sg-nav="projects">
              <span class="sg-drop-item-title">Projects</span>
              <span class="sg-drop-item-desc">Labs, tools and guides</span>
            </a>
            <a href="/#skills" class="sg-drop-item" role="menuitem" data-sg-nav="skills">
              <span class="sg-drop-item-title">Skills</span>
              <span class="sg-drop-item-desc">Where I work</span>
            </a>
            <a href="/#footprint" class="sg-drop-item" role="menuitem" data-sg-nav="footprint">
              <span class="sg-drop-item-title">Footprint</span>
              <span class="sg-drop-item-desc">Countries and clients</span>
            </a>
          </div>
        </div>

        <a href="/coaching/" class="sg-link sg-link-coach" data-sg-nav="coaching" data-sg-placement="nav-desktop">1:1 Mentorship</a>

        <button onclick="SG.toggleMode()" class="sg-mode-btn"
          aria-label="Toggle dark/light mode" title="Toggle theme" id="sg-mode-btn">
          ☀
        </button>

        <a href="/#contact" class="sg-cta">Contact Me</a>
      </div>

      <!-- Mobile controls -->
      <div class="sg-mobile-controls">
        <a href="/coaching/" class="sg-mob-pill" data-sg-nav="coaching" data-sg-placement="nav-pill" aria-label="1:1 Mentorship">1:1 Mentorship</a>
        <button onclick="SG.toggleMode()" class="sg-mode-btn"
          aria-label="Toggle theme" id="sg-mode-btn-mob">☀</button>
        <button onclick="SG.toggleMobile()" class="sg-hamburger"
          aria-label="Open menu" id="sg-hamburger">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="sg-mobile-menu" id="sg-mobile-menu">
      <div class="sg-mobile-menu-inner">

        <button class="sg-mob-svc-btn" id="sg-mob-svc-btn" onclick="SG.toggleMobSub('sg-mob-svc')" aria-expanded="false">
          Services
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="sg-mob-svc-sub" id="sg-mob-svc-sub">
          <a href="/services/" onclick="SG.toggleMobile()" data-sg-nav="services" style="color:#ef4444;">
            All Services
            <span class="sg-sub-label">Overview of all service areas →</span>
          </a>
          <a href="/services/application-security.html" onclick="SG.toggleMobile()" data-sg-nav="appsec">
            Application Security
            <span class="sg-sub-label">SAST · DAST · Secure Code Review · AppSec</span>
          </a>
          <a href="/services/offensive-security.html" onclick="SG.toggleMobile()" data-sg-nav="offsec">
            Offensive Security
            <span class="sg-sub-label">Pentest · Red Team · Adversary Simulation</span>
          </a>
          <a href="/services/security-architecture.html" onclick="SG.toggleMobile()" data-sg-nav="arch">
            Security Architecture
            <span class="sg-sub-label">Zero Trust · BC/DR · DevSecOps</span>
          </a>
          <a href="/services/grc-advisory.html" onclick="SG.toggleMobile()" data-sg-nav="grc">
            GRC Advisory
            <span class="sg-sub-label">ISO 27001 · NIST CSF · Policy Framework</span>
          </a>
          <a href="/services/corporate-training.html" onclick="SG.toggleMobile()" data-sg-nav="training">
            Corporate Training
            <span class="sg-sub-label">CEH · CPENT · CHFI · AI Security</span>
          </a>
        </div>


        <button class="sg-mob-svc-btn" id="sg-mob-labs-btn" onclick="SG.toggleMobSub('sg-mob-labs')" aria-expanded="false">
          Labs
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="sg-mob-svc-sub" id="sg-mob-labs-sub">
          <a href="/osint.html" onclick="SG.toggleMobile()" data-sg-nav="osint">
            OSINT Framework
            <span class="sg-sub-label">Open-source intelligence tool</span>
          </a>
          <a href="/shopeasy.html" onclick="SG.toggleMobile()" data-sg-nav="shopeasy">
            ShopEasy API Lab
            <span class="sg-sub-label">Hands-on API security lab</span>
          </a>
          <a href="/wazuh.html" onclick="SG.toggleMobile()" data-sg-nav="wazuh">
            Wazuh SOC Lab
            <span class="sg-sub-label">SIEM &amp; log monitoring guide</span>
          </a>
          <a href="/pivoting.html" onclick="SG.toggleMobile()" data-sg-nav="pivoting">
            Pivoting &amp; Tunneling
            <span class="sg-sub-label">Port forwarding &amp; lateral movement lab</span>
          </a>
          <a href="/pandora.html" onclick="SG.toggleMobile()" data-sg-nav="pandora">
            Pandora SAST/DAST Lab
            <span class="sg-sub-label">Self-hosted SAST &amp; DAST security testing lab</span>
          </a>
          <a href="/soc_splunk.html" onclick="SG.toggleMobile()" data-sg-nav="splunk">
            Splunk SOC Guide
            <span class="sg-sub-label">Hands-on Splunk guide for security operations</span>
          </a>
          <a href="https://labs.sarathg.me" onclick="SG.toggleMobile()" data-sg-nav="alllabs" target="_blank" rel="noopener" style="color:#ef4444;">
            All Labs →
            <span class="sg-sub-label">Full lab directory · labs.sarathg.me</span>
          </a>
        </div>


        <button class="sg-mob-svc-btn" id="sg-mob-learn-btn" onclick="SG.toggleMobSub('sg-mob-learn')" aria-expanded="false">
          Learn
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="sg-mob-svc-sub" id="sg-mob-learn-sub">
          <a href="/start.html" onclick="SG.toggleMobile()" data-sg-nav="guide">
            Start Here
            <span class="sg-sub-label">The cybersecurity career guide, by path</span>
          </a>
          <a href="/blog/" onclick="SG.toggleMobile()" data-sg-nav="blog">
            Blog
            <span class="sg-sub-label">Career roadmaps and practitioner notes</span>
          </a>
          <a href="/gethired.html" onclick="SG.toggleMobile()" data-sg-nav="gethired">
            GetHired
            <span class="sg-sub-label">Free CV screener, assessment and roadmap</span>
          </a>
          <a href="/dare.html" onclick="SG.toggleMobile()" data-sg-nav="dare">
            DARE Framework
            <span class="sg-sub-label">Training design from Certified and Clueless</span>
          </a>
        </div>


        <button class="sg-mob-svc-btn" id="sg-mob-about-btn" onclick="SG.toggleMobSub('sg-mob-about')" aria-expanded="false">
          About
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="sg-mob-svc-sub" id="sg-mob-about-sub">
          <a href="/#about" onclick="SG.toggleMobile()" data-sg-nav="about">
            About Sarath
            <span class="sg-sub-label">Who I am and what I do</span>
          </a>
          <a href="/#experience" onclick="SG.toggleMobile()" data-sg-nav="experience">
            Experience
            <span class="sg-sub-label">Roles and engagements</span>
          </a>
          <a href="/#gallery" onclick="SG.toggleMobile()" data-sg-nav="gallery">
            Gallery
            <span class="sg-sub-label">From the training room</span>
          </a>
          <a href="/#projects" onclick="SG.toggleMobile()" data-sg-nav="projects">
            Projects
            <span class="sg-sub-label">Labs, tools and guides</span>
          </a>
          <a href="/#skills" onclick="SG.toggleMobile()" data-sg-nav="skills">
            Skills
            <span class="sg-sub-label">Where I work</span>
          </a>
          <a href="/#footprint" onclick="SG.toggleMobile()" data-sg-nav="footprint">
            Footprint
            <span class="sg-sub-label">Countries and clients</span>
          </a>
        </div>

        <a href="/coaching/" class="sg-mobile-link sg-link-coach" onclick="SG.toggleMobile()" data-sg-nav="coaching" data-sg-placement="nav-mobile-menu">1:1 Mentorship</a>
        <a href="/#contact" class="sg-mobile-cta" onclick="SG.toggleMobile()">Contact Me</a>
      </div>
    </div>
  </nav>
  `;

  /* ═══════════════════════════════════════════════════════════════
     INJECT STYLES
  ═══════════════════════════════════════════════════════════════ */
  function injectStyles() {
    if (document.getElementById('sg-navbar-css')) return;
    const s = document.createElement('style');
    s.id = 'sg-navbar-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════════════════════════
     INJECT HTML
     Replaces <div id="navbar-placeholder"> if present,
     otherwise prepends to <body>.
  ═══════════════════════════════════════════════════════════════ */
  function injectHTML() {
    if (document.getElementById('sg-navbar')) return; // already rendered
    const ph = document.getElementById('navbar-placeholder');
    if (ph) {
      ph.outerHTML = HTML;
    } else {
      document.body.insertAdjacentHTML('afterbegin', HTML);
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     ACTIVE PAGE HIGHLIGHT
     Marks the nav link whose path best matches current URL.
  ═══════════════════════════════════════════════════════════════ */
  function markActive() {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    const isServices = path.startsWith('/services');
    const isGuide    = path === '/start' || path === '/start.html';
    // Every post lives at /blog/<slug>.html, so the section link stays lit
    // on posts as well as on the index — same idea as isServices above.
    const isBlog     = path === '/blog' || path.startsWith('/blog/');
    const isOsint    = path === '/osint' || path === '/osint.html';
    const isLabs     = isOsint
                    || path === '/shopeasy' || path === '/shopeasy.html'
                    || path === '/wazuh'    || path === '/wazuh.html';

    // Desktop links
    document.querySelectorAll('#sg-navbar .sg-link[href]').forEach(el => {
      const hp = (el.getAttribute('href') || '').split('#')[0].replace(/\/$/, '') || '/';
      el.classList.toggle('sg-active', hp === path && hp !== '/');
    });

    // Light the dropdown button that owns the current page
    const isLearn = isGuide || isBlog || path === '/gethired' || path === '/gethired.html' || path === '/dare' || path === '/dare.html';
    const isLabPage = isLabs || ['/pivoting', '/pandora', '/soc_splunk'].some(x => path === x || path === x + '.html');
    const lit = { 'sg-services-dd': isServices, 'sg-labs-dd': isLabPage, 'sg-learn-dd': isLearn };
    Object.keys(lit).forEach(id => {
      const btn = document.querySelector('#' + id + ' .sg-dropdown-btn');
      if (btn && lit[id]) btn.classList.add('sg-active');
    });
    if (isGuide) document.querySelectorAll('[data-sg-nav="guide"]').forEach(el => el.classList.add('sg-active'));
    if (isBlog)  document.querySelectorAll('[data-sg-nav="blog"]').forEach(el => el.classList.add('sg-active'));

    // Mobile links
    document.querySelectorAll('#sg-mobile-menu .sg-mobile-link[href]').forEach(el => {
      const hp = (el.getAttribute('href') || '').split('#')[0].replace(/\/$/, '') || '/';
      el.classList.toggle('sg-active', hp === path && hp !== '/');
    });

    // Mobile services sub-links
    if (isServices) {
      document.querySelectorAll('#sg-mob-svc-sub a').forEach(a => {
        const hp = (a.getAttribute('href') || '').replace(/\/$/, '');
        if (hp === path) a.style.color = '#ef4444';
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     SCROLL EFFECT
  ═══════════════════════════════════════════════════════════════ */
  function initScroll() {
    const nav = document.getElementById('sg-navbar');
    if (!nav) return;
    const update = () => {
      nav.classList.toggle('sg-scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', update, { passive: true });
    update(); // run once on load
  }

  /* ═══════════════════════════════════════════════════════════════
     UPDATE MODE BUTTON ICON
  ═══════════════════════════════════════════════════════════════ */
  function updateModeIcon() {
    const isLight = document.documentElement.classList.contains('light');
    document.querySelectorAll('.sg-mode-btn').forEach(btn => {
      btn.textContent = isLight ? '☾' : '☀';
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     PUBLIC API  →  window.SG
  ═══════════════════════════════════════════════════════════════ */
  window.SG = {
    toggleMode() {
      document.documentElement.classList.toggle('light');
      localStorage.setItem('theme',
        document.documentElement.classList.contains('light') ? 'light' : 'dark');
      updateModeIcon();
    },
    toggleMobile() {
      const m = document.getElementById('sg-mobile-menu');
      if (m) m.classList.toggle('sg-open');
    },
    toggleDD(id = 'sg-services-dd') {
      const dd  = document.getElementById(id);
      const btn = dd && dd.querySelector('.sg-dropdown-btn');
      if (!dd) return;
      const wasOpen = dd.classList.contains('sg-open');
      this.closeDD();
      if (!wasOpen) {
        dd.classList.add('sg-open');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      }
    },
    closeDD() {
      document.querySelectorAll('.sg-dropdown.sg-open').forEach(el => {
        el.classList.remove('sg-open');
        const btn = el.querySelector('.sg-dropdown-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    },
    toggleMobSub(id) {
      const btn = document.getElementById(id + '-btn');
      const sub = document.getElementById(id + '-sub');
      if (!btn || !sub) return;
      const open = sub.classList.toggle('sg-open');
      btn.classList.toggle('sg-open', open);
      btn.setAttribute('aria-expanded', String(open));
    },
    toggleMobSvc()  { this.toggleMobSub('sg-mob-svc'); },
    toggleMobLabs() { this.toggleMobSub('sg-mob-labs'); }
  };

  // Keyboard: Escape closes dropdown
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.SG.closeDD();
  });

  /* ═══════════════════════════════════════════════════════════════
     BOOT
  ═══════════════════════════════════════════════════════════════ */
  function boot() {
    injectStyles();
    injectHTML();
    markActive();
    initScroll();
    updateModeIcon();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  /* ── Coaching CTA measurement ─────────────────────────────────────────
     One listener for every mentorship link on the site. Any <a> carrying
     data-sg-placement (nav, pill, footer, hero, strip, end panel, page-local
     closers) sends a GA4 event naming where it was clicked, so placements can
     be compared and pruned. No-op when gtag is absent (local preview). */
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

})();
