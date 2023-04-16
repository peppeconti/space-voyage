gsap.registerPlugin(ScrollTrigger, Observer);

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");

  window.addEventListener(
    "load",
    () => {
      // GRAPHIC ELEMENTS

      const scroller = document.querySelector(".scroll-wrapper");
      const content = document.querySelector(".content");
      const main = document.querySelector(".scrollbar");
      const departure = document
        .querySelector(".land")
        .contentDocument.getElementById("land-1");
      const arrive = document
        .querySelector(".land")
        .contentDocument.getElementById("land-2");

      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        // true for mobile device
        gsap.set(content, {
          position: "fixed",
        });
      } else {
        // false for not mobile device
        gsap.set(content, {
          position: "sticky",
        });
      }

      /*gsap.set(departure, {
            opacity: 1
        });*/

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
          invalidateOnRefresh: true,
          scrub: 4,
        },
      });

      tl
        // .5 UNIT
        .to(departure, { y: "100%", duration: 1 })
        .to(arrive, { y: "0%", duration: 1 });
    },
    false
  );
});
