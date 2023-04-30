// gsap.registerPlugin(Observer);

const settingMobile = (scroller, content) => {
  Observer.create({
    id: "main",
    onDown: (self) => {
      if (scroller.scrollTop - self.y < 0) {
        gsap.to(scroller, {
          duration: .5,
          scrollTo: { y: 0 },
        });
      } else if (scroller.scrollTop - self.y > 0) {
        gsap.to(scroller, {
          duration: .5,
          scrollTo: { y: scroller.scrollTop - 400 },
        });
      }
    },
    onUp: (self) => {
      if (scroller.scrollTop + self.y > scroller.scrollHeight) {
        gsap.to(scroller, {
          duration: .5,
          scrollTo: { y: 'end' },
        });
      } else if (scroller.scrollTop + self.y < scroller.scrollHeight) {
        console.log(self.y);
        gsap.to(scroller, {
          duration: .5,
          scrollTo: { y: scroller.scrollTop + 400 },
        });
      }
    },
  });

  const adaptToMobile = () => {
    const getElementScrollbarWidth = (element) => {
      return element.offsetWidth - element.clientWidth;
    };

    if (window.matchMedia("(any-pointer: coarse)").matches) {
      // true for mobile device
      gsap.set(scroller, {
        overflowY: "hidden",
        overflowX: "hidden",
      });
      gsap.set(content, {
        width: "100%",
      });
      Observer.getById("main").enable();
    } else {
      // false for not mobile device
      gsap.set(scroller, {
        overflowY: "scroll",
        overflowX: "hidden",
      });
      gsap.set(content, {
        width: `calc(100% - ${getElementScrollbarWidth(scroller)}px)`,
      });
      Observer.getById("main").disable();
    }
  };

  adaptToMobile();

  window.addEventListener("resize", () => {
    adaptToMobile();
  });
};

export { settingMobile };
