gsap.registerPlugin(ScrollTrigger, Observer);

document.addEventListener('DOMContentLoaded', () => {

    console.log('DOM loaded');

    window.addEventListener('load', () => {

        // GRAPHIC ELEMENTS

        const scroller = document.querySelector('.scroll-wrapper');
        const main = document.querySelector('.scrollbar');
        const departure = document.querySelector('.land').contentDocument.getElementById('land-1');
        const arrive = document.querySelector('.land').contentDocument.getElementById('land-2');

        /*gsap.set(departure, {
            opacity: 1
        });*/

        gsap.set(arrive, {
            y: '100%'
        });          

        // MAIN TIMELINE
        const tl = gsap.timeline({
            scrollTrigger: {
                scroller: scroller,
                id: 'main',
                trigger: main,
                start: 'top top',
                end: 'bottom bottom',
                invalidateOnRefresh: true,
                scrub: 4,
            },
        });

        tl
            // .5 UNIT
            .to(departure, { y: '100%', duration: 1 })
            .to(arrive, { y: '0%', duration: 1 })

    }, false);

});