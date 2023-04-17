gsap.registerPlugin(ScrollTrigger, Observer);

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");

  window.addEventListener(
    "load",
    () => {
      const getElementScrollbarWidth = (element) => {
        return element.offsetWidth - element.clientWidth;
      };

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

      departure.addEventListener("click", () => alert("ciao"));

      /*if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        // true for mobile device
        console.log('mobile');
      } else {
        // false for not mobile device
        gsap.set(content, {
          width: `calc(100% - ${getElementScrollbarWidth(scroller)}px)`,
        });
      }*/

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
          pin: content,
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
