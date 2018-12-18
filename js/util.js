'use strict';

(function () {

  var KEYCODE_ESC = 27;

  var getRandomInteger = function (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  };

  var getRandomElement = function (elements) {
    return elements[getRandomInteger(0, elements.length - 1)];
  };

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KEYCODE_ESC) {
        action();
      }
    },
    shuffleArray: function (array) {
      var results = [];
      for (var i = 0; i < array.length; i++) {
        var element = getRandomElement(array);
        if (results.indexOf(element) !== -1) {
          element = getRandomElement(array);
          i--;
        } else {
          results.push(element);
        }
      }
      return results;
    }
  };
})();
