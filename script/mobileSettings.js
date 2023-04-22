// gsap.registerPlugin(Observer);

const settingMobile = (scroller) => {
  const OBS = Observer.create();

  OBS({
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

  window.addEventListener("resize", () => {

    const getElementScrollbarWidth = (element) => {
        return element.offsetWidth - element.clientWidth;
      };

      if (window.matchMedia("(any-pointer: coarse)").matches) {
        // true for mobile device
        //alert('mobile')
        gsap.set(scroller, {
          overflowY: "hidden",
          overflowX: "hidden",
        });
        gsap.set(content, {
          width: "100%",
        });
      } else {
        // false for not mobile device
        //alert('not-mobile')
        gsap.set(scroller, {
          overflowY: "scroll",
          overflowX: "hidden",
        });
        gsap.set(content, {
          width: `calc(100% - ${getElementScrollbarWidth(scroller)}px)`,
        });
      }

  });
};

export { settingMobile };
