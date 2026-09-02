document.addEventListener("DOMContentLoaded", function () {
      const rawDataset = [
    // Optional fields for any project:
    // link: "https://project-website.com"
    // videoUrl: "https://vimeo.com/VIDEO_ID"
    // desktopImgUrl: "/assets/img/project-desktop.png"
    // phoneImgUrl: "/assets/img/project-phone.png"
    { title: "ALAP NGO", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/alap.webp", meta: "Website / Creative Direction" },
    { title: "7D STUDIO", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/7d-1.jpg", meta: "Logo Design / Identity" },
    { title: "10 SF PARA", categories: "films", gridClass: "item-normal", videoUrl: "https://vimeo.com/654834911/577306fb47", imgUrl: "/assets/img/film_poster/10SF PARA.webp", meta: "Films / Video Production" },
    { title: "AAHAR WAYS", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/aahar-ways.jpg", meta: "Branding / Identity Design" },
    { title: "ALAP NGO MUSIC", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/allahabadmusicclub.webp", meta: "Website / Creative Direction" },
    { title: "AAJ TAK", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/aajtak2.jpg", meta: "Branding / Graphic Assets" },
    { title: "ACD LOGISTICS", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/acd.jpg", meta: "Logo Design / Branding" },
    { title: "CENLUB", categories: "films", gridClass: "item-normal", videoUrl: "https://vimeo.com/136477665?fl=pl&fe=sh", imgUrl: "/assets/img/film_poster/cenlub.webp", meta: "Films / Video Production" },
    { title: "AEROCRATE", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/aerocrate.jpg", meta: "Corporate Identity" },
    { title: "BAJAJMOTORS", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/bajajmotors.webp", meta: "Website / Creative Direction" },
    { title: "AHT LABS", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/aht.jpg", meta: "Identity / Minimal Design" },
    { title: "AARTI RANA DIVE", categories: "websites campaigns ui-ux", gridClass: "item-double-wide", imgUrl: "/assets/img/recentwork/web/aartiranadive.webp", meta: "Website / Event Design" },
    { title: "AWDORG FOUNDATION", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/awd-logo.jpg", meta: "NGO Branding / Minimal Identity" },
    { title: "DR SK LAL", categories: "films", gridClass: "item-normal", videoUrl: "https://vimeo.com/190959638/f982241a7a?fl=pl&fe=sh", imgUrl: "/assets/img/film_poster/Dr lal centenary film.webp", meta: "Films / Video Production" },
    { title: "APRIL 9 STUDIO", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/april-9.jpg", meta: "Creative Studio Identity" },
    { title: "CLEAR LIFE SCIENCE", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/clearlifescience.webp", meta: "Website / Creative Direction" },
    { title: "ARTISANS CREATIVE", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/artisans.jpg", meta: "Logo Structure / Identity" },
    { title: "HAWS", categories: "films", gridClass: "item-normal", videoUrl: "https://vimeo.com/1040043501/a40fbc507e?fl=ls&fe=ec", imgUrl: "/assets/img/film_poster/haws.webp", meta: "Films / Video Production" },
    { title: "BAY 15 GOA", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/bay15.jpg", meta: "Hospitality Branding" },
    { title: "GEMINY", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/geminy.webp", meta: "Website / Creative Direction" },
    { title: "BESTLIFE INSURE", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/bestlife.jpg", meta: "Brand Identity Design" },
    { title: "IFR GLOBAL", categories: "films", gridClass: "item-normal", videoUrl: "https://vimeo.com/1032973329/885b9ad0a6?share=copy&fl=sv&fe=ci", imgUrl: "/assets/img/film_poster/IFR.webp", meta: "Films / Video Production" },
    { title: "BHAU EKAD DHABA", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/bhaueekadbhaba.jpg", meta: "Food Venture Branding" },
    { title: "ILVF METAVERSE", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/ilvf.webp", meta: "Website / Creative Direction" },
    { title: "BLESSING READY", categories: " branding", gridClass: "item-normal", imgUrl: "/assets/img/recentwork/logo design/blessing-ready.jpg", meta: "Minimal Logo Identity" },
    { title: "NAMAK", categories: "films", gridClass: "item-normal", videoUrl: "https://vimeo.com/517460807?fl=pl&fe=sh", imgUrl: "/assets/img/film_poster/namak.webp", meta: "Films / Video Production" },
    { title: "INDICQUOTIENT", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/indicquotient.webp", meta: "Website / Creative Direction" },
    { title: "TGF PRODUCTION", categories: "films", gridClass: "item-normal", videoUrl: "https://vimeo.com/1008843411/36fe004385?fl=pl&fe=sh", imgUrl: "/assets/img/film_poster/TGF.webp", meta: "Films / Video Production" },
    { title: "LOVELY TAILORS", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/lovelytailors.webp", meta: "Website / Creative Direction" },
    { title: "THANK YOU MAN", categories: "films", gridClass: "item-wide", videoUrl: "https://vimeo.com/875478150/484fdff530", imgUrl: "/assets/img/film_poster/Thank_you_men.webp", meta: "Films / Video Production" },
    { title: "MANASISISCOTT", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/manasiscott.webp", meta: "Website / Creative Direction" },
    { title: "MASTERSOUND", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/mastersound.webp", meta: "Website / Creative Direction" },
    { title: "DR LAL 75th ANNIVERSARY", categories: "films", gridClass: "item-normal", videoUrl: "https://vimeo.com/945663650/64a7259449?tq=75#t=683", imgUrl: "/assets/img/film_poster/Dr Lal PathLabs 75th Anniversary Film 2024.webp", meta: "Films / Video Production" },
    { title: "NAB CENTRE FOR WOMEN", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/nabcentreforwomen.webp", meta: "Website / Creative Direction" },
    { title: "SHIBANI KASHYAP", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/shibanikashyap.webp", meta: "Website / Creative Direction" },
    { title: "THE SLAY NUTRITION", categories: "websites ui-ux", gridClass: "item-wide", imgUrl: "/assets/img/recentwork/web/theslaynutrition.webp", meta: "Website / Creative Direction" },
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
    window.portfolioProjects = projectsDataset;
    const gridTargetContainer = document.getElementById("dynamic-portfolio-grid");

    function renderPortfolioCards(data) {
        let cardsHTMLAccumulator = "";
        data.forEach((project, index) => {
            const projectType = project.meta.split("/")[0].trim();
            cardsHTMLAccumulator += `
                <div class="portfolio-item" data-category="${project.categories}" onclick="openPortfolioModal(${index})" role="button" tabindex="0" aria-label="View ${project.title}">
                    <div class="project-card">
                        <img src="${project.imgUrl}" alt="${project.title}" loading="lazy">
                        <span class="project-number">${String(index + 1).padStart(2, "0")}</span>
                        <span class="project-type">${projectType}</span>
                        <span class="project-view-icon" aria-hidden="true">
                            <i class="bi bi-arrow-up-right"></i>
                        </span>
                        <div class="project-overlay">
                            <div class="default-overlay-content">
                                <h3 class="project-title">${project.title}</h3>
                                <p class="project-meta">${project.meta}</p>
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

    gridTargetContainer?.addEventListener("keydown", function (event) {
        if ((event.key === "Enter" || event.key === " ") && event.target.classList.contains("portfolio-item")) {
            event.preventDefault();
            event.target.click();
        }
    });

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

function getEmbedVideoUrl(url) {
    if (!url) return "";
    try {
        const parsedUrl = new URL(url);
        if (parsedUrl.hostname.includes("youtube.com")) {
            const videoId = parsedUrl.searchParams.get("v");
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
        }
        if (parsedUrl.hostname === "youtu.be") {
            return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
        }
        if (parsedUrl.hostname.includes("vimeo.com")) {
            const pathParts = parsedUrl.pathname.split("/").filter(Boolean);
            const videoIndex = pathParts.findIndex(part => /^\d+$/.test(part));
            const videoId = videoIndex >= 0 ? pathParts[videoIndex] : "";
            const privacyHash = videoIndex >= 0 ? pathParts[videoIndex + 1] : "";

            if (!videoId) return url;

            const embedUrl = new URL(`https://player.vimeo.com/video/${videoId}`);
            const existingHash = parsedUrl.searchParams.get("h");
            if (existingHash || privacyHash) {
                embedUrl.searchParams.set("h", existingHash || privacyHash);
            }
            embedUrl.searchParams.set("autoplay", "1");
            embedUrl.searchParams.set("title", "0");
            embedUrl.searchParams.set("byline", "0");
            embedUrl.searchParams.set("portrait", "0");
            return embedUrl.toString();
        }
    } catch (error) {
        return url;
    }
    return url;
}

function openPortfolioModal(projectIndex) {
    const project = window.portfolioProjects?.[projectIndex];
    if (!project) return;
    window.activePortfolioProject = project;

    const modal = document.getElementById("portfolioAssetModal");
    const imgElement = document.getElementById("modalPreviewImg");
    const videoElement = document.getElementById("modalPreviewVideo");
    const titleElement = document.getElementById("modalAssetTitle");
    const mediaFrame = document.getElementById("modalMediaFrame");
    const deviceControls = document.getElementById("modalDeviceControls");
    const projectLink = document.getElementById("modalProjectLink");
    const isWebsite = project.categories.includes("websites");
    
    if (modal && imgElement && videoElement && titleElement) {
        modal.classList.toggle("is-film-modal", Boolean(project.videoUrl));
        titleElement.innerText = project.title;
        mediaFrame.className = "modal-img-container";
        deviceControls.style.display = isWebsite ? "flex" : "none";

        if (project.videoUrl) {
            imgElement.style.display = "block";
            imgElement.src = project.imgUrl;
            videoElement.style.display = "block";
            videoElement.src = getEmbedVideoUrl(project.videoUrl);
            mediaFrame.classList.add("video-frame");
        } else {
            videoElement.style.display = "none";
            videoElement.src = "";
            imgElement.style.display = "block";
            imgElement.src = isWebsite ? (project.desktopImgUrl || project.imgUrl) : project.imgUrl;
            mediaFrame.classList.toggle("device-frame", isWebsite);
            if (isWebsite) setPortfolioDevice("laptop");
        }

        const isVimeoVideo = project.videoUrl && project.videoUrl.includes("vimeo.com");
        const externalProjectUrl = project.link || project.videoUrl;
        if (externalProjectUrl) {
            projectLink.href = externalProjectUrl;
            projectLink.innerHTML = isVimeoVideo
                ? 'Watch on Vimeo <i class="bi bi-vimeo"></i>'
                : 'Visit project <i class="bi bi-arrow-up-right"></i>';
            projectLink.style.display = "inline-flex";
        } else {
            projectLink.style.display = "none";
        }

        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
        mediaFrame.scrollTop = 0;
        mediaFrame.scrollLeft = 0;
        imgElement.onload = function () {
            mediaFrame.scrollTop = 0;
            mediaFrame.scrollLeft = 0;
        };
    }
}

function setPortfolioDevice(device) {
    const mediaFrame = document.getElementById("modalMediaFrame");
    const imgElement = document.getElementById("modalPreviewImg");
    const project = window.activePortfolioProject;
    if (!mediaFrame || !imgElement) return;

    mediaFrame.classList.remove("device-laptop", "device-phone");
    mediaFrame.classList.add(`device-${device}`);

    if (project) {
        imgElement.src = device === "phone"
            ? (project.phoneImgUrl || project.desktopImgUrl || project.imgUrl)
            : (project.desktopImgUrl || project.imgUrl);
    }

    mediaFrame.scrollTop = 0;
    mediaFrame.scrollLeft = 0;
    requestAnimationFrame(() => {
        mediaFrame.scrollTop = 0;
        mediaFrame.scrollLeft = 0;
    });

    document.querySelectorAll(".device-btn").forEach(button => {
        button.classList.toggle("active", button.dataset.device === device);
    });
}

function closePortfolioModal() {
    const modal = document.getElementById("portfolioAssetModal");
    if (modal) {
        modal.style.display = "none";
        modal.classList.remove("is-film-modal");
        document.body.style.overflow = "auto";
    }
    const videoElement = document.getElementById("modalPreviewVideo");
    if (videoElement) videoElement.src = "";
    window.activePortfolioProject = null;
    const wrapper = document.querySelector('.portfolio-modal-content');
    if (wrapper) { wrapper.scrollTop = 0; }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closePortfolioModal();
    }
});
