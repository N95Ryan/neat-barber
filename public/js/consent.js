(function () {
  "use strict";

  var COOKIE_NAME = "neat_cookie_consent";
  var MAX_AGE_SEC = 182 * 24 * 60 * 60;
  var GTM_ID = "GTM-P94C5H49";
  var EMR_WIDGET_ID = "9ad155a2-7a40-4d40-8915-a7253b37557e";
  var EMR_HOST = "app.getcoucou.io";
  var EMR_ACCOUNT = 11;

  function gtag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }

  function initDefaultConsentMode() {
    gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "granted",
      security_storage: "granted",
      wait_for_update: 500,
    });
  }

  function readCookie(name) {
    var match = document.cookie.match(
      new RegExp("(?:^|; )" + name.replace(/[$()*+./?[\\\]^{|}-]/g, "\\$&") + "=([^;]*)")
    );
    return match ? decodeURIComponent(match[1]) : null;
  }

  function parseConsent() {
    var raw = readCookie(COOKIE_NAME);
    if (!raw) return null;
    try {
      var data = JSON.parse(raw);
      if (data.v !== 1 || typeof data.ts !== "number") return null;
      if (Date.now() - data.ts > MAX_AGE_SEC * 1000) return null;
      return {
        analytics: Boolean(data.analytics),
        marketing: Boolean(data.marketing),
      };
    } catch (_e) {
      return null;
    }
  }

  function writeConsent(consent) {
    var payload = JSON.stringify({
      v: 1,
      ts: Date.now(),
      analytics: consent.analytics,
      marketing: consent.marketing,
    });
    document.cookie =
      COOKIE_NAME +
      "=" +
      encodeURIComponent(payload) +
      "; path=/; max-age=" +
      MAX_AGE_SEC +
      "; SameSite=Lax" +
      (location.protocol === "https:" ? "; Secure" : "");
  }

  function updateConsentMode(consent) {
    gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    });
  }

  function loadGtm() {
    if (window.__neatGtmLoaded) return;
    window.__neatGtmLoaded = true;
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0];
      var j = d.createElement(s);
      var dl = l !== "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", GTM_ID);
  }

  function loadEmrPixel() {
    if (window.__neatEmrLoaded) return;
    if (!document.querySelector("emr-simple-carousel")) return;
    window.__neatEmrLoaded = true;
    if (window.EMRPixel) {
      window.EMRPixel.init(EMR_HOST, EMR_ACCOUNT);
      return;
    }
    var script = document.createElement("script");
    script.defer = true;
    script.src =
      "https://cdn2.revw.me/js/pixel.js?t=" +
      864e5 * Math.ceil(new Date() / 864e5);
    script.onload = function () {
      if (window.EMRPixel) {
        window.EMRPixel.init(EMR_HOST, EMR_ACCOUNT);
      }
    };
    document.head.appendChild(script);
  }

  function applyConsent(consent) {
    updateConsentMode(consent);
    if (consent.analytics) loadGtm();
    if (consent.marketing) loadEmrPixel();
    document.documentElement.classList.remove("neat-consent-pending");
    window.dispatchEvent(
      new CustomEvent("neat-consent-update", { detail: consent })
    );
  }

  function openPanel(mode) {
    var banner = document.getElementById("neat-cookie-banner");
    var panel = document.getElementById("neat-cookie-panel");
    if (!banner || !panel) return;
    banner.hidden = true;
    panel.hidden = false;
    if (mode === "customize") {
      var stored = parseConsent() || { analytics: false, marketing: false };
      var a = document.getElementById("neat-consent-analytics");
      var m = document.getElementById("neat-consent-marketing");
      if (a) a.checked = stored.analytics;
      if (m) m.checked = stored.marketing;
    }
  }

  function closePanel(showBanner) {
    var banner = document.getElementById("neat-cookie-banner");
    var panel = document.getElementById("neat-cookie-panel");
    if (panel) panel.hidden = true;
    if (banner && showBanner) banner.hidden = false;
  }

  function bindUi() {
    var acceptAll = document.getElementById("neat-cookie-accept-all");
    var rejectAll = document.getElementById("neat-cookie-reject-all");
    var customize = document.getElementById("neat-cookie-customize");
    var save = document.getElementById("neat-cookie-save");
    var panelBack = document.getElementById("neat-cookie-panel-back");
    var manageLinks = document.querySelectorAll("[data-neat-open-cookies]");

    if (acceptAll) {
      acceptAll.addEventListener("click", function () {
        var consent = { analytics: true, marketing: true };
        writeConsent(consent);
        applyConsent(consent);
        closePanel(false);
      });
    }

    if (rejectAll) {
      rejectAll.addEventListener("click", function () {
        var consent = { analytics: false, marketing: false };
        writeConsent(consent);
        applyConsent(consent);
        closePanel(false);
      });
    }

    if (customize) {
      customize.addEventListener("click", function () {
        openPanel("customize");
      });
    }

    if (save) {
      save.addEventListener("click", function () {
        var a = document.getElementById("neat-consent-analytics");
        var m = document.getElementById("neat-consent-marketing");
        var consent = {
          analytics: a ? a.checked : false,
          marketing: m ? m.checked : false,
        };
        writeConsent(consent);
        applyConsent(consent);
        closePanel(false);
      });
    }

    if (panelBack) {
      panelBack.addEventListener("click", function () {
        closePanel(true);
      });
    }

    manageLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var banner = document.getElementById("neat-cookie-banner");
        var panel = document.getElementById("neat-cookie-panel");
        if (banner) banner.hidden = true;
        openPanel("customize");
        if (panel) panel.hidden = false;
      });
    });
  }

  initDefaultConsentMode();
  window.__neatOpenCookieSettings = function () {
    openPanel("customize");
    var banner = document.getElementById("neat-cookie-banner");
    if (banner) banner.hidden = true;
  };

  var existing = parseConsent();
  if (existing) {
    applyConsent(existing);
    var bannerEl = document.getElementById("neat-cookie-banner");
    if (bannerEl) bannerEl.hidden = true;
  } else {
    document.documentElement.classList.add("neat-consent-pending");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindUi);
  } else {
    bindUi();
  }
})();
