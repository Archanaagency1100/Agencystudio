document.addEventListener("DOMContentLoaded", function () {
   const rawDataset = [
  { title: "ALAP NGO", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/alap.png", meta: "Website / Creative Direction" },
  { title: "7D STUDIO", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/7d-1.jpg", meta: "Logo Design / Identity" },
  { title: "10 SF PARA", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/10para_sf.jpeg", meta: "Films / Video Production" },

  { title: "ALAP NGO MUSIC", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/allahabadmusicclub.png", meta: "Website / Creative Direction" },
  { title: "AAHAR WAYS", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/aahar-ways.jpg", meta: "Branding / Identity Design" },
  { title: "DR LAL 75TH ANNIVERSARY", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/75th_drlal.jpeg", meta: "Films / Video Production" },

  { title: "BAJAJ MOTORS", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/bajajmotors.png", meta: "Website / Creative Direction" },
  { title: "AAJ TAK", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/aajtak2.jpg", meta: "Branding / Graphic Assets" },
  { title: "CENLUB", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/cenclub.jpeg", meta: "Films / Video Production" },

  { title: "AARTI RANA DIVE", categories: "websites campaigns ui-ux", gridClass: "item-double-wide", imgUrl: "/assets/img/recentwork/web/aarti.png", meta: "Website / Event Design" },
  { title: "ACD LOGISTICS", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/acd.jpg", meta: "Logo Design / Branding" },
  { title: "DR SK LAL", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/dr_sk_lal.jpeg", meta: "Films / Video Production" },

  { title: "AEROCRATE", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/aerocrate.jpg", meta: "Corporate Identity" },
  
  { title: "GEMINY", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/geminy.png", meta: "Website / Creative Direction" },
  { title: "AHT LABS", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/aht.jpg", meta: "Identity / Minimal Design" },
  
  { title: "ILVF METAVERSE", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/ilvf.png", meta: "Website / Creative Direction" },
  { title: "AWDORG FOUNDATION", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/awd-logo.jpg", meta: "NGO Branding / Minimal Identity" },
  { title: "NAMAK", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/Namak.jpeg", meta: "Films / Video Production" },
  
  { title: "INDIC QUOTIENT", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/indicquotient.png", meta: "Website / Creative Direction" },
  { title: "APRIL 9 STUDIO", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/april-9.jpg", meta: "Creative Studio Identity" },
  
  { title: "LOVELY TAILORS", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/lovelytailors.png", meta: "Website / Creative Direction" },
  { title: "ARTISANS CREATIVE", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/artisans.jpg", meta: "Logo Structure / Identity" },
  { title: "THANK YOU MAN", categories: "films", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/films/Thank_you_man.jpeg", meta: "Films / Video Production" },
  
  { title: "MANASI SCOTT", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/manasiscott.png", meta: "Website / Creative Direction" },
  { title: "BAY 15 GOA", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/bay15.jpg", meta: "Hospitality Branding" },
  
  { title: "MASTERSOUND", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/mastersound.png", meta: "Website / Creative Direction" },
  { title: "BESTLIFE INSURE", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/bestlife.jpg", meta: "Brand Identity Design" },
  
  { title: "BHAU EKAD DHABA", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/bhaueekadbhaba.jpg", meta: "Food Venture Branding" },
  
  { title: "BLESSING READY", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/blessing-ready.jpg", meta: "Minimal Logo Identity" },
  
  { title: "THE SLAY NUTRITION", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/theslaynutrition.png", meta: "Website / Creative Direction" },
  { title: "BOSS", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/boss.jpg", meta: "Branding" },
  
  { title: "BULL STRENGTH", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/bull-strength.jpg", meta: "Branding" },
  { title: "CAT PHARMA", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/catpharma.jpg", meta: "Branding" },
  { title: "CEDAR COTTAGE", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/cedar-cottage.jpg", meta: "Branding" },
  { title: "CLEAR LIFE SCIENCE", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/CLEARLIFESCIENCE.png", meta: "Website / Creative Direction" },
  { title: "CLINIC KARE DERMA", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/clinic-kare-derma.jpg", meta: "Branding" },
  { title: "COD", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/cod.jpg", meta: "Branding" },
  { title: "TGF PRODUCTION", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/TGF.jpeg", meta: "Films / Video Production" },
  { title: "COLLEGE LAUNCH PAD", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/college-launch-pad.jpg", meta: "Branding" },
  { title: "CUSTOMISED PROMISED", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/Customised-Promised-logo.jpg", meta: "Branding" },
  { title: "DAIRY FARMS", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/dairy-farms.jpg", meta: "Branding" },
  { title: "DIADEM", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/diadem.jpg", meta: "Branding" },
  { title: "DIET 99", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/diet-99.jpg", meta: "Branding" },
  { title: "NAB CENTRE FOR WOMEN", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/nabcentreforwomen.png", meta: "Website / Creative Direction" },
  { title: "DILLI GHARANA", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/dilli-gharana.jpg", meta: "Branding" },
  { title: "DIVINE", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/divine.jpg", meta: "Branding" },
  { title: "DLF", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/dlf.jpg", meta: "Branding" },
  { title: "DOMINOR", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/dominor.jpg", meta: "Branding" },
  { title: "DPS", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/dps.jpg", meta: "Branding" },
  { title: "DR SDK", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/dr-sdk.jpg", meta: "Branding" },
  { title: "D VOGUE", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/d-vogue.jpg", meta: "Branding" },
  { title: "EARTHWATCH", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/earthwatch.jpg", meta: "Branding" },
  { title: "E FACTOR", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/e-factor.jpg", meta: "Branding" },
  { title: "ENVISION", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/envision.jpg", meta: "Branding" },
  { title: "IFR GLOBAL", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/IFR.jpeg", meta: "Films / Video Production" },
  { title: "EVENT CHAKRA", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/event-chakra.jpg", meta: "Branding" },
  { title: "EXHIBELL", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/exhibell.jpg", meta: "Branding" },
  { title: "GRACE ENTERTAINMENT", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/grace-entertainment.jpg", meta: "Branding" },
  { title: "GUNJAN UTREJA", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/gunjan-utreja.jpg", meta: "Branding" },
  { title: "SHIBANI KASHYAP", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/shibanikashyap.png", meta: "Website / Creative Direction" },
  { title: "HABIBI", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/habibi.jpg", meta: "Branding" },
  { title: "HELP NGO", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/help-ngo.jpg", meta: "Branding" },
  { title: "IMLY", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/imly.jpg", meta: "Branding" },
  { title: "INDUS STONE", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/indus-stone.jpg", meta: "Branding" },
  { title: "JASBEER JASSI", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/jasbeer-jassi.jpg", meta: "Branding" },
  { title: "JVC", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/JVC.jpg", meta: "Branding" },
  { title: "KADAM", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/kadam.jpg", meta: "Branding" },
  { title: "KINETO", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/kineto.jpg", meta: "Branding" },
  { title: "MADE IN HEAVEN", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/madeinheaven.jpg", meta: "Branding" },
  { title: "MANGAT FARMS", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/mangat-farms.jpg", meta: "Branding" },
  { title: "PEARL MANAGEMENT", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/pearl-management.jpg", meta: "Branding" },
  { title: "PRERNA KOHLI", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/prerna-kohli.jpg", meta: "Branding" },
  { title: "PRIYAL BHARDWAJ", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/priyal-bhardwaj.jpg", meta: "Branding" },
  { title: "PROJECT SHAKTI", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/project-shakti.jpg", meta: "Branding" },
  { title: "PURPLE TREE", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/purple-tree.jpg", meta: "Branding" },
  { title: "RABBAZ", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/rabbaz.jpg", meta: "Branding" },
  { title: "RAMA WATCH", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/rama-watch.jpg", meta: "Branding" },
  { title: "RAM PERFUMES", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/ram-perfumes.jpg", meta: "Branding" },
  { title: "RISHNIK", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/rishnik.jpg", meta: "Branding" },
  { title: "SANGINI SAHELI", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/sangini-saheli.jpg", meta: "Branding" },
  { title: "SLURPY", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/slurpy.jpg", meta: "Branding" },
  { title: "SPAG", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/Spag.jpg", meta: "Branding" },
  { title: "SRIJAN", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/srijan.jpg", meta: "Branding" },
  { title: "STRANDS", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/strands.jpg", meta: "Branding" },
  { title: "SUTRA EVENTS", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/sutra-events.jpg", meta: "Branding" },
  { title: "SWARR", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/swarr.jpg", meta: "Branding" },
  { title: "TANISI", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/tanisi.jpg", meta: "Branding" },
  { title: "TESORO", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/tesoro.jpg", meta: "Branding" },
  { title: "THE FURNITURE COMPANY", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/the-furniture-company.jpg", meta: "Branding" },
  { title: "HAWS", categories: "films", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/films/HAWS.jpeg", meta: "Films / Video Production" },
  { title: "THE LO CAL KITCHEN", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/the-lo-cal-kitchen-logo.jpg", meta: "Branding" },
  { title: "THE REGALIA", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/the-regalia.jpg", meta: "Branding" },
  { title: "TIME ZONE", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/time-zone.jpg", meta: "Branding" },
  { title: "TOTEM GOA", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/totem-goa.jpg", meta: "Branding" },
  { title: "TRAVTIPS", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/travtips.jpg", meta: "Branding" },
  { title: "TREECO", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/treeco.jpg", meta: "Branding" },
  { title: "UNHEARD ARTIST", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/unheard-artist.jpg", meta: "Branding" },
  { title: "VANBROS", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/vanbros-1.jpg", meta: "Branding" },
  { title: "VIRSAA", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/virsaa.jpg", meta: "Branding" },
  { title: "VITALLYSE", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/vitallyse.jpg", meta: "Branding" },
  { title: "VOICE FOR THE DEPRIVED", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/voice-for-the-deprived.jpg", meta: "Branding" },
  { title: "VV KALMA", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/vvkalma.jpg", meta: "Branding" },
  { title: "WEDDINGS CHANT", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/weddings-chant.jpg", meta: "Branding" },
  { title: "WEDDOGRAPHY", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/weddography.jpg", meta: "Branding" },
  { title: "WHOLISTIC", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/wholistic.jpg", meta: "Branding" },
  { title: "WORDS N SONGS", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/words-n-songs.jpg", meta: "Branding" },
  { title: "YYOOGGAA", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/yyooggaa.jpg", meta: "Branding" },
  { title: "ZC EVENTS", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/zcevents.jpg", meta: "Branding" },
  { title: "ZESTY", categories: "branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/zesty.jpg", meta: "Branding" }
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