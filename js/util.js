'use strict';

(function () {
// модуль утилит
  window.util = {
    getRandomInteger: function (min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    getRandomElement: function (elements) {
      return elements[window.util.getRandomInteger(0, elements.length - 1)];
    },
    KeyCode: {
      ENTER: 13,
      ESC: 27
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.util.KeyCode.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === window.util.KeyCode.ENTER) {
        action();
      }
    },
  };
})();
