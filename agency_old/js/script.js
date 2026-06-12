"use strict"; 

$(document).ready(function() {
    // Initialize standard component bindings
    worksSlider();
    Marq();
    menu();
    
    let gifcontainer = document.getElementById('gif-container');

    // --- GIF Element Hover Handlers ---
    if (gifcontainer) {
        $('#crt').mouseover(function () {
            let img = document.createElement('img');
            img.src ="image/creativity.gif";
            gifcontainer.innerHTML="";
            gifcontainer.appendChild(img);
        }).mouseout(function () {
            gifcontainer.innerHTML = "";      
        });

        $('#knw').mouseover(function () {
            let img = document.createElement('img');
            img.src ="image/knowledge.gif";
            gifcontainer.innerHTML="";
            gifcontainer.appendChild(img);
        }).mouseout(function () {
            gifcontainer.innerHTML = "";     
        });

        $('#rsc').mouseover(function () {
            let img = document.createElement('img');
            img.src ="image/research.gif";
            gifcontainer.innerHTML="";
            gifcontainer.appendChild(img);     
        }).mouseout(function () {
            gifcontainer.innerHTML = "";     
        });

        $('#pst').mouseover(function () {
            let img = document.createElement('img');
            img.src ="image/positivity.gif";
            gifcontainer.innerHTML="";
            gifcontainer.appendChild(img);   
        }).mouseout(function () {
            gifcontainer.innerHTML = "";        
        });

        $('#exc').mouseover(function () {
            let img = document.createElement('img');
            img.src ="image/execute.gif";
            gifcontainer.innerHTML="";
            gifcontainer.appendChild(img);   
        }).mouseout(function () {
            gifcontainer.innerHTML = "";         
        });
    }

    // --- Hamburger Animation ---
    if (document.querySelector('.menu-icon')) {
        document.querySelector('.menu-icon').addEventListener('click', function() {
            this.classList.toggle('cross');
        });
    }

    // --- Input File Multi-check ---
    $('input[type=file]').change(function() {
        var f = this.files;
        var el = $(this).parent();
        if (f.length > 1) {
            el.text('Sorry, multiple files are not allowed');
            return;
        }
        el.html(f[0].name + '<br>' +
                '<span class="sml">' +
                'type: ' + f[0].type + ', ' +
                Math.round(f[0].size / 1024) + ' KB</span>');
    }).on('focus', function() {
        $(this).parent().addClass('focus');
    }).on('blur', function() {
        $(this).parent().removeClass('focus');
    });
});


/* ==========================================================================
   LOCOMOTIVE SMOOTH SCROLL + GSAP SCROLLTRIGGER ENGINE PROXY BRIDGE
   ========================================================================== */

gsap.registerPlugin(ScrollTrigger);

// Setup links directly to the root body to support your existing layout structure
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("body"), 
  smooth: true,
  tablet: { smooth: true },
  smartphone: { smooth: true }
});

locoScroll.on("scroll", ScrollTrigger.update);

// Point scroller proxy directly to the body container to map standard triggers
ScrollTrigger.scrollerProxy("body", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  scrollLeft(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.x;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.querySelector("body").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// Safely schedule refresh tracking updates after the preloader sets layout heights
window.addEventListener("load", function() {
    setTimeout(() => {
        locoScroll.update();
        ScrollTrigger.refresh();
    }, 600); 
});


/* ==========================================================================
   KINETIC MOUSE CURSOR EFFECT (LOCOMOTIVE SMOOTH SYNCED)
   ========================================================================== */

var cursor = document.querySelector('.cursor'),
    cursorScale = document.querySelectorAll('.cursor_scale'),
    mouseX = 0,
    mouseY = 0,
    currentX = 0,
    currentY = 0;

gsap.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;

        gsap.set(cursor, {
            css: {
                left: currentX,
                top: currentY
            }
        });
    }
});

window.addEventListener("mousemove", function (e){
    mouseX = e.clientX;
    mouseY = e.clientY; 
});

locoScroll.on("scroll", () => {
    ScrollTrigger.update();
});

cursorScale.forEach(link => {
    link.growHandler = () => {
        if(link.classList.contains('cursor-big')){
            cursor.classList.remove('grow', 'grow_bg');
            cursor.classList.add('grow_small');
        } else if(link.classList.contains('cursor-bg')){
            cursor.classList.remove('grow', 'grow_small');
            cursor.classList.add('grow_bg');
        } else {
            cursor.classList.remove('grow_bg', 'grow_small');
            cursor.classList.add('grow');
        }
    };

    link.leaveHandler = () => {
        cursor.classList.remove('grow', 'grow_small', 'grow_bg');
    };

    link.addEventListener('mouseleave', link.leaveHandler);
    link.addEventListener('mousemove', link.growHandler);
});


