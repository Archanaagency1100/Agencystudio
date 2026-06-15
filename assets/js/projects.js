document.addEventListener("DOMContentLoaded", function () {
    // 1. Core JSON Array Dataset Configuration
    const projectsDataset = [
        {
            title: "MANAS X SHAURYA",
            categories: "websites",
            gridClass: "item-wide",
            imgUrl: "/assets/img/projects/manas.jpg",
            meta: "Website / Creative Direction"
        },
        {
            title: "DIRECTOR'S CUT",
            categories: "films",
            gridClass: "item-normal",
            imgUrl: "/assets/img/projects/camera.jpg",
            meta: "Films / Video Production"
        },
        {
            title: "RARE SKIN",
            categories: "photography branding",
            gridClass: "item-normal",
            imgUrl: "/assets/img/projects/perfume.jpg",
            meta: "Photography / Branding"
        },
        {
            title: "SOCIAL EXCELLENCE AWARDS",
            categories: "websites campaigns",
            gridClass: "item-double-wide",
            imgUrl: "/assets/img/projects/social-awards.jpg",
            meta: "Website / Event Design"
        },
        {
            title: "NFT VISUAL CAMPAIGN",
            categories: "ai-cgi campaigns",
            gridClass: "item-normal",
            imgUrl: "/assets/img/projects/astronaut.jpg",
            meta: "AI / CGI / Digital Art"
        },
        {
            title: "WILD COLLECTIVE",
            categories: "branding",
            gridClass: "item-normal",
            imgUrl: "/assets/img/projects/packaging.jpg",
            meta: "Branding / Graphic Design"
        },
        {
            title: "FINTECH DASHBOARD",
            categories: "ui-ux",
            gridClass: "item-normal",
            imgUrl: "/assets/img/projects/fintech.jpg",
            meta: "UI / UX Design"
        },
        {
            title: "JEWELS OF HERITAGE",
            categories: "photography",
            gridClass: "item-normal",
            imgUrl: "/assets/img/projects/model.jpg",
            meta: "Photography"
        }
    ];

    const gridTargetContainer = document.getElementById("dynamic-portfolio-grid");

    // 2. Render Cards Dynamic Handler Engine
    function renderPortfolioCards(data) {
        let cardsHTMLAccumulator = "";
        
        data.forEach(project => {
            cardsHTMLAccumulator += `
                <div class="portfolio-item ${project.gridClass}" data-category="${project.categories}">
                    <div class="project-card">
                        <img src="${project.imgUrl}" alt="${project.title}" class="img-fluid w-100 h-100 object-fit-cover">
                        <div class="project-overlay">
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-meta">${project.meta}</p>
                        </div>
                    </div>
                </div>`;
        });
        
        gridTargetContainer.innerHTML = cardsHTMLAccumulator;
    }

    // Initial Execution Cycle
    renderPortfolioCards(projectsDataset);

    // 3. Fast Filtration Core Controller Matrix
    const filterButtonsNodes = document.querySelectorAll(".filter-btn");

    filterButtonsNodes.forEach(button => {
        button.addEventListener("click", function () {
            filterButtonsNodes.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const selectedFilterValue = this.getAttribute("data-filter");
            const compiledItemNodes = document.querySelectorAll(".portfolio-item");

            compiledItemNodes.forEach(item => {
                const categoryListArray = item.getAttribute("data-category").split(" ");

                if (selectedFilterValue === "all" || categoryListArray.includes(selectedFilterValue)) {
                    item.classList.remove("hide");
                } else {
                    item.classList.add("hide");
                }
            });
        });
    });
});