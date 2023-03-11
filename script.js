gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    console.log('DOM loaded');

    window.addEventListener('load', () => {

        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        } else {
            window.onbeforeunload = function () {
                window.scrollTo(0, 0);
            }
        }

        const land = document.querySelector('.land-wrapper');
        const land_1 = document.querySelector('.land').contentDocument.getElementById('land-1');
        const land_2 = document.querySelector('.land').contentDocument.getElementById('land-2');
        const spaceship_wrapper = document.querySelector('.spaceship-wrapper');
        const spaceship = document.querySelector('.spaceship');
        const title = document.querySelector('.title');

        gsap.set(land, {
            height: document.querySelector('.land').offsetHeight
        });

        gsap.set(spaceship_wrapper, {
            height: spaceship.offsetHeight,
            width: spaceship.offsetWidth / spaceship.dataset.frames
        });

        /*gsap.set(land_1, {
            opacity: 0
        });

        gsap.set(land_2, {
            y: '100%'
        });

        const tl_land_1 = gsap.timeline({
            scrollTrigger: {
                trigger: '.main',
                start: 'top top',
                end: '20% top',
                scrub: true,
            },
        });

        tl_land_1.to(land_1, { opacity: 1, duration: 1 })
        .to(land_1, { y: '100%', duration: 1 })

        gsap.to(land_2, {
            scrollTrigger: {
                trigger: 'main',
                start: '75% center',
                end: '98% bottom',
                scrub: true,
                //markers: true
            },
            y: '0%',
        });*/

        gsap.to(title, {
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: '10% top',
                scrub: true,
                onEnter() {
                    title.classList.remove('blink');
                },
                onLeaveBack() {
                    title.classList.add('blink');
                }
            },
            top: '-15%',
            color: 'transparent'
        });

    }, false);

});