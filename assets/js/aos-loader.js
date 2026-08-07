(function () {
  "use strict";

  if (!document.querySelector('link[href*="aos@2.3.1/dist/aos.css"]')) {
    var stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "https://unpkg.com/aos@2.3.1/dist/aos.css";
    document.head.appendChild(stylesheet);
  }

  function loadGlobalAos() {
    if (document.querySelector('script[src="/assets/js/aos-global.js"]')) return;

    var globalScript = document.createElement("script");
    globalScript.src = "/assets/js/aos-global.js";
    document.body.appendChild(globalScript);
  }

  if (window.AOS) {
    loadGlobalAos();
    return;
  }

  var existingScript = document.querySelector('script[src*="aos@2.3.1/dist/aos.js"]');
  if (existingScript) {
    existingScript.addEventListener("load", loadGlobalAos, { once: true });
    return;
  }

  var aosScript = document.createElement("script");
  aosScript.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
  aosScript.onload = loadGlobalAos;
  document.body.appendChild(aosScript);
})();
if (!document.querySelector('script[src="/assets/js/accent.js"]')) {
  const accentScript = document.createElement("script");
  accentScript.src = "/assets/js/accent.js";
  document.head.appendChild(accentScript);
}
