    "use strict"; 

    $(document).ready(function() {
        // TitleChange();
        worksSlider();
        Marq();
        menu();
        let gifcontainer = document.getElementById('gif-container')

        // first gif
        // $('#crt-gif').hide(); 

        $('#crt').mouseover(function () {
            let img = document.createElement('img');
            img.src ="image/creativity.gif";
            gifcontainer.innerHTML="";
            gifcontainer.appendChild(img)
            // $('#crt-gif').show();      
        });
        $('#crt').mouseout(function () {
            gifcontainer.innerHTML = ""      
        });

        $('#knw').mouseover(function () {
            let img = document.createElement('img');
            img.src ="image/knowledge.gif";
            gifcontainer.innerHTML="";
            gifcontainer.appendChild(img)
        });
        $('#knw').mouseout(function () {
            gifcontainer.innerHTML = ""     
        });

        // third gif

        $('#rsc').mouseover(function () {
            let img = document.createElement('img');
            img.src ="image/research.gif";
            gifcontainer.innerHTML="";
            gifcontainer.appendChild(img)     
        });
        $('#rsc').mouseout(function () {
            gifcontainer.innerHTML = ""     
        });

        // fourth gif
       $('#pst').mouseover(function () {
            let img = document.createElement('img');
            img.src ="image/positivity.gif";
            gifcontainer.innerHTML="";
            gifcontainer.appendChild(img)   
        });
        $('#pst').mouseout(function () {
            gifcontainer.innerHTML = ""        
        });

        // fifth gif
        $('#exc').mouseover(function () {
            let img = document.createElement('img');
            img.src ="image/execute.gif";
            gifcontainer.innerHTML="";
            gifcontainer.appendChild(img)   
        });
        $('#exc').mouseout(function () {
            gifcontainer.innerHTML = ""         
        });

        // Hamburger animation

        document.querySelector('.menu-icon').addEventListener('click', function() {
            this.classList.toggle('cross');
        });
});



/* =============================== Locomotive Scroll Start  =============================== */

// // locomotive Scroll
gsap.registerPlugin(ScrollTrigger);
// const locoScroll = new LocomotiveScroll({
//   el: document.querySelector("body"),
//   smooth: true,
//   tablet: { smooth: true },// for tablet smooth
//   smartphone: { smooth: true }  // for mobile
// });
// locoScroll.on("scroll", ScrollTrigger.update);

// ScrollTrigger.scrollerProxy("body", {
//   scrollTop(value) {
//     return arguments.length
//       ? locoScroll.scrollTo(value, 0, 0)
//       : locoScroll.scroll.instance.scroll.y;
//   },
//   getBoundingClientRect() {
//     return {
//       top: 0,
//       left: 0,
//       width: window.innerWidth,
//       height: window.innerHeight
//     };
//   }
// });

/* ===============================  Mouse effect  =============================== */

var cursor = document.querySelector('.cursor'),
    cursorScale = document.querySelectorAll('.cursor_scale'),
    mouseX = 0,
    mouseY = 0

gsap.to({}, 0.016, {
    repeat: -1,
   onRepeat : function () {
        gsap.set(cursor, {
            css:{
                left: mouseX,
                top:mouseY
            }
        })
    }
});

window.addEventListener("mousemove", function (e){
    mouseX = e.clientX;
    mouseY = e.clientY
});
cursorScale.forEach(link =>{
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('grow');
        cursor.classList.remove('grow_small');
        cursor.classList.remove('grow_bg');
    });
    link.addEventListener('mousemove', () => {
        cursor.classList.add('grow');
        if(link.classList.contains('cursor-big')){
            cursor.classList.remove('grow', 'grow_bg');
             cursor.classList.add('grow_small');
        }
        if(link.classList.contains('cursor-bg')){
            cursor.classList.remove('grow', 'grow_small');
             cursor.classList.add('grow_bg');
        }
        if(link.classList.contains('cursor-small')){
            cursor.classList.remove('grow_bg', 'grow_small');
             cursor.classList.add('grow');
        }
    });
});
/* =================  Mouse effect End  ================= */

/* ================= Meta Title change  ==================== */
// function TitleChange() {
//     var prevTitle = document.title;
//     document.addEventListener("visibilitychange", function() {
//         if (document.visibilityState === 'visible') {
//             document.title = "aaye ho to mil lo! \ud83d\ude0e";
//             setTimeout(function() {
//                 document.title = prevTitle;
//             }, 1000);
//         } else {
//             document.title = "aa bhi jaa \ud83d\ude2d";
//         }
//     });
// }


