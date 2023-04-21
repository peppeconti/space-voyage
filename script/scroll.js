gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

      departure.addEventListener("click", () => alert(scroller.scrollTop));

      // FUNCTIONS

      const adaptToScroller = () => {
        const getElementScrollbarWidth = (element) => {
          return element.offsetWidth - element.clientWidth;
        };

        if (window.matchMedia("(any-pointer: coarse)").matches) {
          // true for mobile device
          gsap.set(content, {
            width: "100%",
          });

          //alert('mobile')
          gsap.set(scroller, {
            overflowY: "hidden",
            overflowX: "hidden",
          });
        } else {
          // false for not mobile device
          //alert('not-mobile')
          gsap.set(content, {
            width: `calc(100% - ${getElementScrollbarWidth(scroller)}px)`,
          });
          gsap.set(scroller, {
            overflowY: "scroll",
            overflowX: "hidden",
          });
        }
      };

      adaptToScroller();

      window.addEventListener("resize", () => {
        adaptToScroller();
      });

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
        .to(arrive, { y: "0%", duration: 1 });

      // OBSERVER

      Observer.create({
        onDown: (self) => {
          console.log(scroller.scrollTop);
          if (scroller.scrollTop - self.y > 0) {
            gsap.to(scroller, {
              duration: 1,
              scrollTo: { y: scroller.scrollTop - self.y },
            });
          }
        },
        onUp: (self) => {
          console.log(scroller.scrollHeight);
          if (scroller.scrollTop + self.y < scroller.scrollHeight) {
            gsap.to(scroller, {
              duration: 1,
              scrollTo: { y: scroller.scrollTop + self.y },
            });
          }
        },
      });
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
