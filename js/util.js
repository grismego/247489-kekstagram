'use strict';

(function () {

  window.util = {
    getRandomInteger: function (min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    getRandomElement: function (elements) {
      return elements[window.util.getRandomInteger(0, elements.length - 1)];
    }
  };
})();
