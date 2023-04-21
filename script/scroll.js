gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");

  window.addEventListener(
    "load",
    () => {
      // GRAPHIC ELEMENTS

      const scroller = document.querySelector(".scroll-wrapper");
      const loader =  document.querySelector(".loader");
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

        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          // true for mobile device
          gsap.set(content, {
            width: "100%",
          });
          document.body.addEventListener('touchmove', (e) => { e.preventDefault(); }, {passive:false});
        } else {
          // false for not mobile device
          gsap.set(content, {
            width: `calc(100% - ${getElementScrollbarWidth(scroller)}px)`,
          });
        }
      };

      adaptToScroller();

      window.addEventListener("resize", () => {
        adaptToScroller();
      });

      function onTouchStart(e) {
        // Save position of touch
        console.log("touchstart");
        const touch = e.touches[0] || e.changedTouches[0];
        window.lastY = touch.pageY;
    }

    function onTouchMove(e) {
        console.log("touchmove");
        // Check user isn't scrolling past content. If so, cancel move to prevent ios bouncing
        const touch = e.touches[0] || e.changedTouches[0];
        y = touch.pageY;
        if (y < window.lastY && e.srcElement.scrollTop == (e.srcElement.scrollHeight - e.srcElement.clientHeight)) {
            console.log("user is trying to scroll down without anywhere to scroll to. Canceling propagation.");
            e.preventDefault();
        } else if (y > window.lastY && e.srcElement.scrollTop == 0) {
            console.log("user is trying to scroll up without anywhere to scroll to. Canceling propagation.");
            e.preventDefault();
        }
    };

    document.addEventListener("touchstart", onTouchStart, { passive: false });
    document.addEventListener("touchmove", onTouchMove, { passive: false });

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

      /*Observer.create({
        onDown: () => console.log(main.offsetTop),
        onUp: (self) => {
          console.log(main.style.top)
          gsap.to(main, {
            duration: 5,
            top: main.offsetTop + (-self.y)
          });
        },
      });*/
      console.log('loaded');
      setTimeout(() => {
        gsap.set(loader, {
          display: "none",
        });
      }, 3000)
    },
    false
  );
});
