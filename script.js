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

        const land_1 = document.querySelector('.land').contentDocument.getElementById('land-1');
        const land_2 = document.querySelector('.land').contentDocument.getElementById('land-2');
        const title = document.querySelector('.title');

        gsap.set(land_1, {
            opacity: 0
        });

        gsap.set(land_2, {
            y: '100%'
        });

        gsap.to(land_1, {
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: '10% top',
                scrub: true,
                //markers: true
            },
            opacity: 1,
        });

        gsap.to(land_2, {
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
                /*onEnter() {
                    title.classList.remove('blink');
                },
                onLeaveBack() {
                    title.classList.add('blink');
                },*/
                markers: true
            },
            top: '-50%',
            //opacity: 0
        });

    }, false);

});