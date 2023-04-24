gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);
import { settingMobile } from "./mobileSettings.js";

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
      const spaceship = document.querySelector(".spaceship");
      const spaceship_frames = document.querySelector(".spaceship-frames");

      //departure.addEventListener("click", () => alert(scroller.scrollTop));

      const setResponsiveValues = async () => {
        await gsap.set(spaceship, {
          height: spaceship_frames.offsetHeight,
          width: spaceship_frames.offsetWidth / spaceship_frames.dataset.frames,
        });
      };

      setResponsiveValues();

      gsap.set(departure, {
        opacity: 1,
      });

      gsap.set(arrive, {
        y: "100%",
      });

      // MAIN TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          scroller: scroller,
          id: "main",
          trigger: main,
          start: "top top",
          end: "bottom bottom",
          //invalidateOnRefresh: true,
          scrub: 4,
        },
      });

      tl
        // .5 UNIT
        .to(departure, { y: "100%", duration: 1 })
        .to(spaceship, { bottom: () => `calc(50% - ${spaceship.offsetHeight / 2}px)`, duration: 1 })
        .to(arrive, { y: "0%", duration: 1 })
        .to(spaceship, { bottom: () => `calc(100vw * (1/6.2) - 15.5vw)`, duration: 1 });

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
