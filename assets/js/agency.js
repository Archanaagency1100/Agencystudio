"use strict";

if (!document.querySelector('script[src="/assets/js/aos-loader.js"]')) {
    const aosLoader = document.createElement("script");
    aosLoader.src = "/assets/js/aos-loader.js";
    document.body.appendChild(aosLoader);
}

function fetchAgencyComponent(paths) {
    return paths.reduce(function (attempt, path) {
        return attempt.catch(function () {
            return fetch(path, { cache: "no-cache" }).then(function (response) {
                if (!response.ok) throw new Error(path + " returned " + response.status);
                return response.text();
            });
        });
    }, Promise.reject());
}

function loadAgencyNavigation() {
    const navPlaceholder = document.getElementById("nav-placeholder");
    if (!navPlaceholder || navPlaceholder.children.length) return;

    fetchAgencyComponent([
        "/components/agency/navbar.html",
        "../components/agency/navbar.html"
    ]).then(function (data) {
        navPlaceholder.innerHTML = data;
        highlightActiveLink();
        setupMobileCollapse();
    }).catch(function (error) {
        console.error("Error loading navigation:", error);
    });
}

function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        link.classList.remove("active");

        if (currentPath.endsWith(linkHref) || (linkHref !== "/" && currentPath.includes(linkHref))) {
            link.classList.add("active");
        }
    });
}

function setupMobileCollapse() {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navContent');
    
    if (menuToggle) {
        const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
        navLinks.forEach((l) => {
            l.addEventListener('click', () => { 
                if (window.innerWidth < 992) { bsCollapse.hide(); } 
            });
        });
    }
}

function loadAgencyFooter() {
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (!footerPlaceholder || footerPlaceholder.children.length) return;

    fetchAgencyComponent([
        "/components/agency/footer.html",
        "../components/agency/footer.html"
    ]).then(function (data) {
        footerPlaceholder.innerHTML = data;
    }).catch(function (error) {
        console.error("Error loading footer:", error);
    });
}

// This file is loaded after both placeholders, so do not wait for another
// lifecycle event before starting the component requests.
loadAgencyNavigation();
loadAgencyFooter();
// ------------------services circle effect----------------

document.addEventListener("DOMContentLoaded", function () {
    
    if (typeof Swiper !== 'undefined' && document.querySelector('.a11-services-swiper')) {
        let servicesSwiper;

        function initServicesSlider() {
            const isMobileWidth = window.innerWidth <= 767;

            if (isMobileWidth && !servicesSwiper) {
                
                servicesSwiper = new Swiper('.a11-services-swiper', {
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    loop: true,
                    speed: 600,
                    resistanceRatio: 0.85,
                    grabCursor: true,
                    slideToClickedSlide: true, 
                });
            } else if (!isMobileWidth && servicesSwiper) {
                servicesSwiper.destroy(true, true);
                servicesSwiper = undefined;
            }
        }

        initServicesSlider();
        window.addEventListener('resize', initServicesSlider);
    }
});
if (!document.querySelector('script[src="/assets/js/accent.js"]')) {
    const accentScript = document.createElement("script");
    accentScript.src = "/assets/js/accent.js";
    document.head.appendChild(accentScript);
}
