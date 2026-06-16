document.addEventListener("DOMContentLoaded", function () {
    const rawDataset = [
    { title: "ALAP NGO", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/alap.png", meta: "Website / Creative Direction" },
    { title: "7D STUDIO", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/7d-1.jpg", meta: "Logo Design / Identity" },
    { title: "10 SF PARA", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/10para_sf.jpeg", meta: "Films / Video Production" },
    { title: "AAHAR WAYS", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/aahar-ways.jpg", meta: "Branding / Identity Design" },
    { title: "ALAP NGO MUSIC", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/allahabadmusicclub.png", meta: "Website / Creative Direction" },
    { title: "AAJ TAK", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/aajtak2.jpg", meta: "Branding / Graphic Assets" },
    { title: "DR LAL 75th ANNIVERSARY", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/75th_drlal.jpeg", meta: "Films / Video Production" },
    { title: "ACD LOGISTICS", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/acd.jpg", meta: "Logo Design / Branding" },
    { title: "CENLUB", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/cenclub.jpeg", meta: "Films / Video Production" },
    { title: "AEROCRATE", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/aerocrate.jpg", meta: "Corporate Identity" },
    { title: "BAJAJMOTORS", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/bajajmotors.png", meta: "Website / Creative Direction" },
    { title: "AHT LABS", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/aht.jpg", meta: "Identity / Minimal Design" },
    { title: "AARTI RANA DIVE", categories: "websites campaigns ui-ux", gridClass: "item-double-wide", imgUrl: "/assets/img/recentwork/web/aarti.png", meta: "Website / Event Design" },
    { title: "AWDORG FOUNDATION", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/awd-logo.jpg", meta: "NGO Branding / Minimal Identity" },
    { title: "DR SK LAL", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/dr_sk_lal.jpeg", meta: "Films / Video Production" },
    { title: "APRIL 9 STUDIO", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/april-9.jpg", meta: "Creative Studio Identity" },
    { title: "CLEAR LIFE SCIENCE", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/CLEARLIFESCIENCE.png", meta: "Website / Creative Direction" },
    { title: "ARTISANS CREATIVE", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/artisans.jpg", meta: "Logo Structure / Identity" },
    { title: "HAWS", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/HAWS.jpeg", meta: "Films / Video Production" },
    { title: "BAY 15 GOA", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/bay15.jpg", meta: "Hospitality Branding" },
    { title: "GEMINY", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/geminy.png", meta: "Website / Creative Direction" },
    { title: "BESTLIFE INSURE", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/bestlife.jpg", meta: "Brand Identity Design" },
    { title: "IFR GLOBAL", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/IFR.jpeg", meta: "Films / Video Production" },
    { title: "BHAU EKAD DHABA", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/bhaueekadbhaba.jpg", meta: "Food Venture Branding" },
    { title: "ILVF METAVERSE", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/ilvf.png", meta: "Website / Creative Direction" },
    { title: "BLESSING READY", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/blessing-ready.jpg", meta: "Minimal Logo Identity" },
    { title: "NAMAK", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/Namak.jpeg", meta: "Films / Video Production" },
    { title: "INDICQUOTIENT", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/indicquotient.png", meta: "Website / Creative Direction" },
    { title: "TGF PRODUCTION", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/TGF.jpeg", meta: "Films / Video Production" },
    { title: "LOVELY TAILORS", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/lovelytailors.png", meta: "Website / Creative Direction" },
    { title: "THANK YOU MAN", categories: "films", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/films/Thank_you_man.jpeg", meta: "Films / Video Production" },
    { title: "MANASISISCOTT", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/manasiscott.png", meta: "Website / Creative Direction" },
    { title: "MASTERSOUND", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/mastersound.png", meta: "Website / Creative Direction" },
    { title: "NAB CENTRE FOR WOMEN", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/nabcentreforwomen.png", meta: "Website / Creative Direction" },
    { title: "SHIBANI KASHYAP", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/shibanikashyap.png", meta: "Website / Creative Direction" },
    { title: "THE SLAY NUTRITION", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/theslaynutrition.png", meta: "Website / Creative Direction" },
];

    function alternateDataset(array) {
        let webItems = array.filter(item => item.categories.includes("websites"));
        let otherItems = array.filter(item => !item.categories.includes("websites"));
        let mixedResult = [];

        while (webItems.length > 0 || otherItems.length > 0) {
            if (webItems.length > 0) mixedResult.push(webItems.shift());
            if (otherItems.length > 0) mixedResult.push(otherItems.shift());
            if (otherItems.length > 0) mixedResult.push(otherItems.shift());
        }
        return mixedResult;
    }

    const projectsDataset = alternateDataset(rawDataset);
    const gridTargetContainer = document.getElementById("dynamic-portfolio-grid");

    function renderPortfolioCards(data) {
        let cardsHTMLAccumulator = "";
        data.forEach(project => {
            const safeTitle = project.title.replace(/'/g, "\\'");
            cardsHTMLAccumulator += `
                <div class="portfolio-item" data-category="${project.categories}" onclick="openPortfolioModal('${project.imgUrl}', '${safeTitle}')">
                    <div class="project-card">
                        <img src="${project.imgUrl}" alt="${project.title}">
                        <div class="project-overlay">
                            <div class="default-overlay-content">
                                <h3 class="project-title">${project.title}</h3>
                                <p class="project-meta">${project.meta}</p>
                            </div>
                            <div class="hover-overlay-content">
                                <h3 class="project-title hover-cta">CLICK TO SEE</h3>
                            </div>
                        </div>
                    </div>
                </div>`;
        });

        if (gridTargetContainer) {
            gridTargetContainer.innerHTML = cardsHTMLAccumulator;
        }
    }

    renderPortfolioCards(projectsDataset);

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

function openPortfolioModal(imageSrc, titleText) {
    const modal = document.getElementById("portfolioAssetModal");
    const imgElement = document.getElementById("modalPreviewImg");
    const titleElement = document.getElementById("modalAssetTitle");
    
    if (modal && imgElement && titleElement) {
        imgElement.src = imageSrc;
        titleElement.innerText = titleText;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

function closePortfolioModal() {
    const modal = document.getElementById("portfolioAssetModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
    const wrapper = document.querySelector('.portfolio-modal-content');
    if (wrapper) { wrapper.scrollTop = 0; }
}