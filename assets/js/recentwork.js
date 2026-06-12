document.addEventListener("DOMContentLoaded", function () {

    const showcaseData = {
        'lane-graphics': [
            { src: "/assets/img/recentwork/manasiscott.png", alt: "Graphics 1" },
            { src: "/assets/img/recentwork/scalingup.png",   alt: "Graphics 2" },
            { src: "/assets/img/recentwork/manasiscott.png", alt: "Graphics 3" }
        ],
        'lane-websites': [
            { src: "/assets/img/recentwork/scalingup.png",   alt: "Web 1" },
            { src: "/assets/img/recentwork/manasiscott.png", alt: "Web 2" },
            { src: "/assets/img/recentwork/scalingup.png",   alt: "Web 3" }
        ],
        'lane-films': [
            { src: "/assets/img/recentwork/manasiscott.png", alt: "Film 1" },
            { src: "/assets/img/recentwork/scalingup.png",   alt: "Film 2" },
            { src: "/assets/img/recentwork/manasiscott.png", alt: "Film 3" }
        ],
        'lane-videos': [
            { src: "/assets/img/recentwork/scalingup.png",   alt: "Video 1" },
            { src: "/assets/img/recentwork/manasiscott.png", alt: "Video 2" },
            { src: "/assets/img/recentwork/scalingup.png",   alt: "Video 3" }
        ],
        'lane-branding': [
            { src: "/assets/img/recentwork/manasiscott.png", alt: "Branding 1" },
            { src: "/assets/img/recentwork/scalingup.png",   alt: "Branding 2" },
            { src: "/assets/img/recentwork/manasiscott.png", alt: "Branding 3" }
        ]
    };

    function injectShowcaseLane(laneId, items) {
        const track = document.getElementById(laneId);
        if (!track) return;

        // Duplicate array seamlessly to create the infinite scroll loop wrap
        const infiniteList = [...items, ...items];

        infiniteList.forEach(item => {
            const card = document.createElement('div');
            card.className = 'web-showcase__card';

            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt;
            img.loading = 'lazy';

            card.appendChild(img);
            track.appendChild(card);
        });
    }

    // Initialize all 5 lanes dynamically
    Object.keys(showcaseData).forEach(laneId => {
        injectShowcaseLane(laneId, showcaseData[laneId]);
    });
});