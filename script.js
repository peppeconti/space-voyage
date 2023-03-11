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
        const departure = document.querySelector('.land').contentDocument.getElementById('land-1');
        const arrive = document.querySelector('.land').contentDocument.getElementById('land-2');
        const spaceship_wrapper = document.querySelector('.spaceship-wrapper');
        const spaceship = document.querySelector('.spaceship');
        const fires = Array.from(spaceship.contentDocument.querySelectorAll('[data-name=fire]'));
        const title = document.querySelector('.title');

        gsap.set(land, {
            height: document.querySelector('.land').offsetHeight
        });

        gsap.set(fires, {
            display: 'none'
        });

        gsap.set(spaceship_wrapper, {
            height: spaceship.offsetHeight,
            width: spaceship.offsetWidth / spaceship.dataset.frames,
            top: '-60%',
            left: '50%',
            x: '-50%'
        });

        gsap.set(land, {
            opacity: 0
        });

        gsap.set(arrive, {
            y: '100%'
        });

        const tl_departure = gsap.timeline({
            scrollTrigger: {
                trigger: '.main',
                start: '1% top',
                end: '20% top',
                scrub: true,
            },
        });

        tl_departure.to(land, { opacity: 1, duration: 1 })
            .to(departure, { y: '100%', duration: 1 })

        gsap.to(arrive, {
            scrollTrigger: {
                trigger: 'main',
                start: '75% center',
                end: '98% bottom',
                scrub: true,
                //markers: true
            },
            y: '0%',
        });

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