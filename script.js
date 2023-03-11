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

        const departure = document.querySelector('.land').contentDocument.getElementById('land-1');
        const arrive = document.querySelector('.land').contentDocument.getElementById('land-2');
        const spaceship = document.querySelector('.spaceship');
        const spaceship_frames = document.querySelector('.spaceship-frames');
        //const fires = Array.from(spaceship.contentDocument.querySelectorAll('[data-name=fire]'));
        const title = document.querySelector('.title');

        /*gsap.set(fires, {
            display: 'none'
        });*/

        const setResponsive = () => {
            gsap.set(spaceship, {
                height: spaceship_frames.offsetHeight,
                width: spaceship_frames.offsetWidth / spaceship_frames.dataset.frames,
            });
        };
        setResponsive();

        gsap.set([departure, spaceship], {
            opacity: 0
        });

        gsap.set(arrive, {
            y: '100%'
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.scrollytelling',
                start: 'top top',
                end: 'bottom bottom',
                invalidateOnRefresh: true,
                scrub: true,
            },
        });

        tl
            .to(title, {
                top: '-15%', color: 'transparent', duration: 1, onStart: () => title.classList.remove('blink'),
                onReverseComplete: () => title.classList.add('blink')
            })
            .to(departure, { opacity: 1, duration: 1 }, '-=1')
            .to(spaceship, { opacity: 1, duration: 1 }, '-=1')
            .to(spaceship, { bottom: () => `calc(50% - ${spaceship.offsetHeight / 2}px)`, duration: 1 })
            .to(departure, { y: '100%', duration: 1 }, '-=1')
            .to(arrive, { y: '0%', duration: 1 }, '+=5')
            .to(spaceship, { bottom: '0%', duration: 1 })

        window.addEventListener('resize', () => {
            setResponsive();
            ScrollTrigger.refresh();
        });

        console.log(ScrollTrigger.getAll());

    }, false);

});