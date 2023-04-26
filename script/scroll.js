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
      //const loader = document.querySelector(".loader");
      const content = document.querySelector(".content");
      const main = document.querySelector(".scrollbar");
      const departure = document.getElementById("departure");
      const arrive = document.getElementById("arrive");
      const title = document.querySelector(".title");
      // spaceship
      const spaceship = document.querySelector(".spaceship");
      const spaceship_frames = document.querySelector(".spaceship-frames");
      // meteors
      const meteors_wrapper = document.querySelector(".meteors-wrapper");
      const meteor_wrapper = Array.from(
        document.querySelectorAll(".meteor-wrapper")
      );
      const meteors = Array.from(document.querySelectorAll(".meteor"));
      const asteroid = document.querySelector(".asteroid");

      // EASE

      const ease1 = Back.easeOut.config(3);
      const ease2 = Back.easeInOut.config(1.7);

      const setResponsiveValues = async () => {
        await gsap.set(spaceship, {
          height: spaceship_frames.offsetHeight,
          width: spaceship_frames.offsetWidth / spaceship_frames.dataset.frames,
        });
        await gsap.set(meteor_wrapper, {
          width: (_, el) =>
            el.querySelector(".meteor").offsetWidth /
            el.querySelector(".meteor").dataset.frames,
          height: (_, el) => el.querySelector(".meteor").offsetHeight,
          //x: "300%",
        });

        let wind_width = window.innerWidth;
        let wind_height = window.innerHeight;
        let angle_deg = Math.atan(wind_height / wind_width) * (-180 / Math.PI);

        await gsap.set(meteors_wrapper, {
          rotate: angle_deg,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
        });
      };

      setResponsiveValues();

      gsap.set(meteor_wrapper, {
        x: "300%",
      });

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

      const asteroid_tl = gsap
        .timeline()
        .to(asteroid, { rotate: 360, top: "100%", bottom: "0%", duration: 2 })
        .to(
          spaceship,
          { left: "65%", rotate: 10, ease: ease1, duration: 1 },
          "-=1.85"
        )
        .to(spaceship, { left: "50%", ease: ease1, duration: 2 }, "-=.5")
        .to(spaceship, { rotate: 0, ease: ease1, duration: 1 }, "-=2")
        .set(asteroid, { top: "-8vw", bottom: "100%", rotate: 0 })
        .to(asteroid, { rotate: 360, top: "100%", bottom: "0%", duration: 2 })
        .to(
          spaceship,
          { left: "35%", rotate: -10, ease: ease1, duration: 1 },
          "-=1.95"
        )
        .to(spaceship, { left: "50%", ease: ease1, duration: 2 }, "-=.5")
        .to(spaceship, { rotate: 0, ease: ease1, duration: 1 }, "-=2");

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
        .to(
          "[data-speed]",
          {
            opacity: 0.5,
            duration: 5,
            x: (_, el) =>
              -1 *
              parseFloat(el.dataset.speed) *
              (meteors_wrapper.offsetWidth * 5),
            onStart: () => console.log("start"),
            onComplete: () => console.log("complete"),
          },
          "+=3"
        )
        // OVERLAPS
        .add(meteors_tl, "-=4.6")
        .add(asteroid_tl, '-=2')
        // 2 UNIT
        .to(arrive, { y: "0%", duration: 1 }, "+=1")
        // .5 UNIT
        .to(spaceship, { bottom: "0%", ease: ease2, duration: 0.5 });

      window.addEventListener("resize", () => {
        setResponsiveValues();
        ScrollTrigger.refresh();
      });

      animate(spaceship_frames, scroller);
      meteors.forEach((meteor) => animate(meteor, scroller));
      settingMobile(scroller, content);
      // FINISHED
      console.log("loaded");
      // HIDE PRELOADER
      /*setTimeout(() => {
        gsap.set(loader, {
          display: "none",
        });
      }, 3000);*/
    },
    false
  );
});