/* ==========================================================================
   RECENT WORK CAROUSEL SLIDER (RESTORED & PROXIED)
   ========================================================================== */

function worksSlider() {
    var recentWorkCarousel = $('.a-recent-works');
    recentWorkCarousel.each(function() {
        let $this = $(this),
            wrapper = $this.children('.recent-works-wrapper'),
            wrapperWidth = wrapper.outerWidth(),
            wrapTransVal = wrapperWidth - window.outerWidth + window.outerWidth / 2,
            parentSec = $this.parents('.wrapper'),
            navType = $this.data('navigate');

        if (navType === 'scroll') {
            $this.addClass('navby-scroll');

            var scrollAn = gsap.to(wrapper, {
                x: "-" + wrapTransVal,
                ease: "none"
            });

            ScrollTrigger.create({
                animation: scrollAn,
                trigger: $this,
                start: "top top",
                end: "bottom top",
                scrub: 4,
                scroller: "body", // Connected directly to the virtual scroller proxy
                pin: true,
                snap: false,
                pinSpacing: 'false',
                anticipatePin: false
            });

            gsap.fromTo($this, { x: '100%' }, {
                x: '0%',
                scrollTrigger: {
                    trigger: parentSec,
                    scroller: "body", // Connected directly to the virtual scroller proxy
                    pin: false,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 4
                }
            });

            gsap.fromTo($this, { x: '0%' }, {
                x: '-30%',
                scrollTrigger: {
                    trigger: parentSec,
                    scroller: "body", // Connected directly to the virtual scroller proxy
                    pin: false,
                    scrub: 4,
                    start: 'bottom bottom',
                    end: 'bottom top'
                }
            });
        }
    });
}


/* ==========================================================================
   GLOBAL TYPOGRAPHY ANIMATION TIMELINES
   ========================================================================== */

let t1 = gsap.timeline();

if (document.querySelector('.section_heading')) {
    t1.from('.section_heading span', {
        y: 100,
        ease: 'power4.out',
        delay: .5,
        scrollTrigger: {       
            trigger: '.section_heading',
            scroller: "body", 
            start: "top 90%",
            end: "bottom top",
            scrub: true
        }
    });
}

if (document.querySelector('.line-re')) {
    t1.from('.line-re span', {
        y: 100,
        ease: 'power4.out',
        delay: .5,
        stagger: { amount: 0.3 },
        scrollTrigger: {
            trigger: ".line-re",
            scroller: "body", 
            start: "top 90%",
            end: "50% 50%",
            scrub: true
        }  
    });
}

// --- Navigation Reveal Timelines ---
var nav = gsap.timeline();
if (document.querySelector('.logo img')) {
    nav.from('.logo img', { y: -30, opacity: 0, duration: .5, delay: 0.1 });
}
if (document.querySelector('.menu-icon')) {
    nav.from('.menu-icon', { y: -30, opacity: 0, duration: .5, delay: 0.2 });
}

if (document.querySelector('.c-header_title')) {
    nav.from('.c-header_title span', 1, {
        y: 200,
        ease: "power4.out",
        delay: .5,
        skewY: 7,
        stagger: 0.3
    }, "-=0.2");
}

function menu() {
    const ham = document.querySelector(".menu-icon");
    const menuEl = document.querySelector('.hamenu');
    
    if (!menuEl || !ham) return;
    const links = menuEl.querySelectorAll('li');
    
    var togglemenu = gsap.timeline({ paused: true });
    
    togglemenu.to(menuEl, {
        duration: 1,
        opacity: 1,
        height: '100vh', 
        ease: 'expo.inOut',
        display: 'flex'
    });
    togglemenu.from(links, {
        duration: 1,
        opacity: 0,
        y: 20,
        stagger: 0.2,
        ease: 'expo.inOut'
    }, "-=0.5");
    
    togglemenu.reverse();
    
    ham.addEventListener('click', () => {
        togglemenu.reversed(!togglemenu.reversed());
    });
}


/* ==========================================================================
   INNER PAGE SECTIONS HANDLERS (GUARDED)
   ========================================================================== */

// --- About Page Timeline Guards ---
if (document.querySelector('.abInner')) {
    let abHero = gsap.timeline();
    abHero.to('.abInner', {
        width: '0%',
        opacity: 0,
        ease: 'expo.inOut',
        x: 0    
    }, "-=0.5");
}

