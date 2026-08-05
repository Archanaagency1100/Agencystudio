
// Studio page header footer js-------
document.addEventListener("DOMContentLoaded", function () {
    const navPlaceholder = document.getElementById('nav-placeholder');

    if (navPlaceholder) {
       
        const path = window.location.pathname;
        let prefix = "";

        if (path.includes('/agency/') || path.includes('/studio/')) {
            prefix = "../"; 
        }

       
        const navbarPath = `${prefix}components/studio/navbar.html`;

        
        fetch(navbarPath)
            .then(response => {
                if (!response.ok) throw new Error('Navbar file not found');
                return response.text();
            })
            .then(data => {
                navPlaceholder.innerHTML = data;
                
                
                highlightActiveLink();
                setupMobileCollapse();
            })
            .catch(err => console.error('Error loading navigation:', err));
    }
});

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

// -----------------footer----------


document.addEventListener("DOMContentLoaded", function () {

    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (footerPlaceholder) {

     
        const path = window.location.pathname;
        let prefix = "";

        if (path.includes('/agency/') || path.includes('/studio/')) {
            prefix = "../";
        }


        const footerPath = `${prefix}components/studio/footer.html`;

 
        fetch(footerPath)
            .then(response => {
                if (!response.ok) throw new Error('Footer file not found');
                return response.text();
            })
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(err => console.error('Error loading footer:', err));

    }

});



// -------home page num tacky colour and count js---------------------


document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(
        ".legacy-numbers-section"
    );

    const counters = document.querySelectorAll(
        ".legacy-counter"
    );

    if (!section || !counters.length) {
        return;
    }

    /*
     * One colour is selected for every number.
     * The same colour will not repeat on the next refresh.
     */
    const counterColours = [
        "#dae275", // Lime
        "#00f5ff", // Electric cyan
        "#ff2bd6", // Neon pink
        "#ff6b00", // Bright orange
        "#a855f7", // Electric purple
        "#58f47b", // Mint green
        "#ffe600", // Bright yellow
        "#3b82ff"  // Electric blue
    ];

    const storageKey = "legacyCounterPreviousColour";

    const previousColour =
        localStorage.getItem(storageKey);

    const availableColours = counterColours.filter(
        function (colour) {
            return colour !== previousColour;
        }
    );

    const selectedColour =
        availableColours[
            Math.floor(
                Math.random() * availableColours.length
            )
        ];

    localStorage.setItem(
        storageKey,
        selectedColour
    );

    /*
     * Apply the same colour to every counter.
     */
    section.style.setProperty(
        "--legacy-counter-color",
        selectedColour
    );

    function animateCounter(counter) {
        if (counter.dataset.counted === "true") {
            return;
        }

        counter.dataset.counted = "true";

        const target = Number(
            counter.dataset.target || 0
        );

        const suffix =
            counter.dataset.suffix || "";

        const duration = 1800;
        const startTime = performance.now();

        counter.classList.add("is-counting");

        function updateCounter(currentTime) {
            const elapsed =
                currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            /*
             * Smooth ease-out counting.
             */
            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            const currentValue = Math.floor(
                target * easedProgress
            );

            counter.textContent =
                currentValue.toLocaleString("en-IN") +
                suffix;

            if (progress < 1) {
                requestAnimationFrame(
                    updateCounter
                );

                return;
            }

            counter.textContent =
                target.toLocaleString("en-IN") +
                suffix;

            counter.classList.remove(
                "is-counting"
            );

            counter.classList.add(
                "is-complete"
            );
        }

        requestAnimationFrame(updateCounter);
    }

    /*
     * Start counting when the number section
     * enters the screen.
     */
    const counterObserver =
        new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    animateCounter(entry.target);

                    observer.unobserve(
                        entry.target
                    );
                });
            },
            {
                threshold: 0.35
            }
        );

    counters.forEach(function (counter) {
        counterObserver.observe(counter);
    });
});

// Featured productions: cinematic autoplay slider.
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".featured-productions-swiper");

    if (!slider || typeof Swiper === "undefined") {
        return;
    }

    new Swiper(slider, {
        loop: true,
        centeredSlides: true,
        slidesPerView: "auto",
        speed: 900,
        spaceBetween: 22,
        grabCursor: true,
        watchSlidesProgress: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        navigation: {
            prevEl: ".portfolio-slider-control--prev",
            nextEl: ".portfolio-slider-control--next"
        }
    });
});

// Open Vimeo films in an on-page cinema modal.
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("filmModal");
    const player = document.getElementById("filmModalPlayer");
    const modalTitle = document.getElementById("filmModalTitle");
    const vimeoLink = document.getElementById("filmModalVimeoLink");
    const productionLinks = document.querySelectorAll(".featured-productions-swiper .portfolio-item-col > a");
    const productionSwiper = document.querySelector(".featured-productions-swiper").swiper;

    if (!modal || !player || !modalTitle || !vimeoLink || !productionLinks.length) {
        return;
    }

    let previouslyFocusedElement = null;

    function getVimeoEmbedUrl(link) {
        const url = new URL(link.href);
        const pathParts = url.pathname.split("/").filter(Boolean);
        const videoIndex = pathParts.findIndex(function (part) {
            return /^\d+$/.test(part);
        });

        if (videoIndex === -1) {
            return "";
        }

        const videoId = pathParts[videoIndex];
        const privacyHash = pathParts[videoIndex + 1] || "";
        const embedUrl = new URL("https://player.vimeo.com/video/" + videoId);

        if (privacyHash) {
            embedUrl.searchParams.set("h", privacyHash);
        }

        embedUrl.searchParams.set("autoplay", "1");
        embedUrl.searchParams.set("controls", "1");
        embedUrl.searchParams.set("title", "0");
        embedUrl.searchParams.set("byline", "0");
        embedUrl.searchParams.set("portrait", "0");
        embedUrl.searchParams.set("badge", "0");
        embedUrl.searchParams.set("dnt", "1");

        return embedUrl.toString();
    }

    function openFilmModal(link) {
        const embedUrl = getVimeoEmbedUrl(link);

        if (!embedUrl) {
            return;
        }

        const title = link.querySelector(".portfolio-text-fallback");

        previouslyFocusedElement = document.activeElement;
        modalTitle.textContent = title ? title.textContent.trim() : "Featured Production";
        vimeoLink.href = link.href;
        player.src = embedUrl;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("film-modal-open");

        if (productionSwiper && productionSwiper.autoplay) {
            productionSwiper.autoplay.pause();
        }

        modal.querySelector(".film-modal__close").focus();
    }

    function closeFilmModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        player.src = "";
        document.body.classList.remove("film-modal-open");

        if (productionSwiper && productionSwiper.autoplay) {
            productionSwiper.autoplay.resume();
        }

        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }
    }

    productionLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            openFilmModal(link);
        });
    });

    modal.querySelectorAll("[data-film-modal-close]").forEach(function (control) {
        control.addEventListener("click", closeFilmModal);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeFilmModal();
        }
    });
});
if (!document.querySelector('script[src="/assets/js/aos-loader.js"]')) {
  const aosLoader = document.createElement("script");
  aosLoader.src = "/assets/js/aos-loader.js";
  document.body.appendChild(aosLoader);
}
