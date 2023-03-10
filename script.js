gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    console.log('DOM loaded');

    window.addEventListener('load', () => {

        const land = document.querySelector('.land').contentDocument.getElementById('land');
        const title = document.querySelector('.title');
        const spaceship_wrapper = document.querySelector('.spaceship-wrapper');
        const spaceship = document.querySelector('.spaceship');
        const meteor_wrapper = document.querySelector('.meteor-wrapper');
        const meteor = document.querySelector('.meteor');

        gsap.set(land, {
            y: '100%'
        });


        gsap.set(meteor_wrapper, {
            width: meteor.offsetWidth / +meteor.dataset.frames,
            height: meteor.offsetHeight,
            top: '0%',
            right: `0%`
        });

        gsap.to(meteor_wrapper, {
            scrollTrigger: {
                trigger: 'main',
                start: '40% center',
                end: '70% center',
                scrub: true,
                //markers: true
            },
            opacity: .4,
            top: `100%`,
            right: `100%`,
        });


        gsap.set(spaceship_wrapper, {
            width: spaceship.offsetWidth / 6,
            height: spaceship.offsetHeight
        });

        /*gsap.to(meteor_wrapper, {
            scrollTrigger: {
                trigger: 'main',
                start: '40% center',
                end: '70% center',
                scrub: true,
                //markers: true
            },
            opacity: 0,
            top: '90%',
            right: '100%',
        });*/

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

        // ANIMATION

        const animate = (frames) => {
            const tl = new TimelineMax({ repeat: -1, paused: true, });

            tl.to(frames, +frames.dataset.speed, {
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

        //animate(meteor);
        animate(spaceship);
        animate(meteor);

    }, false);

});

/*class Animation {

    constructor(frames) {
      this.frames = frames;
      this.tl = new TimelineMax({ repeat: -1, paused: true, });
    }

    init() {
        this.tl.to(this.frames, +this.frames.dataset.speed, {
            x: + this.frames.offsetWidth / (+this.frames.dataset.frames / (+this.frames.dataset.frames - 1)),
            ease: SteppedEase.config(+this.frames.dataset.frames - 1)
        });
    };

    playFrames = () => {
        this.tl.play();
    };

    reverseFrames = () => {
        this.tl.reverse();
    };

    pauseFrames = () => {
        this.tl.pause();
    };

  }

const ship_frames = new Animation(spaceship);
const meteor_frames = new Animation(meteor);

ship_frames.init();
meteor_frames.init();

ScrollTrigger.observe({
    target: window,
    type: 'scroll',
    onUp: () => {
        requestAnimationFrame(ship_frames.reverseFrames);
        requestAnimationFrame(meteor_frames.reverseFrames);
    },
    onDown: () => {
        requestAnimationFrame(ship_frames.playFrames);
        requestAnimationFrame(meteor_frames.playFrames);
    },
    onStop: () => {
        requestAnimationFrame(ship_frames.pauseFrames);
        requestAnimationFrame(meteor_frames.pauseFrames);
    },
});*/