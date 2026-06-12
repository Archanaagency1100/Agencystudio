
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