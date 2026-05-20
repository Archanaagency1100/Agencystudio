/**
 * Global Navigation Loader for AgencyEleven100
 * Handles relative paths and active link highlighting
 */

document.addEventListener("DOMContentLoaded", function () {
    const navPlaceholder = document.getElementById('nav-placeholder');

    if (navPlaceholder) {
        // 1. Detect the current directory depth
        // This helps us find the "components" folder from anywhere
        const path = window.location.pathname;
        let prefix = "";

        if (path.includes('/agency/') || path.includes('/studio/')) {
            prefix = "../"; // Go up one level if we are inside a subfolder
        }

        // 2. Define the path to the shared navbar
        // You can use logic here to load a different navbar for the studio side if needed
        const navbarPath = `${prefix}components/studio/navbar.html`;

        // 3. Fetch and Inject the HTML
        fetch(navbarPath)
            .then(response => {
                if (!response.ok) throw new Error('Navbar file not found');
                return response.text();
            })
            .then(data => {
                navPlaceholder.innerHTML = data;
                
                // 4. Initialize Navbar logic after it's loaded
                highlightActiveLink();
                setupMobileCollapse();
            })
            .catch(err => console.error('Error loading navigation:', err));
    }
});

/**
 * Highlights the current page in the navigation menu
 */
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        
        // Remove default active class first
        link.classList.remove("active");

        // Check if the current URL matches the link's destination
        if (currentPath.endsWith(linkHref) || (linkHref !== "/" && currentPath.includes(linkHref))) {
            link.classList.add("active");
        }
    });
}

/**
 * Ensures Bootstrap mobile menu closes when a link is clicked 
 * (Useful for single-page scrolling or mobile UX)
 */
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