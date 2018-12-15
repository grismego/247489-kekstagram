'use strict';

(function () {

  window.util = {
    getRandomInteger: function (min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    getRandomElement: function (elements) {
      return elements[this.getRandomInteger(0, elements.length - 1)];
    },
    KeyCode: {
      ENTER: 13,
      ESC: 27
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === this.KeyCode.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === this.KeyCode.ENTER) {
        action();
      }
    },
    shuffleArray: function (array) {
      var results = [];
      for (var i = 0; i < array.length; i++) {
        var element = this.getRandomElement(array);
        if (results.indexOf(element) !== -1) {
          element = this.getRandomElement(array);
          i--;
        } else {
          results.push(element);
        }
      }
      return results;
    }
  };
})();
