/**
 * Adds restrained scroll reveals to content which does not already have an
 * animation. Existing AOS trees, sliders, marquees, loaders and other animated
 * components are deliberately left alone.
 */
(function () {
  "use strict";

  var animatedClassPattern =
    /(^|[-_])(animate|animated|animation|aos|carousel|loader|marquee|parallax|reveal|ripple|scroll|slider|swiper|ticker)([-_]|$)/i;

  function hasAnimationMarker(element) {
    if (!element || element.nodeType !== 1) return false;

    if (element.hasAttribute("data-aos") ||
        element.hasAttribute("data-gsap") ||
        element.hasAttribute("data-animation")) {
      return true;
    }

    var className = typeof element.className === "string" ? element.className : "";
    var inlineStyle = element.getAttribute("style") || "";

    return animatedClassPattern.test(className) ||
      /(?:^|;)\s*(?:animation|transition)\s*:/i.test(inlineStyle);
  }

  function isInsideExistingAnimation(element) {
    var current = element;

    while (current && current !== document.body) {
      if (hasAnimationMarker(current)) return true;
      current = current.parentElement;
    }

    return false;
  }

  function containsAnimatedComponent(element) {
    var descendants = element.querySelectorAll(
      "[data-aos], [data-gsap], [data-animation], [class]"
    );

    for (var i = 0; i < descendants.length; i += 1) {
      if (hasAnimationMarker(descendants[i])) return true;
    }

    return false;
  }

  function reveal(element, animation, delay) {
    if (isInsideExistingAnimation(element) || containsAnimatedComponent(element)) return;

    element.setAttribute("data-aos", animation);
    if (delay) element.setAttribute("data-aos-delay", String(delay));
  }

  function decoratePage() {
    if (!window.AOS) return;

    var sections = document.querySelectorAll("main section, body > section");

    sections.forEach(function (section, sectionIndex) {
      if (isInsideExistingAnimation(section) || containsAnimatedComponent(section)) return;

      var contentBlocks = section.querySelectorAll(
        ":scope > .container, :scope > .container-fluid, :scope > .wrapper, :scope > .content"
      );

      if (contentBlocks.length) {
        contentBlocks.forEach(function (block, blockIndex) {
          reveal(block, (sectionIndex + blockIndex) % 2 ? "fade-up" : "fade-up", 0);
        });
      } else {
        reveal(section, "fade-up", 0);
      }
    });

    document.querySelectorAll(
      "main > .container, main > .container-fluid, main > article, body > article"
    ).forEach(function (block) {
      reveal(block, "fade-up", 0);
    });

    if (!document.querySelector("[data-aos]")) return;

    window.AOS.init({
      duration: 850,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      disable: function () {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      }
    });

    window.setTimeout(function () {
      window.AOS.refreshHard();
    }, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", decoratePage);
  } else {
    decoratePage();
  }
})();
