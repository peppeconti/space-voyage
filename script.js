gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    console.log('DOM loaded');

    window.addEventListener('load', () => {

        let meteor_tl;

        const land = document.querySelector('.land').contentDocument.getElementById('land');
        const title = document.querySelector('.title');
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

        gsap.to(spaceship, {
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: '20% center',
                scrub: true,
                //markers: true
            },
            opacity: 1,
        });

        gsap.to(spaceship, {
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
        
        ScrollTrigger.observe({
            target: window,
            type: 'scroll',
            onUp: () => requestAnimationFrame(reverseMeteor),
            onDown: () => requestAnimationFrame(playMeteor),
            onStop: () => requestAnimationFrame(pauseMeteor),
          });

    }, false);

});