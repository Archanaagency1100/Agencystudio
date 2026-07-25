// Agency services single page js-----------------
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById(
        "brandManagementPillarsSlider"
    );

    const previousButton = document.getElementById(
        "brandManagementPillarsPrevious"
    );

    const nextButton = document.getElementById(
        "brandManagementPillarsNext"
    );

    const dotsWrapper = document.getElementById(
        "brandManagementPillarsDots"
    );

    if (!slider || !dotsWrapper) {
        return;
    }

    const slides = Array.from(
        slider.querySelectorAll(
            ".brand-management-pillars__slide"
        )
    );

    if (!slides.length) {
        return;
    }

    let activeIndex = 0;
    let autoplayTimer = null;
    let interactionTimer = null;
    let autoplayPaused = false;

    function getSlideStep() {
        const firstSlide = slides[0];

        if (!firstSlide) {
            return 0;
        }

        const sliderStyles = window.getComputedStyle(slider);

        const gap =
            parseFloat(
                sliderStyles.columnGap ||
                sliderStyles.gap
            ) || 0;

        return (
            firstSlide.getBoundingClientRect().width +
            gap
        );
    }

    function createDots() {
        dotsWrapper.innerHTML = "";

        slides.forEach(function (_, index) {
            const dot = document.createElement("button");

            dot.type = "button";

            dot.className =
                "brand-management-pillars__slider-dot";

            dot.setAttribute(
                "aria-label",
                `Go to pillar ${index + 1}`
            );

            dot.addEventListener("click", function () {
                goToSlide(index);
                pauseAutoplayTemporarily();
            });

            dotsWrapper.appendChild(dot);
        });
    }

    function updateDots() {
        const dots = dotsWrapper.querySelectorAll(
            ".brand-management-pillars__slider-dot"
        );

        dots.forEach(function (dot, index) {
            dot.classList.toggle(
                "is-active",
                index === activeIndex
            );
        });
    }

    function goToSlide(index) {
        activeIndex =
            (index + slides.length) % slides.length;

        const selectedSlide = slides[activeIndex];

        slider.scrollTo({
            left: selectedSlide.offsetLeft,
            behavior: "smooth"
        });

        updateDots();
    }

    function updateIndexFromScroll() {
        const slideStep = getSlideStep();

        if (!slideStep) {
            return;
        }

        activeIndex = Math.max(
            0,
            Math.min(
                slides.length - 1,
                Math.round(
                    slider.scrollLeft / slideStep
                )
            )
        );

        updateDots();
    }

    function startAutoplay() {
        window.clearInterval(autoplayTimer);

        autoplayTimer = window.setInterval(function () {
            /*
             * The slider is only displayed below 992px.
             */
            if (
                autoplayPaused ||
                window.innerWidth > 991
            ) {
                return;
            }

            goToSlide(activeIndex + 1);
        }, 4200);
    }

    function pauseAutoplayTemporarily() {
        autoplayPaused = true;

        window.clearTimeout(interactionTimer);

        interactionTimer = window.setTimeout(function () {
            autoplayPaused = false;
        }, 1800);
    }

    if (previousButton) {
        previousButton.addEventListener(
            "click",
            function () {
                goToSlide(activeIndex - 1);
                pauseAutoplayTemporarily();
            }
        );
    }

    if (nextButton) {
        nextButton.addEventListener(
            "click",
            function () {
                goToSlide(activeIndex + 1);
                pauseAutoplayTemporarily();
            }
        );
    }

    slider.addEventListener(
        "scroll",
        updateIndexFromScroll,
        {
            passive: true
        }
    );

    slider.addEventListener(
        "pointerdown",
        pauseAutoplayTemporarily
    );

    slider.addEventListener(
        "touchstart",
        pauseAutoplayTemporarily,
        {
            passive: true
        }
    );

    slider.addEventListener(
        "keydown",
        function (event) {
            if (event.key === "ArrowLeft") {
                event.preventDefault();

                goToSlide(activeIndex - 1);
                pauseAutoplayTemporarily();
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();

                goToSlide(activeIndex + 1);
                pauseAutoplayTemporarily();
            }
        }
    );

    window.addEventListener(
        "resize",
        function () {
            window.clearTimeout(
                window.brandManagementPillarsResizeTimer
            );

            window.brandManagementPillarsResizeTimer =
                window.setTimeout(function () {
                    goToSlide(activeIndex);
                }, 150);
        }
    );

    createDots();
    updateDots();
    startAutoplay();
});

