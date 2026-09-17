/* Deferred analytics loader for sarathg.me.
 *
 * Loads Google Analytics (gtag.js), Microsoft Clarity and the Meta Pixel only
 * after the page has finished loading, or on the first user interaction,
 * whichever comes first. Pages keep the tiny inline gtag() stub in <head>, so
 * any gtag('event', ...) call made before this runs is queued in dataLayer and
 * sent once gtag.js arrives. The Meta Pixel gets the same treatment: its queue
 * stub (fbq) is defined synchronously below, so a page can call
 * fbq('track', ...) from a DOMContentLoaded handler and the call is replayed
 * when fbevents.js arrives. Nothing is lost; it just stops competing with
 * first paint and LCP on mobile.
 *
 * Meta Pixel 1131377436123001 is the same dataset meet.sarathg.me uses, so a
 * visitor who reads /programme/ here and books there is one funnel in Events
 * Manager. PageView fires on every page; /programme/ adds ViewContent itself.
 * Disclosed in /privacy/.
 */
(function () {
  var GA_ID = 'G-ML4GP9590F';
  var CLARITY_ID = 'yet1lzjxmr';
  var PIXEL_ID = '1131377436123001';
  var loaded = false;

  // Meta Pixel queue stub, shape-compatible with Meta's official snippet so
  // fbevents.js adopts it and drains the queue. Defined now, loaded later.
  if (!window.fbq) {
    var n = window.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!window._fbq) window._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

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

    // Meta Pixel
    var fb = document.createElement('script');
    fb.async = true;
    fb.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(fb);
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
