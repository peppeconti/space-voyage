import { animate } from './frames.js';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);

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
        const ease2 = Back.easeInOut.config(3);

        // GRAPHIC ELEMENTS

        const departure = document.querySelector('.land').contentDocument.getElementById('land-1');
        const arrive = document.querySelector('.land').contentDocument.getElementById('land-2');
        const spaceship = document.querySelector('.spaceship');
        const spaceship_frames = document.querySelector('.spaceship-frames');
        const meteors_wrapper = document.querySelector('.meteors-wrapper');
        const meteor_wrapper = Array.from(document.querySelectorAll('.meteor-wrapper'));
        const meteors = Array.from(document.querySelectorAll('.meteor'));
        const title = document.querySelector('.title');


        //const fires = Array.from(spaceship.contentDocument.querySelectorAll('[data-name=fire]'));
        /*gsap.set(fires, {
            display: 'none'
        });*/

        const setResponsiveValues = async () => {

            await gsap.set(spaceship, {
                height: spaceship_frames.offsetHeight,
                width: spaceship_frames.offsetWidth / spaceship_frames.dataset.frames,
            })

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
        }

        setResponsiveValues();

        /*gsap.set([departure, spaceship], {
            opacity: 0
        });*/

        gsap.set(arrive, {
            y: '100%'
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                id: 'main',
                trigger: '.scrollytelling',
                start: 'top top',
                end: 'bottom bottom',
                invalidateOnRefresh: true,
                scrub: true,
                markers: true
            },
        });

        /*gsap.to('[data-speed]', {
            scrollTrigger: {
                trigger: '.scrollytelling',
                start: '40% center',
                end: '85% center',
                scrub: true,
            },
            opacity: .5,
            x: (_, el) => (-1 * parseFloat(el.getAttribute('data-speed'))) * (meteors_wrapper.offsetWidth * 5),
        });*/

        tl
            .to(title, {
                top: '-15%', color: 'transparent', duration: 1, onStart: () => title.classList.remove('blink'),
                onReverseComplete: () => title.classList.add('blink')
            })
            .to(departure, { opacity: 1, duration: 1 }, '-=1')
            .to(spaceship, { opacity: 1, duration: 1 }, '-=1')
            .to(spaceship, { bottom: () => `calc(50% - ${spaceship.offsetHeight / 2}px)`, duration: 1 })
            .to(departure, { y: '100%', duration: 1 }, '-=1')
            .to('[data-speed]', { opacity: .5, x: (_, el) => (-1 * parseFloat(el.dataset.speed)) * (meteors_wrapper.offsetWidth * 5) })
            .to(spaceship, { rotate: 5, x: 10, ease: ease1, duration: .5 }, '+=1.5')
            .to(spaceship, { rotate: 0, x: 0, ease: ease1, duration: .5 })
            .to(spaceship, { bottom: () => `calc(50% - ${spaceship.offsetHeight / 2 + 50}px)`, ease: ease2, duration: 1 }, '-=1')
            .to(spaceship, { rotate: -5, x: -25, ease: ease1, duration: 1 })
            .to(spaceship, { bottom: () => `calc(50% - ${spaceship.offsetHeight / 2}px)`, ease: ease2, duration: .5 }, '-=1')
            .to(spaceship, { rotate: 0, x: 0, ease: ease1, duration: .5 })
            .to(arrive, { y: '0%', duration: 1 }, '+=.5')
            .to(spaceship, { bottom: '0%', ease: ease2, duration: 1 })

        window.addEventListener('resize', () => {
            setResponsiveValues();
            ScrollTrigger.refresh();
        });

        animate(spaceship_frames);
        meteors.forEach(meteor => animate(meteor));

    }, false);

});