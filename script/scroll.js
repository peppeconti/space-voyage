import { animate } from './frames.js';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

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

        // EASE 

        const ease1 = Back.easeOut.config(3);
        const ease2 = Back.easeInOut.config(1.7);

        // GRAPHIC ELEMENTS

        const main = document.querySelector('.scrollytelling');
        const departure = document.querySelector('.land').contentDocument.getElementById('land-1');
        const arrive = document.querySelector('.land').contentDocument.getElementById('land-2');
        const spaceship = document.querySelector('.spaceship');
        const spaceship_frames = document.querySelector('.spaceship-frames');
        const meteors_wrapper = document.querySelector('.meteors-wrapper');
        const meteor_wrapper = Array.from(document.querySelectorAll('.meteor-wrapper'));
        const meteors = Array.from(document.querySelectorAll('.meteor'));
        const title = document.querySelector('.title');
        const to_top = document.querySelector('.scroll_to_top');

        const setResponsiveValues = async () => {

            await gsap.set(spaceship, {
                height: spaceship_frames.offsetHeight,
                width: spaceship_frames.offsetWidth / spaceship_frames.dataset.frames,
            });

            await gsap.set(meteor_wrapper, {
                width: (_, el) => el.querySelector('.meteor').offsetWidth / el.querySelector('.meteor').dataset.frames,
                height: (_, el) => el.querySelector('.meteor').offsetHeight,
                x: meteors_wrapper.offsetWidth * 1.5
            });

            let wind_width = window.innerWidth;
            let wind_height = window.innerHeight;
            let angle_deg = Math.atan(wind_height / wind_width) * (-180 / Math.PI);

            await gsap.set(meteors_wrapper, {
                rotate: angle_deg + 5
            });
        };

        setResponsiveValues();

        gsap.set([departure, spaceship], {
            opacity: 0
        });

        gsap.set(arrive, {
            y: '100%'
        });

        // 2 UNITS NESTED
        const nested_tl = gsap.timeline()
            .to(spaceship, { rotate: 5, x: 10, ease: ease1, duration: .5 })
            .to(spaceship, { rotate: 0, x: 0, ease: ease1, duration: .5 })
            .to(spaceship, { bottom: () => `calc(50% - ${spaceship.offsetHeight / 2 + 50}px)`, ease: ease2, duration: 1 }, '-=1')
            .to(spaceship, { rotate: -5, x: -25, ease: ease1, duration: 1 })
            .to(spaceship, { bottom: () => `calc(50% - ${spaceship.offsetHeight / 2}px)`, ease: ease2, duration: .5 }, '-=1')
            .to(spaceship, { rotate: 0, x: 0, ease: ease1, duration: .5 });

        // MAIN TIMELINE
        const tl = gsap.timeline({
            scrollTrigger: {
                id: 'main',
                //scroller: scroller,
                trigger: main,
                start: 'top top',
                end: 'bottom bottom',
                invalidateOnRefresh: true,
                scrub: 4,
                //markers: true
            },
        });

        tl
            // .5 UNIT
            .to(title, {
                top: '-15%', color: 'transparent', duration: .5, onStart: () => title.classList.remove('blink'),
                onReverseComplete: () => title.classList.add('blink')
            })
            .to(departure, { opacity: 1, duration: .5 }, '-=.5')
            .to(spaceship, { opacity: 1, duration: .5 }, '-=.5')
            // 1 UNIT
            .to(spaceship, { bottom: () => `calc(50% - ${spaceship.offsetHeight / 2}px)`, duration: 1 })
            .to(departure, { y: '100%', duration: 1 }, '-=1')
            // 6 UNITS
            .to('[data-speed]', { opacity: .5, duration: 5, x: (_, el) => (-1 * parseFloat(el.dataset.speed)) * (meteors_wrapper.offsetWidth * 5), onStart: () => console.log('start'), onComplete: () => console.log('complete') }, '+=1')
            .add(nested_tl, '-=3.9')
            // 2 UNIT
            .to(arrive, { y: '0%', duration: 1 }, '+=1')
            // .5 UNIT
            .to(spaceship, { bottom: '0%', ease: ease2, duration: .5 })

        window.addEventListener('resize', () => {
            setResponsiveValues();
            ScrollTrigger.refresh();
        });

        to_top.addEventListener('click', function () {

            gsap.to(window, { duration: 35, scrollTo: { y: main.offsetHeight } });

        });

        /*to_bottom.addEventListener('click', function () {

            gsap.to(window, { duration: 0.2, scrollTo: { y: 0 } });

        })*/

        animate(spaceship_frames);
        meteors.forEach(meteor => animate(meteor));

    }, false);

});