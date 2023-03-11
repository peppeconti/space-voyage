// FRAMES ANIMATION

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

    Observer.create({
        target: window,
        type: 'scroll',
        onDown: () => {
            if (ScrollTrigger.getById('main').progress > 0.12) { requestAnimationFrame(playFrames) };
        },
        onUp: () => {
            if (ScrollTrigger.getById('main').progress > 0.12) { requestAnimationFrame(reverseFrames) };
        },
        onStop: () => requestAnimationFrame(pauseFrames),
      });
};

export { animate }