"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const navPlaceholder = document.getElementById('nav-placeholder');

    if (navPlaceholder) {
        // Universal absolute path starting with /
        const navbarPath = "/components/agency/navbar.html";

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

document.addEventListener("DOMContentLoaded", function () {
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (footerPlaceholder) {
       
        const footerPath = "/components/agency/footer.html";

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