//******** Recent Work slider *********//
function worksSlider() {
    var recentWorkCarousel = $('.a-recent-works');
    recentWorkCarousel.each(function() {
        let $this = $(this),
            wrapper = $this.children('.recent-works-wrapper'),
            wrapperWidth = wrapper.outerWidth(),
            wrapTransVal = wrapperWidth - window.outerWidth + window.outerWidth / 2,
            bgText = $this.find('.recent-works-bg-text'),
            parentSec = $this.parents('.wrapper'),
            navType = $this.data('navigate');

        if (navType === 'scroll') {

            $this.addClass('navby-scroll')

            var scrollAn = gsap.to(wrapper, {
                x: "-" + wrapTransVal,

            });

            // var cumba = gsap.to(bgText, {
            //     x: "0%",
            //     scrollTrigger: {
            //         trigger: $this,
            //         start: "top top",
            //         end: "bottom top",
            //         scrub: 4,
            //         scroller: "body",
            //         pin: true,
            //         snap: false,
            //         pinSpacing: 'margin',
            //     }
            // })

            ScrollTrigger.create({
                animation: scrollAn,
                trigger: $this,
                start: "top top",
                end: "bottom top",
                scrub: 4,
                scroller: "body",
                pin: true,
                snap: false,
                pinSpacing: 'false',
                anticipatePin: false,
                // pinType: 'fixed'

            });

            gsap.fromTo($this, {
                x: '100%'
            }, {
                x: '0%',
                scrollTrigger: {
                    trigger: parentSec,
                    pin: false,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 4,

                }
            })

            gsap.fromTo($this, {
                x: '0%'
            }, {
                x: '-30%',
                scrollTrigger: {
                    trigger: parentSec,
                    pin: false,
                    scrub: 4,
                    start: 'bottom bottom',
                    end: 'bottom top',
                }
            })

        // } else if (navType === 'arrows') {

        //     $this.addClass('navby-arrows');

        //     let slides = $this.find('.ar-work'),
        //         totSlides = slides.length,
        //         slideWidth = $('.ar-work').outerWidth(),
        //         nextButton = $('.arw-next'),
        //         prevButton = $('.arw-prev');

        //     slides.each(function(i) {

        //         i++
        //         let $this = $(this);

        //         $this.attr('data-index', i);
        //         $this.addClass('slide_' + i)
        //     })

        //     $('.ar-work:first-child').addClass('active')

        //     var arrowClicks = 0;

        //     nextButton.on('click', function() {

        //         $('.ar-work').removeClass('active');

        //         gsap.to('.ar-work', {
        //             x: "-100%"
        //         })
        //     })
        //     Draggable.create(wrapper, {
        //         type: "x",
        //         bounds: $this,
        //         autoScroll: true,
        //         inertia: true,
        //         edgeResistance: 0.4,
        //         dragResistance: 0.4,
        //         throwProps: true,
        //         onDrag: function(message, num) {
        //             console.log("message: " + message + ", num: " + num);
        //         }
        //     });
         }
    })
}

//******** text animation *********//
let t1 = gsap.timeline()
t1.from('.section_heading span',  {
    y:100,
    ease: 'power4.out',
    delay:.5,
    scrollTrigger:{       
        trigger: '.section_heading',
        scroller: "body",
        start: "top 90%",
        end: "bottom top",
        scrub: true,
    }
});
t1.from('.line-re span', {
    y:100,
    ease: 'power4.out',
    delay:.5,
    stagger: {
        amount:0.3
    },
    scrollTrigger: {
        trigger: ".line-re",
        scroller: "body", // Locomotive Scroll container
        start: "top 90%",
        end: "50% 50%",
        scrub: true,
    }  
});

// navigation animation

