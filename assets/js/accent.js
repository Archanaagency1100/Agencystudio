(function () {
    "use strict";
    if (window.__siteAccentLoaded) return;
    window.__siteAccentLoaded = true;

    const palette = ["#14f721", "#00c8d4", "#ff2bd6", "#ff6b00", "#a855f7", "#32d75f", "#ffe600", "#3b82ff"];
    const previous = sessionStorage.getItem("sitePreviousAccent");
    const choices = palette.filter(function (colour) { return colour !== previous; });
    const accent = choices[Math.floor(Math.random() * choices.length)];
    const accentRgb = [1, 3, 5].map(function (offset) { return parseInt(accent.slice(offset, offset + 2), 16); });
    const yellowReferences = [[229, 180, 0], [255, 204, 0], [255, 193, 7], [240, 185, 0], [255, 204, 51], [255, 230, 0]];
    const directProperties = ["color", "backgroundColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor", "textDecorationColor", "columnRuleColor", "caretColor"];
    const compoundProperties = ["backgroundImage", "boxShadow", "textShadow"];
    const pendingElements = new Set();
    let workScheduled = false;

    sessionStorage.setItem("sitePreviousAccent", accent);
    document.documentElement.dataset.siteAccent = accent;
    ["--accent-yellow", "--accent-gold", "--color-gold-brand", "--podcast-production-gold", "--brand-management-accent"].forEach(function (property) {
        document.documentElement.style.setProperty(property, accent);
    });

    // Pages built entirely with accent variables need no computed-style scan.
    if (document.documentElement.hasAttribute("data-accent-css-only")) return;

    function parseRgb(value) {
        const match = value && value.match(/^rgba?\(\s*(\d+)\D+(\d+)\D+(\d+)/i);
        return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
    }

    function isSiteYellow(rgb) {
        return rgb && yellowReferences.some(function (yellow) {
            return Math.abs(rgb[0] - yellow[0]) <= 2 && Math.abs(rgb[1] - yellow[1]) <= 2 && Math.abs(rgb[2] - yellow[2]) <= 2;
        });
    }

    function cssName(property) {
        return property.replace(/[A-Z]/g, function (letter) { return "-" + letter.toLowerCase(); });
    }

    function replaceYellowFunctions(value) {
        return value.replace(/rgba?\([^)]*\)/gi, function (colour) {
            const rgb = parseRgb(colour);
            if (!isSiteYellow(rgb)) return colour;
            const alpha = colour.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\s*\)/i);
            return alpha ? "rgba(" + accentRgb.join(", ") + ", " + alpha[1] + ")" : "rgb(" + accentRgb.join(", ") + ")";
        });
    }

    function recolourElement(element) {
        if (!element.isConnected || element.tagName === "SCRIPT" || element.tagName === "STYLE") return;
        const computed = getComputedStyle(element);
        directProperties.forEach(function (property) {
            if (isSiteYellow(parseRgb(computed[property]))) element.style.setProperty(cssName(property), accent, "important");
        });
        compoundProperties.forEach(function (property) {
            const updated = replaceYellowFunctions(computed[property]);
            if (updated !== computed[property]) element.style.setProperty(cssName(property), updated, "important");
        });
        if (element instanceof SVGElement) {
            ["fill", "stroke"].forEach(function (attribute) {
                if (isSiteYellow(parseRgb(computed[attribute]))) element.style.setProperty(attribute, accent, "important");
            });
        }
    }

    function processQueue(deadline) {
        workScheduled = false;
        let processed = 0;
        while (pendingElements.size && processed < 40 && (!deadline || deadline.didTimeout || deadline.timeRemaining() > 2)) {
            const element = pendingElements.values().next().value;
            pendingElements.delete(element);
            recolourElement(element);
            processed += 1;
        }
        if (pendingElements.size) scheduleWork();
    }

    function scheduleWork() {
        if (workScheduled) return;
        workScheduled = true;
        if ("requestIdleCallback" in window) {
            requestIdleCallback(processQueue, { timeout: 250 });
        } else {
            requestAnimationFrame(function () { processQueue(); });
        }
    }

    function enqueue(root, includeDescendants) {
        if (!root) return;
        if (root.nodeType === 1) pendingElements.add(root);
        if (includeDescendants && root.querySelectorAll) {
            root.querySelectorAll("*").forEach(function (element) { pendingElements.add(element); });
        }
        scheduleWork();
    }

    function enqueueDocument() { enqueue(document.documentElement, true); }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enqueueDocument, { once: true });
    else enqueueDocument();

    // Catch hard-coded yellow hover/focus states after they become active.
    document.addEventListener("pointerover", function (event) { enqueue(event.target, false); }, true);
    document.addEventListener("focusin", function (event) { enqueue(event.target, false); }, true);

    new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                if (node.nodeType === 1) enqueue(node, true);
            });
        });
    }).observe(document.documentElement, { childList: true, subtree: true });
}());
