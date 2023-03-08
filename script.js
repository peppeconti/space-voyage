gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    console.log('DOM loaded');

    window.addEventListener('load', () => {

        const land = document.querySelector('.land').contentDocument.getElementById('land');

        const spaceship = document.querySelector('.spaceship').contentDocument.getElementById('spaceship');

        const sky = document.querySelector('.sky').contentDocument.getElementById('sky');

        gsap.set([land], {
            y: '100%'
        });

        gsap.to('.spaceship', {
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: '75% center',
                scrub: true,
                markers: true
            },
            top: '30%',
            transform: 'translate(-50%, -50%)'
        });

        gsap.to('.spaceship', {
            scrollTrigger: {
                trigger: 'main',
                start: '80% center',
                scrub: 4,
                markers: true
            },
            y: 280
        });

        gsap.to(land, {
            scrollTrigger: {
                trigger: 'main',
                start: 'center center',
                end: '75% center',
                scrub: true,
                markers: true
            },
            y: '0%',
        });

        gsap.to('.title', {
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: '25% center',
                scrub: true,
                markers: true
            },
            top: '0%',
            opacity: 0
        });

        /*gsap.to(sky, {
            scrollTrigger: {
                trigger: 'main',
                start: '75% center',
                markers: true,
                scrub: true
            },
            y: 500,
        });*/

    }, false);

});