var nav = gsap.timeline()
    nav.from('.logo img', {
        y: -30,
        opacity:0,
        duration:.5,
        delay:0.1
    })
    nav.from('.menu-icon', {
        y: -30,
        opacity:0,
        duration:.5,
        delay:0.2,
    })

    nav.from('.c-header_title span', 1 , {
        y: 200,
        ease: "power4.out",
        delay: .5,
        skewY: 7,
        stagger: 0.3,
    },"-=0.2");

    function menu(){
        const ham = document.querySelector(".menu-icon");
        const menu = document.querySelector('.hamenu');
        const links = menu.querySelectorAll('li');
        
        var togglemenu = gsap.timeline({ paused: true });
        
        togglemenu.to(menu, {
            duration: 1,
            opacity: 1,
            height: '100vh', // change this to 100vh for full-height menu
            ease: 'expo.inOut',
            display:'flex',
        })
        togglemenu.from(links, {
            duration: 1,
            opacity: 0,
            y: 20,
            stagger: 0.2,
            ease: 'expo.inOut',
        }, "-=0.5");
        
        togglemenu.reverse();
        
        ham.addEventListener('click', () => {
            togglemenu.reversed(!togglemenu.reversed());
        });
    }


    // about page animation

    let abHero = gsap.timeline()
    abHero.to('.abInner',{
        width:'0%',
        opacity:0,
        ease: 'expo.inOut',
        x:0,
    }, "-=0.5")

    gsap.from('.ab-line span', 1.5,{
        opacity:0,
        y:70,
        delay:2,
        ease: 'expo.inOut',
        stagger:0.3
    })

    let ab2 = gsap.timeline()
    ab2.from('.ab span', {
        opacity:0,
        y:100,
        delay:.5,
        stagger: {
            amount:0.3
        },
        scrollTrigger: {
            trigger: ".ab",
            scroller: "body", // Locomotive Scroll container
            start: "100% 90%",
            end: "top top",
            scrub: true,
        }
    })

    // contact animation
    let cHero = gsap.timeline()
    
    cHero.from('.cimg',{
        opacity:0,
        height:'0%',
        duration:.7,
        delay: 1.5,
    })
    cHero.from('.item',{
        opacity:0,
        duration:.8,
        delay: .6,
    })
    cHero.from('.join a',{
        opacity:0,
        duration:.8,
        delay: .7,
        stagger: {
            amount:0.3
        },
    })


    // Marquee
    function Marq() {
        let currentScroll = 0;
        let isScrollingDown = true;

        let tween = gsap.to(".marquees__part", { xPercent: -100, repeat: -1, duration: 14, ease: "linear" }).totalProgress(0.6);

        gsap.set(".marquees__inner", { xPercent: -50 });

        window.addEventListener("scroll", function() {

            if (window.pageYOffset > currentScroll) {
                isScrollingDown = true;
            } else {
                isScrollingDown = false;
            }

            gsap.to(tween, {
                timeScale: isScrollingDown ? 1 : -4
            });

            currentScroll = window.pageYOffset
        });
    }


    //******** text reveal animation *********//
    // image reveal
    gsap.registerPlugin(ScrollTrigger);
    let revealContainers = document.querySelectorAll(".reveal");
    revealContainers.forEach((contain) => {
    let image = contain.querySelector("img");
    let tl = gsap.timeline({
        scrollTrigger: {
        trigger: contain,
        toggleActions: "restart none none reset"
        }
    });

    tl.set(contain, { autoAlpha: 1 });
    tl.from(contain, 1.5, {
        xPercent: -100,
        ease: Power2.out
    });
    tl.from(image, 1.5, {
        xPercent: 100,
        scale: 1.3,
        delay: -1.5,
        ease: Power2.out
    });
    });

// Cookies Policy Popup
document.addEventListener('DOMContentLoaded', function() {
    var cookiesPopup = document.getElementById('cookiesPopup');
    var acceptCookiesButton = document.getElementById('acceptCookies');
    var declineCookiesButton = document.getElementById('declineCookies');

    // Check if cookies are already accepted or declined
    if (!localStorage.getItem('cookiesAccepted') && !localStorage.getItem('cookiesDeclined')) {
        cookiesPopup.style.display = 'flex';
    }
    else{
        cookiesPopup.style.display = 'none';
    }

    // Accept cookies button click event
    acceptCookiesButton.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', true);
        cookiesPopup.style.display = 'none';
    });

    // Decline cookies button click event
    declineCookiesButton.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', false);
        cookiesPopup.style.display = 'none';
    });
}); 


// Preloader Animation  
document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector('.ag-page-loader');
    const count = document.querySelector('.apl-count');    
    const duration = loader.getAttribute('data-duration') || 5;

    // Check if the preloader has already been shown in this session
    if (!sessionStorage.getItem('preloaderShown')) {
        gsap.to(loader,{
            display: 'flex',
            ease: 'linear',
            duration: .2,
        });
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
                        // Set a flag in sessionStorage to indicate the preloader has been shown
                        sessionStorage.setItem('preloaderShown', 'true');
                    }
                });
            }
        });
    } else {
        // If the preloader has already been shown in this session, hide it immediately
        loader.style.display = 'none';
    }
});

// 
$(document).ready(function() {
    $('input[type=file]').change(function() {
            //console.log(this.files);
            var f = this.files;
            var el = $(this).parent();
            if (f.length > 1) {
                    console.log(this.files, 1);
                    el.text('Sorry, multiple files are not allowed');
                    return;
            }
            // el.removeClass('focus');
            el.html(f[0].name + '<br>' +
                    '<span class="sml">' +
                    'type: ' + f[0].type + ', ' +
                    Math.round(f[0].size / 1024) + ' KB</span>');
    });

    $('input[type=file]').on('focus', function() {
            $(this).parent().addClass('focus');
    });

    $('input[type=file]').on('blur', function() {
            $(this).parent().removeClass('focus');
    });

});
  