// whats include section js-----------------------
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById(
        "brandManagementIncludedSlider"
    );

    const previousButton = document.getElementById(
        "brandManagementIncludedPrevious"
    );

    const nextButton = document.getElementById(
        "brandManagementIncludedNext"
    );

    const dotsWrapper = document.getElementById(
        "brandManagementIncludedDots"
    );

    if (!slider || !dotsWrapper) {
        return;
    }

    const slides = Array.from(
        slider.querySelectorAll(
            ".brand-management-included__card"
        )
    );

    if (!slides.length) {
        return;
    }

    let activeIndex = 0;
    let autoplayTimer = null;
    let pauseTimer = null;
    let autoplayPaused = false;

    function createDots() {
        dotsWrapper.innerHTML = "";

        slides.forEach(function (_, index) {
            const dot = document.createElement("button");

            dot.type = "button";

            dot.className =
                "brand-management-included__dot";

            dot.setAttribute(
                "aria-label",
                `Go to included service ${index + 1}`
            );

            dot.addEventListener("click", function () {
                goToSlide(index);
                pauseAutoplay();
            });

            dotsWrapper.appendChild(dot);
        });
    }

    function updateDots() {
        const dots = dotsWrapper.querySelectorAll(
            ".brand-management-included__dot"
        );

        dots.forEach(function (dot, index) {
            dot.classList.toggle(
                "is-active",
                index === activeIndex
            );
        });
    }

    function goToSlide(index) {
        activeIndex =
            (index + slides.length) % slides.length;

        const selectedSlide = slides[activeIndex];

        slider.scrollTo({
            left: selectedSlide.offsetLeft,
            behavior: "smooth"
        });

        updateDots();
    }

    function updateIndexFromScroll() {
        let nearestIndex = 0;
        let nearestDistance = Infinity;

        slides.forEach(function (slide, index) {
            const distance = Math.abs(
                slider.scrollLeft - slide.offsetLeft
            );

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestIndex = index;
            }
        });

        activeIndex = nearestIndex;

        updateDots();
    }

    function pauseAutoplay() {
        autoplayPaused = true;

        window.clearTimeout(pauseTimer);

        pauseTimer = window.setTimeout(function () {
            autoplayPaused = false;
        }, 1700);
    }

    function startAutoplay() {
        window.clearInterval(autoplayTimer);

        autoplayTimer = window.setInterval(function () {
            /*
             * Slider autoplay runs only on mobile.
             */
            if (
                autoplayPaused ||
                window.innerWidth > 767
            ) {
                return;
            }

            goToSlide(activeIndex + 1);
        }, 3800);
    }

    if (previousButton) {
        previousButton.addEventListener(
            "click",
            function () {
                goToSlide(activeIndex - 1);
                pauseAutoplay();
            }
        );
    }

    if (nextButton) {
        nextButton.addEventListener(
            "click",
            function () {
                goToSlide(activeIndex + 1);
                pauseAutoplay();
            }
        );
    }

    slider.addEventListener(
        "scroll",
        updateIndexFromScroll,
        {
            passive: true
        }
    );

    slider.addEventListener(
        "pointerdown",
        pauseAutoplay
    );

    slider.addEventListener(
        "touchstart",
        pauseAutoplay,
        {
            passive: true
        }
    );

    slider.addEventListener(
        "keydown",
        function (event) {
            if (event.key === "ArrowLeft") {
                event.preventDefault();

                goToSlide(activeIndex - 1);
                pauseAutoplay();
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();

                goToSlide(activeIndex + 1);
                pauseAutoplay();
            }
        }
    );

    window.addEventListener(
        "resize",
        function () {
            window.clearTimeout(
                window.brandManagementIncludedResizeTimer
            );

            window.brandManagementIncludedResizeTimer =
                window.setTimeout(function () {
                    if (window.innerWidth <= 767) {
                        goToSlide(activeIndex);
                    }
                }, 150);
        }
    );

    createDots();
    updateDots();
    startAutoplay();
});