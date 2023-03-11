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

        const tl_departure = gsap.timeline({
            scrollTrigger: {
                trigger: '.scrollytelling',
                start: 'top top',
                end: '30% top',
                scrub: true,
            },
        });

        tl_departure.to(departure, { opacity: 1, duration: 1 })
        .to(spaceship, {opacity: 1, duration: 1}, "-=1")
            .to(departure, { y: '100%', duration: 4 })
           
            
        gsap.to(spaceship, {
            scrollTrigger: {
                trigger: '.scrollytelling',
                start: '10% top',
                end: 'center top',
                invalidateOnRefresh: true,
                scrub: true,
                //markers: true
            },
            bottom: () => `calc(50% - ${spaceship.offsetHeight/2}px)`,
        });

        gsap.to(arrive, {
            scrollTrigger: {
                trigger: '.scrollytelling',
                start: '75% center',
                end: '98% bottom',
                scrub: true,
                //markers: true
            },
            y: '0%',
        });

        /*gsap.to(spaceship_wrapper, {
            scrollTrigger: {
                trigger: 'main',
                start: '97% bottom',
                //end: 'bottom bottom',
                scrub: true,
                //markers: true
            },
            y: '-60%',
        });*/

        gsap.to(title, {
            scrollTrigger: {
                trigger: '.scrollytelling',
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

        window.addEventListener('resize', () => {
            setResponsive();
            ScrollTrigger.refresh();
        });

        console.log(ScrollTrigger.getAll());

    }, false);

});