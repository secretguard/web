/* Deferred analytics loader for sarathg.me.
 *
 * Loads Google Analytics (gtag.js) and Microsoft Clarity only after the page
 * has finished loading, or on the first user interaction, whichever comes
 * first. Pages keep the tiny inline gtag() stub in <head>, so any
 * gtag('event', ...) call made before this runs is queued in dataLayer and
 * sent once gtag.js arrives. Nothing is lost; it just stops competing with
 * first paint and LCP on mobile.
 */
(function () {
  var GA_ID = 'G-ML4GP9590F';
  var CLARITY_ID = 'yet1lzjxmr';
  var loaded = false;

  function load() {
    if (loaded) return;
    loaded = true;

    // Google Analytics 4
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') {
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', GA_ID);
    }
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(ga);

    // Microsoft Clarity
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    var cl = document.createElement('script');
    cl.async = true;
    cl.src = 'https://www.clarity.ms/tag/' + CLARITY_ID;
    document.head.appendChild(cl);
  }

  function schedule() {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(load, { timeout: 2500 });
    } else {
      window.setTimeout(load, 1200);
    }
  }

  if (document.readyState === 'complete') {
    schedule();
  } else {
    window.addEventListener('load', schedule, { once: true });
  }

  ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(function (evt) {
    window.addEventListener(evt, load, { once: true, passive: true });
  });
})();
