gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    console.log('DOM loaded');

    window.addEventListener('load', () => {

        const land = document.querySelector('.land').contentDocument.getElementById('land');

        //const spaceship = document.querySelector('.spaceship').contentDocument.getElementById('spaceship');


        gsap.set(land, {
            y: '100%'
        });

        gsap.to(land, {
            scrollTrigger: {
                trigger: 'main',
                start: '70% center',
                end: '90% center',
                scrub: true,
                //markers: true
            },
            y: '0%',
        });

        gsap.to('.title', {
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: '15% center',
                scrub: true,
                //markers: true
            },
            top: '0%',
            opacity: 0
        });

        gsap.to('.spaceship', {
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: '10% center',
                scrub: true,
                markers: true
            },
            opacity: 1,
        });

        gsap.to('.spaceship', {
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: '50% center',
                scrub: true,
                markers: true
            },
            top: '50%',
            transform: 'translate(-50%, -50%)'
        });

    }, false);

});


/*gsap.to('.spaceship', {
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
        });*/
