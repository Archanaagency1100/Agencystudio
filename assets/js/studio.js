
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