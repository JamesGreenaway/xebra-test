function createHandler(func, timeout) {
  let timer = null;
  let pressed = false;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    if (pressed) {
      if (func) {
        func.apply(this, arguments);
      }
      clear();
    } else {
      pressed = true;
      setTimeout(clear, timeout || 500);
    }
  };

  function clear() {
    timeout = null;
    pressed = false;
  }
}

// ....
// And you would use it like this:

const ignore = createHandler((e) => e.preventDefault(), 500);
document.body.addEventListener("touchstart", ignore, { passive: false });