if (document.querySelector('.ab-line')) {
    gsap.from('.ab-line span', 1.5, {
        opacity: 0,
        y: 70,
        delay: 2,
        ease: 'expo.inOut',
        stagger: 0.3
    });
}

if (document.querySelector('.ab')) {
    let ab2 = gsap.timeline();
    ab2.from('.ab span', {
        opacity: 0,
        y: 100,
        delay: .5,
        stagger: { amount: 0.3 },
        scrollTrigger: {
            trigger: ".ab",
            scroller: "body", 
            start: "100% 90%",
            end: "top top",
            scrub: true
        }
    });
}

// --- Contact Page Timeline Guards ---
if (document.querySelector('.cimg')) {
    let cHero = gsap.timeline();
    cHero.from('.cimg', { opacity: 0, height: '0%', duration: .7, delay: 1.5 });
    cHero.from('.item', { opacity: 0, duration: .8, delay: .6 });
    cHero.from('.join a', { opacity: 0, duration: .8, delay: .7, stagger: { amount: 0.3 } });
}


/* ==========================================================================
   LOOPING MARQUEE MECHANICS (LOCOMOTIVE SMOOTH SYNCED)
   ========================================================================== */

function Marq() {
    if (!document.querySelector(".marquees__part")) return;

    let tween = gsap.to(".marquees__part", { xPercent: -100, repeat: -1, duration: 14, ease: "linear" }).totalProgress(0.6);
    gsap.set(".marquees__inner", { xPercent: -50 });

    let currentScroll = 0;
    let isScrollingDown = true;

    locoScroll.on("scroll", (instance) => {
        let scrollY = instance.scroll.y;

        if (scrollY > currentScroll) {
            isScrollingDown = true;
        } else {
            isScrollingDown = false;
        }

        gsap.to(tween, {
            timeScale: isScrollingDown ? 1 : -4
        });

        currentScroll = scrollY;
    });
}


/* ==========================================================================
   COMPLEX IMAGE REVEAL LAYERS
   ========================================================================== */

let revealContainers = document.querySelectorAll(".reveal");
revealContainers.forEach((contain) => {
    let image = contain.querySelector("img");
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: contain,
            scroller: "body", 
            toggleActions: "restart none none reset"
        }
    });

    tl.set(contain, { autoAlpha: 1 });
    tl.from(contain, 1.5, { xPercent: -100, ease: Power2.out });
    tl.from(image, 1.5, { xPercent: 100, scale: 1.3, delay: -1.5, ease: Power2.out });
});


/* ==========================================================================
   COOKIES POLICY LAYER POPUP
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    var cookiesPopup = document.getElementById('cookiesPopup');
    var acceptCookiesButton = document.getElementById('acceptCookies');
    var declineCookiesButton = document.getElementById('declineCookies');

    if (cookiesPopup) {
        if (!localStorage.getItem('cookiesAccepted') && !localStorage.getItem('cookiesDeclined')) {
            cookiesPopup.style.display = 'flex';
        } else {
            cookiesPopup.style.display = 'none';
        }

        if (acceptCookiesButton) {
            acceptCookiesButton.addEventListener('click', function() {
                localStorage.setItem('cookiesAccepted', true);
                cookiesPopup.style.display = 'none';
            });
        }

        if (declineCookiesButton) {
            declineCookiesButton.addEventListener('click', function() {
                localStorage.setItem('cookiesAccepted', false);
                cookiesPopup.style.display = 'none';
            });
        }
    }
}); 


/* ==========================================================================
   SESSION-SENSITIVE PRELOADER ANIMATION
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector('.ag-page-loader');
    const count = document.querySelector('.apl-count');    
    if (!loader || !count) return;

    const duration = loader.getAttribute('data-duration') || 5;

    if (!sessionStorage.getItem('preloaderShown')) {
        gsap.to(loader, { display: 'flex', ease: 'linear', duration: .2 });
        gsap.to(count, {
            innerHTML: 100,
            duration: duration,
            ease: 'linear',
            snap: { innerHTML: 1 },
            onUpdate: () => {
                count.textContent = `${Math.round(count.innerHTML)}%`;
            },
            onComplete: () => {
                gsap.to(loader, {
                    opacity: 0,
                    duration: 1,
                    ease: 'power1.out',
                    onComplete: () => {
                        loader.style.display = 'none';
                        sessionStorage.setItem('preloaderShown', 'true');
                        
                        locoScroll.update();
                        ScrollTrigger.refresh();
                    }
                });
            }
        });
    } else {
        loader.style.display = 'none';
    }
});