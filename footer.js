/*!
 * footer.js — sarathg.me shared footer
 * Injects a uniform footer at the end of <body> on every page.
 * Scoped like navbar.js: all CSS is prefixed #sg-footer / .sgf-* so it
 * can't clash with any of the site's five host-page design systems.
 *
 * Include path is root-relative from the page's own location, same as navbar.js:
 *   <script src="footer.js"></script>        (repo root pages)
 *   <script src="../footer.js"></script>     (from services/)
 *
 * TODO before shipping: replace the five "#TODO-..." hrefs below with your
 * real profile URLs (GitHub, LinkedIn, Medium, Instagram, YouTube).
 */
(function () {
  if (document.getElementById('sg-footer')) return; // guard against double-injection

  var SOCIALS = [
    { name: 'GitHub',    href: 'https://github.com/secretguard',          icon: 'github' },
    { name: 'LinkedIn',  href: 'https://www.linkedin.com/in/sarathcybersec/', icon: 'linkedin' },
    { name: 'Medium',    href: 'https://sarathg.medium.com/',             icon: 'medium' },
    { name: 'Instagram', href: 'https://www.instagram.com/i.sarathg/',    icon: 'instagram' },
    { name: 'YouTube',   href: 'https://youtube.com/@i_sarathg',          icon: 'youtube' }
  ];

  var NAV_LINKS = [
    { label: 'About',    href: '/#about' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Services',  href: '/services/' },
    { label: 'Labs',      href: 'https://labs.sarathg.me' },
    { label: 'Blog',      href: '/blog/' },
    { label: 'Cybersec Guide', href: '/start.html' },
    { label: '1:1 Mentorship', href: '/coaching/', placement: 'footer-site' }
  ];

  var ICONS = {
    github: '<path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.03 3.26 9.29 7.79 10.8.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.17.69-3.84-1.35-3.84-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12.02C23.5 5.73 18.27.5 12 .5Z"/>',
    linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM.5 8.75h8.96V23.5H.5V8.75Zm7.6 0h8.59v2.02h.12c1.2-2.14 4.12-2.02 4.75-2.02 5.08 0 5.44 3.34 5.44 7.68V23.5h-8.96v-6.72c0-1.6-.03-3.66-2.24-3.66-2.24 0-2.58 1.75-2.58 3.55v6.83H8.1V8.75Z"/>',
    medium: '<path d="M2.5 5.5c0-.66-.03-1.19-2.5-1.44v-.31h7.87l6.08 13.34 5.35-13.34H24v.31c-2.14.19-2.35.35-2.35 1.6v13.15c0 1.25.21 1.4 2.35 1.6v.31H14.6v-.31c2.14-.2 2.35-.4 2.35-1.6V6.66l-6.53 16.51h-.88L2.05 6.9v11.4c0 .96.13 1.28 2.6 1.55v.31H.15v-.31c2.03-.27 2.35-.59 2.35-1.55V5.5Z" transform="translate(0 -.1) scale(.92)"/>',
    instagram: '<path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.24 2.22.41.56.21.96.47 1.38.9.42.42.68.82.9 1.38.17.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.24-2.22-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.17-.42-.36-1.05-.41-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.8.41-2.22.21-.56.47-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.05-.36 2.22-.41 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.39A5.9 5.9 0 0 0 .62 4.15C.32 4.9.12 5.78.06 7.05.01 8.33 0 8.74 0 12s.01 3.67.06 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.39 2.13.66.66 1.34 1.08 2.13 1.39.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.06c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.39 5.9 5.9 0 0 0 1.39-2.13c.3-.76.5-1.64.56-2.91.05-1.28.06-1.69.06-4.95s-.01-3.67-.06-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"/>',
    youtube: '<path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.44 3.5 12 3.5 12 3.5s-7.44 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.56 20.5 12 20.5 12 20.5s7.44 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.6V8.4l6.27 3.6-6.27 3.6Z"/>'
  };

  function svgIcon(name) {
    return '<svg viewBox="0 0 24 24" class="sgf-icon" aria-hidden="true" focusable="false">' + (ICONS[name] || '') + '</svg>';
  }

  var css = ''
    + '#sg-footer{'
    + '  font-family:var(--font-body, "Inter", sans-serif);'
    + '  background:var(--bg-footer, var(--bg-card, #111));'
    + '  color:var(--t-secondary, #9a9a9a);'
    + '  border-top:1px solid var(--b-subtle, #242424);'
    + '  margin-top:60px;'
    + '  position:relative;'
    + '  z-index:5;'
    + '}'
    + '#sg-footer .sgf-inner{'
    + '  max-width:1180px; margin:0 auto; padding:52px 24px 28px;'
    + '  display:grid; grid-template-columns:1.3fr 1fr 1fr; gap:36px;'
    + '}'
    + '#sg-footer .sgf-brand{ font-family:var(--font-display, "Outfit", sans-serif); font-weight:700; font-size:19px; color:var(--t-primary, #f5f5f5); margin-bottom:8px; }'
    + '#sg-footer .sgf-tagline{ font-size:13.5px; line-height:1.6; max-width:34ch; margin-bottom:18px; }'
    + '#sg-footer .sgf-socials{ display:flex; gap:10px; flex-wrap:wrap; }'
    + '#sg-footer .sgf-social-link{ display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:8px; border:1px solid var(--b-subtle, #242424); color:var(--t-secondary, #9a9a9a); text-decoration:none; transition:border-color .15s ease, color .15s ease, transform .15s ease; }'
    + '#sg-footer .sgf-social-link:hover{ border-color:var(--accent, #ef4444); color:var(--t-primary, #f5f5f5); transform:translateY(-2px); }'
    + '#sg-footer .sgf-icon{ width:16px; height:16px; fill:currentColor; }'
    + '#sg-footer .sgf-heading{ font-family:var(--font-display, "Outfit", sans-serif); font-weight:600; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--t-primary, #f5f5f5); margin-bottom:14px; }'
    + '#sg-footer .sgf-links{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:10px; }'
    + '#sg-footer .sgf-links a{ color:var(--t-secondary, #9a9a9a); text-decoration:none; font-size:13.5px; transition:color .15s ease; }'
    + '#sg-footer .sgf-links a:hover{ color:var(--accent, #ef4444); }'
    + '#sg-footer .sgf-cta-text{ font-size:13.5px; line-height:1.6; margin-bottom:16px; max-width:30ch; }'
    /* #dc2626 fallback (red-600) on white text = 4.83:1, meets WCAG AA; the old
       #ef4444 fallback only reached 3.76:1. Pages that define their own --accent
       (e.g. the green services theme) still use that color here unchanged. */
    + '#sg-footer .sgf-cta-btn{ display:inline-flex; align-items:center; gap:8px; background:var(--accent, #dc2626); color:#fff; text-decoration:none; font-family:var(--font-mono, "JetBrains Mono", monospace); font-size:13px; font-weight:500; padding:10px 16px; border-radius:7px; transition:transform .15s ease, opacity .15s ease; }'
    + '#sg-footer .sgf-cta-btn:hover{ transform:translateY(-1px); opacity:.92; }'
    + '#sg-footer .sgf-alt{ margin:14px 0 0; font-size:13px; line-height:1.5; }'
    + '#sg-footer .sgf-alt a{ color:var(--t-secondary, #9a9a9a); text-decoration:none; border-bottom:1px solid var(--b-subtle, #242424); transition:color .15s ease, border-color .15s ease; }'
    + '#sg-footer .sgf-alt a:hover{ color:#4fffb0; border-color:#4fffb0; }'
    + 'html.light #sg-footer .sgf-alt a:hover{ color:#0B6B4A; border-color:#0B6B4A; }'
    + '#sg-footer .sgf-bottom{ border-top:1px solid var(--b-subtle, #242424); padding:18px 24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; max-width:1180px; margin:0 auto; font-size:12px; }'
    + '#sg-footer .sgf-bottom a{ color:var(--t-secondary, #9a9a9a); text-decoration:none; }'
    + '#sg-footer .sgf-bottom a:hover{ color:var(--accent, #ef4444); }'
    + '@media (max-width:760px){'
    + '  #sg-footer .sgf-inner{ grid-template-columns:1fr; gap:30px; padding:44px 20px 24px; }'
    + '  #sg-footer .sgf-bottom{ flex-direction:column; align-items:flex-start; padding:16px 20px; }'
    + '}';

  var styleEl = document.createElement('style');
  styleEl.id = 'sg-footer-css';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  var socialsHtml = SOCIALS.map(function (s) {
    return '<a class="sgf-social-link" href="' + s.href + '" target="_blank" rel="noopener noreferrer" aria-label="' + s.name + '">' + svgIcon(s.icon) + '</a>';
  }).join('');

  var navHtml = NAV_LINKS.map(function (l) {
    var extra = l.placement ? ' data-sg-placement="' + l.placement + '"' : '';
    return '<li><a href="' + l.href + '"' + extra + '>' + l.label + '</a></li>';
  }).join('');

  var year = new Date().getFullYear();

  var html = ''
    + '<div class="sgf-inner">'
    + '  <div class="sgf-col">'
    + '    <div class="sgf-brand">Sarath G</div>'
    + '    <p class="sgf-tagline">Penetration testing, application security, and corporate training — built from 9+ years in the field. Author of <em>Certified and Clueless</em>.</p>'
    + '    <div class="sgf-socials">' + socialsHtml + '</div>'
    + '  </div>'
    + '  <div class="sgf-col">'
    + '    <div class="sgf-heading">Site</div>'
    + '    <ul class="sgf-links">' + navHtml + '</ul>'
    + '  </div>'
    + '  <div class="sgf-col">'
    + '    <div class="sgf-heading">Work together</div>'
    + '    <p class="sgf-cta-text">Have a project, an assessment, or a training need? Let\'s talk it through.</p>'
    + '    <a class="sgf-cta-btn" href="https://meet.sarathg.me/" target="_blank" rel="noopener">Book a consultation →</a>'
    + '    <p class="sgf-alt"><a href="/coaching/" data-sg-placement="footer-alt">Looking for 1:1 mentorship instead? →</a></p>'
    + '  </div>'
    + '</div>'
    + '<div class="sgf-bottom">'
    + '  <span>© ' + year + ' Sarath G. All rights reserved.</span>'
    + '  <a href="/">sarathg.me</a>'
    + '</div>';

  var footer = document.createElement('footer');
  footer.id = 'sg-footer';
  footer.innerHTML = html;

  var placeholder = document.getElementById('footer-placeholder');
  if (placeholder) {
    placeholder.replaceWith(footer);
  } else {
    document.body.appendChild(footer);
  }
})();