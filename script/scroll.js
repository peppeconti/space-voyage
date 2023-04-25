gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);
import { settingMobile } from "./mobileSettings.js";
import { animate } from "./frames.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");

  window.addEventListener(
    "load",
    () => {
      // GRAPHIC ELEMENTS

      const scroller = document.querySelector(".scroll-wrapper");
      const loader = document.querySelector(".loader");
      const content = document.querySelector(".content");
      const main = document.querySelector(".scrollbar");
      const departure = document.getElementById("departure");
      const arrive = document.getElementById("arrive");
      const title = document.querySelector(".title");
      const spaceship = document.querySelector(".spaceship");
      const spaceship_frames = document.querySelector(".spaceship-frames");

      //departure.addEventListener("click", () => alert(scroller.scrollTop));

      // EASE

      const ease1 = Back.easeOut.config(3);
      const ease2 = Back.easeInOut.config(1.7);

      const setResponsiveValues = async () => {
        await gsap.set(spaceship, {
          height: spaceship_frames.offsetHeight,
          width: spaceship_frames.offsetWidth / spaceship_frames.dataset.frames,
        });
      };

      setResponsiveValues();

      gsap.set([departure, spaceship], {
        opacity: 0,
      });

      gsap.set(arrive, {
        y: "100%",
      });

      const meteors_tl = gsap
        .timeline()
        .to(spaceship, { rotate: 5, x: 10, ease: ease1, duration: 0.5 })
        .to(spaceship, { rotate: 0, x: 0, ease: ease1, duration: 0.5 })
        .to(
          spaceship,
          {
            bottom: () => `calc(50% - ${spaceship.offsetHeight / 2 + 50}px)`,
            ease: ease2,
            duration: 1,
          },
          "-=1"
        )
        .to(spaceship, { rotate: -5, x: -25, ease: ease1, duration: 1 })
        .to(
          spaceship,
          {
            bottom: () => `calc(50% - ${spaceship.offsetHeight / 2}px)`,
            ease: ease2,
            duration: 0.5,
          },
          "-=1"
        )
        .to(spaceship, { rotate: 0, x: 0, ease: ease1, duration: 0.5 });

      // MAIN TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          scroller: scroller,
          id: "main",
          trigger: main,
          start: "top top",
          end: "bottom bottom",
          invalidateOnRefresh: true,
          scrub: 4,
        },
      });

      tl
        // .5 UNIT
        .to(title, {
          top: "-15%",
          color: "transparent",
          duration: 0.5,
          onStart: () => title.classList.remove("blink"),
          onReverseComplete: () => title.classList.add("blink"),
        })
        .to(departure, { opacity: 1, duration: 0.5 }, "-=.5")
        .to(spaceship, { opacity: 1, duration: 0.5 }, "-=.5")
        // 1 UNIT
        .to(spaceship, {
          bottom: () => `calc(50% - ${spaceship.offsetHeight / 2}px)`,
          duration: 1,
        })
        .to(departure, { y: "100%", duration: 1 }, "-=1")
        .add(meteors_tl)
        // 2 UNIT
        .to(arrive, { y: "0%", duration: 1 }, "+=1")
        // .5 UNIT
        .to(spaceship, { bottom: "0%", ease: ease2, duration: 0.5 });

      window.addEventListener("resize", () => {
        setResponsiveValues();
        ScrollTrigger.refresh();
      });

      animate(spaceship_frames, scroller);
      settingMobile(scroller, content);
      // FINISHED
      console.log("loaded");
      // HIDE PRELOADER
      setTimeout(() => {
        gsap.set(loader, {
          display: "none",
        });
      }, 3000);
    },
    false
  );
});
