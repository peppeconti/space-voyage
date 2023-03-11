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

        const land = document.querySelector('.land').contentDocument.getElementById('land');
        const title = document.querySelector('.title');
        const spaceship_wrapper = document.querySelector('.spaceship-wrapper');
        const spaceship = document.querySelector('.spaceship');
        const fires = Array.from(spaceship.contentDocument.querySelectorAll('[data-name=fire]'));
        const meteors_wrapper = document.querySelector('.meteors-wrapper');
        const meteor_wrapper = Array.from(document.querySelectorAll('.meteor-wrapper'));
        const meteors = Array.from(document.querySelectorAll('.meteor'));

        console.log(fires);

        const rotateMeteors = () => {
            let wind_width = window.innerWidth;
            let wind_height = window.innerHeight;
            let angle_deg = Math.atan(wind_height / wind_width) * (-180 / Math.PI);
            gsap.set(meteors_wrapper, {
                rotate: angle_deg + 5
            });
        }
        rotateMeteors();

        window.addEventListener('resize', rotateMeteors);

        gsap.set(land, {
            y: '100%'
        });

        gsap.set(meteor_wrapper, {
            width: meteors[0].offsetWidth / +meteors[0].dataset.frames,
            height: meteors[0].offsetHeight,
            scaleX: -1,
            overflow: 'hidden',
            x: meteors_wrapper.offsetWidth * 1.5
        });

        gsap.to('[data-speed]', {
            scrollTrigger: {
                trigger: 'main',
                start: '20% center',
                end: '75% center',
                scrub: true,
            },
            opacity: .8,
            x: (_, el) => (-1 * parseFloat(el.getAttribute('data-speed'))) * (meteors_wrapper.offsetWidth * 5),
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
                markers: true
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

        // LANDING

        gsap.to(spaceship_wrapper, {
            scrollTrigger: {
                trigger: 'main',
                start: '95% 90%',
                //end: '50% center',
                scrub: 2,
                markers: true
            },
            y: 120,
        });

        fires.forEach(e => {

            gsap.to(e, {
                scrollTrigger: {
                    trigger: 'main',
                    start: '95% 90%',
                    end: '97.5% 90%',
                    toggleActions: 'play none reverse none'
                },
                display: 'none',
            });

        })

        // ANIMATION

        const animate = (frames) => {
            const tl = new TimelineMax({ repeat: -1, paused: true, });

            tl.to(frames, +frames.dataset.animation, {
                x: + frames.offsetWidth / (+frames.dataset.frames / (+frames.dataset.frames - 1)),
                ease: SteppedEase.config(+frames.dataset.frames - 1)
            });

            const playFrames = () => {
                tl.play();
            };
            const pauseFrames = () => {
                tl.pause();
            };
            const reverseFrames = () => {
                tl.reverse();
            };

            ScrollTrigger.observe({
                target: window,
                type: 'scroll',
                onUp: () => requestAnimationFrame(reverseFrames),
                onDown: () => requestAnimationFrame(playFrames),
                onStop: () => requestAnimationFrame(pauseFrames),
            });
        };

        animate(spaceship);
        meteors.forEach(meteor => animate(meteor));

    }, false);

});