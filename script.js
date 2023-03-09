gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    console.log('DOM loaded');

    window.addEventListener('load', () => {

        let meteor_tl, ship_tl;

        const land = document.querySelector('.land').contentDocument.getElementById('land');
        const title = document.querySelector('.title');
        const spaceship_wrapper = document.querySelector('.spaceship-wrapper');
        const spaceship = document.querySelector('.spaceship');
        const meteor_wrapper = document.querySelector('.meteor-wrapper');
        const meteor = document.querySelector('.meteor');

        console.log(meteor.dataset)

        gsap.set(land, {
            y: '100%'
        });

        gsap.set(meteor_wrapper, {
            width: meteor.offsetWidth / 4,
            height: meteor.offsetHeight
        });

        gsap.set(spaceship_wrapper, {
            width: spaceship.offsetWidth / 6,
            height: spaceship.offsetHeight
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

        gsap.to(title, {
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: '15% center',
                scrub: true,
                onEnter() {
                    title.classList.remove('blink');
                },
                onLeaveBack() {
                    title.classList.add('blink');
                }
                //markers: true
            },
            top: '0%',
            opacity: 0
        });

        gsap.to(spaceship_wrapper, {
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: '20% center',
                scrub: true,
                //markers: true
            },
            opacity: 1,
        });

        gsap.to(spaceship_wrapper, {
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: '50% center',
                scrub: true,
                //markers: true
            },
            top: '50%',
            transform: 'translate(-50%, -50%)'
        });

        gsap.to(meteor_wrapper, {
            scrollTrigger: {
                trigger: 'main',
                start: '40% center',
                end: '70% center',
                scrub: true,
                markers: true
            },
            opacity: 0,
            top: '90%',
            right: '100%',
        });

        // ANIMATION

        meteor_tl = new TimelineMax({ repeat: -1, paused: true, });

        meteor_tl.to(meteor, +meteor.dataset.speed, {
            x: + meteor.offsetWidth / (+meteor.dataset.frames / (+meteor.dataset.frames - 1)),
            ease: SteppedEase.config(+meteor.dataset.frames - 1)
        });

        const playMeteor = () => {
            meteor_tl.play();
        };

        const reverseMeteor = () => {
            meteor_tl.reverse();
        };

        const pauseMeteor = () => {
            meteor_tl.pause();
        };

        // SPACESHIP

        ship_tl = new TimelineMax({ repeat: -1, paused: true, });

        ship_tl.to(spaceship, +spaceship.dataset.speed, {
            x: + spaceship.offsetWidth / (+spaceship.dataset.frames / (+spaceship.dataset.frames - 1)),
            ease: SteppedEase.config(+spaceship.dataset.frames - 1)
        });

        const playShip = () => {
            ship_tl.play();
        };

        const reverseShip = () => {
            ship_tl.reverse();
        };

        const pauseShip = () => {
            ship_tl.pause();
        };

        ScrollTrigger.observe({
            target: window,
            type: 'scroll',
            onUp: () => {
                requestAnimationFrame(reverseShip);
                requestAnimationFrame(reverseMeteor);
            },
            onDown: () => {
                requestAnimationFrame(playShip);
                requestAnimationFrame(playMeteor);
            },
            onStop: () => {
                requestAnimationFrame(pauseShip);
                requestAnimationFrame(pauseMeteor);
            },
        });


    }, false);

});